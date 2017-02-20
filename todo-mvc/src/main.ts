import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import createRoute from '@dojo/routing/createRoute';
import TodoApp from './widgets/TodoApp';
import router from './routes';

const root = document.querySelector('my-app') || undefined;

const Projector = ProjectorMixin(TodoApp);
const projector = new Projector();

// TODO find a better place for this
const filterRoute = createRoute<any>({
	path: '/{filter}',

	exec(request) {
		const { filter } = request.params;
		projector.setProperties({ filter });
	}
});
router.append(filterRoute);

projector.append(root).then(() => {
	router.start();
	console.log('Attached!');
});
