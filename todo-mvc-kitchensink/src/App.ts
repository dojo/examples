import { deepAssign } from '@dojo/core/lang';
import { v, w } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { I18nProperties, I18nMixin } from '@dojo/widget-core/mixins/I18n';
import { theme, ThemeableMixin, ThemeableProperties } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import * as styles from './widgets/styles/App.css';
import pirateThemeStyles from './themes/pirate';
import { AppFooter } from './widgets/AppFooter';
import Home from './widgets/Home';
import { ThemeSwitcher } from './widgets/ThemeSwitcher';
import TodoDetails from './widgets/TodoDetails';

interface AppProperties extends ThemeableProperties, I18nProperties {
	widgets?: any;
	todos?: Item[];
	todo?: string;
	activeFilter?: string;
	activeView?: string;
	search?: string;
	todoDetails?: Item;
	pirateTheme?: boolean;
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

@theme(styles)
export class App extends I18nMixin(ThemeableMixin(WidgetBase))<AppProperties> {
	constructor() {
		super();

		app = this;
		this.applyTheme();
	}

	applyTheme() {
		this.setProperties(deepAssign({}, this.properties, {
			theme: this.properties.pirateTheme ? pirateThemeStyles : undefined
		}));
	}

	changeTheme(wantsPirate: boolean) {
		this.setProperties(deepAssign({}, this.properties, {
			pirateTheme: wantsPirate
		}));

		this.applyTheme();
	}

	render() {
		const { widgets = [ [ 'main', {} ] ], pirateTheme = false } = this.properties;

		return v('div', {}, [
			v('section', {
				classes: this.classes(styles.todoapp).get()
			}, [
				w(ThemeSwitcher, {
					theme: this.properties.theme,
					wantsPirate: pirateTheme,
					onChange: this.changeTheme
				})
			].concat(widgets.map((widget: any) => {
				return createWidget(widget[ 0 ], <any> {
					...this.properties, ...widget[ 1 ],
					id: <string> widget[ 0 ]
				});
			}))),
			w(AppFooter, {
				theme: this.properties.theme
			})
		]);
	}
}

export default function () {
	return app;
};
