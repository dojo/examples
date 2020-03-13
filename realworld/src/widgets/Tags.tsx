import { create, tsx } from '@dojo/framework/core/vdom';
import { fetchFeedProcess } from '../processes/feedProcesses';
import store from '../store';

const factory = create({ store });

export const Tags = factory(function Tags({ middleware: { store } }) {
	const { get, path, executor } = store;
	const tags = get(path('tags')) || [];

	return (
		<div classes={['col-md-3']}>
			<div classes={['sidebar']}>
				<p>Popular Tags</p>
				<div classes={['tag-list']}>
					{tags.map((tag, i) => (
						<a
							href=""
							key={`${i}`}
							onclick={(event: MouseEvent) => {
								event.preventDefault();
								executor(fetchFeedProcess)({ type: 'tag', filter: tag, page: 0 });
							}}
							classes={['tag-pill', 'tag-default']}
						>
							{tag}
						</a>
					))}
				</div>
			</div>
		</div>
	);
});

export default Tags;
