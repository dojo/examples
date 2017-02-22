import { v, w } from '@dojo/widget-core/d';
import { I18nMixin, I18nProperties } from '@dojo/widget-core/mixins/I18n';
import { theme, ThemeableMixin, ThemeableProperties } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { todoInput } from '../actions/userActions';
import { Item } from '../App';
import appBundle from '../nls/common';
import MainSection from './MainSection';
import * as styles from './styles/Home.css';
import Title from './Title';
import TodoEditInput from './TodoEditInput';
import TodoFooter from './TodoFooter';

interface HomeProperties extends ThemeableProperties, I18nProperties {
	todos?: Item[];
	todo?: string;
	activeView?: string;
	activeFilter?: string;
	activeCount?: number;
	completedCount?: number;
	allCompleted?: boolean;
	search?: string;
}

@theme(styles)
export default class Home extends I18nMixin(ThemeableMixin(WidgetBase))<HomeProperties> {
	render() {
		const messages = this.localizeBundle(appBundle);

		const { properties } = this;
		const { todo, todos = [] } = <any> properties;
		const newTodoOptions = {
			focused: true,
			value: todo ? todo : '',
			placeholder: messages.editPlaceholder,
			onKeyUp: todoInput.bind(this),
			theme: this.properties.theme
		};

		const completedCount = todos.filter(({ completed }: { completed: boolean }) => completed).length;
		const activeCount = todos.length - completedCount;
		const allCompleted = todos.length === completedCount;

		return v('div', [
			v('header', [
				w(Title, { label: messages.appTitle }),
				w(TodoEditInput, <any> newTodoOptions)
			]),
			w(MainSection, { ...properties, allCompleted }),
			todos.length ? w(TodoFooter, {
				...properties, ...{
					completedCount,
					activeCount,
					allCompleted
				}
			}) : null
		]);
	}
}
