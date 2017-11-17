import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { w } from '@dojo/widget-core/d';
import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
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

const element = document.getElementById('widget') as Element;
const Projector = ProjectorMixin(Example);
const projector = new Projector();

projector.append(element);
