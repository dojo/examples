import { create, tsx } from '@dojo/framework/core/vdom';
import store from './store';
import { updateNameProcess } from './appProcesses';

const factory = create({ store });

export default factory(function App({ middleware: { store } }) {
	const companies = store.get(store.path('companies')) || [];
	return (
		<div>
			<div classes={['parent']}>
				{companies.map((company) => (
					<div classes={['child']} key={company.name}>
						<div classes={['company']}>{company.name}</div>
						<div>
							{company.people.map((person) => (
								<div classes={['people']}>
									<span classes={['person']}>{person}</span>
									<button
										classes={['button']}
										onclick={() => {
											store.executor(updateNameProcess)({
												company: company.name,
												person
											});
										}}
									>
										update
									</button>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
});
