import { v, w } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { todoInput } from '../actions/userActions';
import FocusableTextInput from './FocusableTextInput';
import MainSection from './MainSection';
import Title from './Title';
import TodoFooter from './TodoFooter';
import { Item } from '../App';

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

export default class Home extends WidgetBase<HomeProperties> {
	render() {
		const { properties } = this;
		const { todo, todos = [] } = <any> properties;
		const newTodoOptions = {
			id: 'new-todo',
			classes: [ 'new-todo' ],
			focused: true,
			value: todo ? todo : '',
			placeholder: 'What needs to be done?',
			onKeyUp: todoInput.bind(this)
		};

		return v('div', {}, [
			v('header', {}, [
				w(Title, { label: 'todos' }),
				w(FocusableTextInput, <any> newTodoOptions)
			]),
			w(MainSection, { ...properties }),
			todos.length ? w(TodoFooter, { ...properties }) : null
		]);
	}
}
