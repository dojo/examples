import { v, w } from '@dojo/widget-core/d';
import { theme, ThemeableMixin } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { todoInput } from '../actions/userActions';
import { Item } from '../App';
import FocusableTextInput from './FocusableTextInput';
import MainSection from './MainSection';
import * as styles from './styles/home.css';
import Title from './Title';
import TodoFooter from './TodoFooter';

interface HomeProperties {
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
export default class Home extends ThemeableMixin(WidgetBase)<HomeProperties> {
	render() {
		const { properties } = this;
		const { todo, todos = [] } = <any> properties;
		const newTodoOptions = {
			id: 'new-todo',
			overrideClasses: {
				base: styles.newTodo
			},
			focused: true,
			value: todo ? todo : '',
			placeholder: 'What needs to be done?',
			onKeyUp: todoInput.bind(this)
		};

		const completedCount = todos.filter(({ completed }: { completed: boolean }) => completed).length;
		const activeCount = todos.length - completedCount;
		const allCompleted = todos.length === completedCount;

		return v('div', {}, [
			v('header', {}, [
				w(Title, { label: 'todos' }),
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
