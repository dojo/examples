import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import TodoApp from './widgets/TodoApp';
import { w } from '@dojo/widget-core/d';

export default class App extends WidgetBase {

	render() {
		return w(TodoApp, {});
	}
}
