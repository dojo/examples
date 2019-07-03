import { create, w, v } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import Button from '@dojo/widgets/button';
import Dialog from '@dojo/widgets/dialog';

const factory = create({ icache });

export default factory(function DialogPane({ middleware: { icache } }) {
	const open = icache.get<boolean>('open') || false;

	return v('div', [
		w(
			Button,
			{
				pressed: open,
				onClick: () => {
					icache.set('open', !open);
				}
			},
			['Show / Hide Dialog']
		),
		w(
			Dialog,
			{
				title: 'Dialog',
				open: open,
				modal: true,
				underlay: true,
				closeable: true,
				onRequestClose: () => {
					icache.set('open', false);
				}
			},
			[
				`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Quisque id purus ipsum. Aenean ac purus purus.
				Nam sollicitudin varius augue, sed lacinia felis tempor in.`
			]
		)
	]);
});
