import { create, tsx } from '@dojo/framework/core/vdom';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import Set from '@dojo/framework/shim/Set';

interface PokemonListResponse {
	previous: string;
	next: string;
	results: {
		name: string;
		url: string;
	}[];
}

interface PokemonResponse {
	height: number;
	weight: number;
	sprites: { front_default: string };
	stats: { state: { name: string }; base_state: number }[];
}

interface AppState {
	openList: Set<string>;
	results: PokemonListResponse;
	offset: number;
	pokemon: Record<string, PokemonResponse>;
}

const icache = createICacheMiddleware<AppState>();
const factory = create({ icache });

function getUrl(offset: number, size = 20) {
	return `https://pokeapi.co/api/v2/pokemon?limit=${size}&offset=${offset}`;
}

export const App = factory(function App({ middleware: { icache } }) {
	const listResults = icache.getOrSet('results', async () => {
		const response = await fetch(getUrl(0));
		const json: PokemonListResponse = await response.json();
		return json;
	});

	if (!listResults) {
		return (
			<div classes={['centered']}>
				<div classes={['loader']}>Loading...</div>
			</div>
		);
	}

	const openList = icache.getOrSet('openList', new Set<string>());

	return (
		<div classes={['mdc-typography']}>
			<header classes={['header']}>
				<button
					classes={['mdc-button']}
					disabled={!listResults.previous}
					onclick={() => {
						icache.set('results', async () => {
							const offset = (icache.get('offset') || 0) - 20;
							icache.set('offset', offset);
							const response = await fetch(getUrl(offset));
							const json: PokemonListResponse = await response.json();
							return json;
						});
					}}
				>
					prev
				</button>
				<button
					classes={['mdc-button']}
					disabled={!listResults.next}
					onclick={() => {
						icache.set('results', async () => {
							const offset = (icache.get('offset') || 0) + 20;
							icache.set('offset', offset);
							const response = await fetch(getUrl(offset));
							const json: PokemonListResponse = await response.json();
							return json;
						});
					}}
				>
					next
				</button>
				<button
					classes={['mdc-button']}
					disabled={!openList || openList.size === 0}
					onclick={() => {
						icache.set('pokemon', {});
						icache.set('openList', new Set());
					}}
				>
					close all
				</button>
			</header>

			<div classes={['all']}>
				<div classes={['cards']}>
					{listResults.results.map((result) => {
						const pokemon = icache.getOrSet('pokemon', {});
						const details = pokemon[result.name];
						return (
							<div
								key={result.name}
								classes={['card', 'mdc-card', details && 'open']}
								onclick={() => {
									if (details) {
										const pokemon = { ...icache.get('pokemon') } as Record<string, PokemonResponse>;
										delete pokemon[result.name];
										icache.set('pokemon', pokemon);
										const openList = icache.getOrSet('openList', new Set<string>());
										openList.delete(result.name);
									} else {
										icache.set('pokemon', async () => {
											const response = await fetch(result.url);
											const json = await response.json();
											const openList = icache.getOrSet('openList', new Set<string>());
											openList.add(result.name);
											icache.set('openList', openList);
											return { ...icache.get('pokemon'), [result.name]: json };
										});
									}
								}}
							>
								<div classes={['mdc-typography--headline6', 'name']}>{result.name}</div>
								{details && (
									<div key={'details-' + result.name} classes="details">
										<div classes={['stats', 'mdc-typography--body2']}>
											<div classes={['stat']}>
												<span classes={['mdc-typography--subtitle2']}>Height:</span>
												<span>{` ${details.height}`}</span>
											</div>
											<div classes={['stat']}>
												<span classes={['mdc-typography--subtitle2']}>Weight:</span>
												<span>{` ${details.weight}`}</span>
											</div>
											<div>
												{details.stats.map((stat: any) => (
													<div classes={['stat']}>
														<span
															classes={['mdc-typography--subtitle2']}
														>{`${stat.stat.name}: `}</span>
														<span>{`${stat.base_stat}`}</span>
													</div>
												))}
											</div>
										</div>
										<div
											classes={['image']}
											styles={{
												backgroundImage: `url("${details.sprites.front_default}")`
											}}
										/>
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
});
