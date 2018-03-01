import { v, w,  } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { DNode } from '@dojo/widget-core/interfaces';
import SplitPane, { Direction } from '@dojo/widgets/split-pane';

interface SplitterProperties {
	leading: DNode;
	trailing: DNode;
}

export default class Splitter extends WidgetBase<SplitterProperties> {
	private _size = 300;

	private _onResize(size: number) {
		this._size = size;
		this.invalidate();
	}

	render() {
		const { leading, trailing } = this.properties;

		return w(SplitPane, {
			key: 'split-pane',
			direction: Direction.row,
			size: this._size,
			onResize: this._onResize,
			leading,
			trailing
		});
	}
}


