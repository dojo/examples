import { v, w } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

import Header from './widgets/Header';
import Navigation from './widgets/Navigation';

interface AppProperties extends WidgetProperties {
	type: string;
	page: number;
}

export default class App extends WidgetBase<AppProperties> {

	protected render(): DNode {
		const { type, page } = this.properties;
		const total = Math.ceil((() => {
			switch (type) {
				case 'top':
				case 'new':
					return 500;
				case 'ask':
				case 'show':
				case 'jobs':
					return 200;
				default:
					return 0;
			}
		})() / 30);


		return v('div', {}, [
			w<Header>(Header, {}, []),
			w<Navigation>(Navigation, { type, page, total }, [])
		]);
	}
}
