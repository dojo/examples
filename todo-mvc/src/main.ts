import createProjectorMixin from '@dojo/widget-core/mixins/createProjectorMixin';
import { registry } from '@dojo/widget-core/d';

import router from './routes';
import { bindActions as bindTodoStoreActions } from './stores/todoStore';
import widgetStore from './stores/widgetStore';
import createApp from './createApp';
import createLabel from './widgets/createLabel';
import createTitle from './widgets/createTitle';
import createButton from './widgets/createButton';
import createTodoItem from './widgets/createTodoItem';
import createTodoList from './widgets/createTodoList';
import createTodoFilter from './widgets/createTodoFilter';
import createTodoFooter from './widgets/createTodoFooter';
import createMainSection from './widgets/createMainSection';
import createCheckboxInput from './widgets/createCheckboxInput';
import createFocusableTextInput from './widgets/createFocusableTextInput';

import 'todomvc-app-css/index.css';

registry.define('label', createLabel);
registry.define('title', createTitle);
registry.define('button', createButton);
registry.define('todo-item', createTodoItem);
registry.define('todo-list', createTodoList);
registry.define('todo-filter', createTodoFilter);
registry.define('todo-footer', createTodoFooter);
registry.define('main-section', createMainSection);
registry.define('checkbox', createCheckboxInput);
registry.define('text-input', createFocusableTextInput);

const root = document.getElementsByTagName('my-app')[0];

const app = createApp.mixin(createProjectorMixin)({
	properties: {
		id: 'todo-app',
		store: widgetStore
	},
	root
});

app.append()
	.then(() => bindTodoStoreActions())
	.then(() => router.start());
