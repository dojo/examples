import { tsx, renderer, create } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';

const factory = create({ icache });

const App = factory(function App({ middleware: { icache } }) {
	const counter = icache.get<number>('counter') || 0;
	return (
		<div>
			<button
				onclick={() => {
					const counter = icache.get<number>('counter') || 0;
					icache.set('counter', counter - 1);
				}}
			>
				decrement
			</button>
			<button
				onclick={() => {
					const counter = icache.get<number>('counter') || 0;
					icache.set('counter', counter + 1);
				}}
			>
				increment
			</button>
			<div>{`${counter}`}</div>
		</div>
	);
});

const r = renderer(() => <App />);
r.mount();
