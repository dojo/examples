import renderer, { create, tsx } from '@dojo/framework/core/vdom';
import block from '@dojo/framework/core/middleware/block';
import getExamples from './examples.block';

const factory = create({ block });

const App = factory(function App({ middleware: { block } }) {
	const examples = block(getExamples)();
	if (examples) {
		return (
			<div>
				<ul>
					{examples.map((example) => (
						<li>
							<a href={example}>{example}</a>
						</li>
					))}
				</ul>
			</div>
		);
	}
});

const r = renderer(() => <App />);
r.mount();
