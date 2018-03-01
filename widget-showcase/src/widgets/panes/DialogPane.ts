import { v, w } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import Button from '@dojo/widgets/button';
import Dialog from '@dojo/widgets/dialog';

export default class DialogPane extends WidgetBase {
	private _dialogOpen = false;

	private _buttonClick() {
		this._dialogOpen = !this._dialogOpen;
		this.invalidate();
	}

	render() {
		return v('div', [
			w(Button, {
				pressed: this._dialogOpen,
				onClick: this._buttonClick
			}, [ 'Show / Hide Dialog' ]),
			w(Dialog, {
				title: 'Dialog',
				open: this._dialogOpen,
				modal: true,
				underlay: true,
				closeable: true,
				onRequestClose: () => {
					this._dialogOpen = false;
					this.invalidate();
				}
			}, [
				`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Quisque id purus ipsum. Aenean ac purus purus.
				Nam sollicitudin varius augue, sed lacinia felis tempor in.`
			])
		]);
	}
}
