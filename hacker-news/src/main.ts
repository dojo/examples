import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import App from './App';
import router from './routes';
import { Request } from '@dojo/routing/interfaces';
import { Route } from '@dojo/routing/Route';

const root = document.querySelector('my-app') || undefined;

const Projector = ProjectorMixin(App);
const projector = new Projector();

function setProjectorProperties(request: Request<any, any>) {
	const { type, page } = request.params;
	projector.setProperties({ type: type || 'top', page: Number(page) || 1 });
}

router.append([
	new Route<any, any>({
		path: '/',
		exec: setProjectorProperties
	}),
	new Route<any, any>({
		path: `/{type}`,
		exec: setProjectorProperties
	}),
	new Route<any, any>({
		path: `/{type}/{page}`,
		exec: setProjectorProperties
	})
]);

projector.append(root);
router.start();
