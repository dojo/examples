import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import { registerRouterInjector } from '@dojo/routing/RouterInjector';
import TodoApp from './widgets/TodoApp';

const root = document.querySelector('my-app') || undefined;

const Projector = ProjectorMixin(TodoApp);
const projector = new Projector();

const router = registerRouterInjector([{ path: '{filter}', outlet: 'filter'}]);
// could include this in the registration
router.setPath('all');

projector.append(root);
router.start();
