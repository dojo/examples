import { v, w } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import Home from './widgets/Home';
import TodoDetails from './widgets/TodoDetails';

interface AppProperties {
	widgets?: any;
	todos?: Item[];
	todo?: string;
	activeFilter?: string;
	activeView?: string;
	search?: string;
	todoDetails?: Item;
}

export interface Item {
	id: string;
	label?: string;
	completed?: boolean;
	createdOn?: Date;
	editing: boolean;
}

function createWidget(widgetName: string, widgetProperties: any): DNode {
	switch (widgetName) {
		case 'main':
			return w(Home, widgetProperties);
		case 'todo-details':
			return w(TodoDetails, widgetProperties);
	}

	return null;
}

let app: App = <any> null;

export class App extends WidgetBase<AppProperties> {
	constructor() {
		super();

		app = this;
	}

	render() {
		const { widgets = [ [ 'main', {} ] ] } = this.properties;

		return v('section', {
			classes: {
				todoapp: true
			}
		}, widgets.map((widget: any) => {
			return createWidget(widget[ 0 ], <any> { ...this.properties, ...widget[ 1 ], id: <string> widget[ 0 ] });
		}));
	}
}

export default function () {
	return app;
};
