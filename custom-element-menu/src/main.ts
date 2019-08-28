import { WidgetBase } from '@dojo/framework/core/WidgetBase';
import renderer, { w } from '@dojo/framework/core/vdom';
import { Menu } from './widgets/Menu';
import { MenuItem } from './widgets/MenuItem';

class Example extends WidgetBase {
	private _onSelected(data: any) {
		console.log(data);
	}

	protected render() {
		return w(Menu, { onSelected: this._onSelected }, [
			w(MenuItem, { key: 'a', title: 'Menu Item A' }),
			w(MenuItem, { key: 'b', title: 'Menu Item B', selected: true }),
			w(MenuItem, { key: 'c', title: 'Menu Item C' })
		]);
	}
}

const element = document.getElementById('widget') as HTMLElement;
const r = renderer(() => w(Example, {}));
r.mount({ domNode: element });
