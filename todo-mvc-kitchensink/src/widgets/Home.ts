import { v, w } from '@dojo/widget-core/d';
import { I18nMixin } from '@dojo/widget-core/mixins/I18n';
import { theme, ThemeableMixin } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { todoInput } from '../actions/userActions';
import { Item, SharedWidgetProperties } from '../App';
import appBundle from '../nls/common';
import FocusableTextInput from './FocusableTextInput';
import MainSection from './MainSection';
import * as styles from './styles/home.css';
import Title from './Title';
import TodoFooter from './TodoFooter';

interface HomeProperties extends SharedWidgetProperties {
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
			id: 'new-todo',
			overrideClasses: {
				base: styles.newTodo
			},
			focused: true,
			value: todo ? todo : '',
			placeholder: messages.editPlaceholder,
			onKeyUp: todoInput.bind(this)
		};

		const completedCount = todos.filter(({ completed }: { completed: boolean }) => completed).length;
		const activeCount = todos.length - completedCount;
		const allCompleted = todos.length === completedCount;

		return v('div', {}, [
			v('header', {}, [
				w(Title, { label: messages.appTitle }),
				w(FocusableTextInput, <any> newTodoOptions)
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
