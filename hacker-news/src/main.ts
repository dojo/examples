import { BaseInjector, Injector } from '@dojo/widget-core/Injector';
import { registry } from '@dojo/widget-core/d';
import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import { registerRouterInjector } from '@dojo/routing/RouterInjector';
import HackerNewsAppContainer from './containers/HackerNewsAppContainer';
import { HackerNewsAppContext } from "./HackerNewsAppContext";
import { startUpdates } from "./hackerNewsStoriesService";

const root = document.querySelector('my-app') || undefined;

const Projector = ProjectorMixin(HackerNewsAppContainer);
const projector = new Projector();

export const PAGE_SIZE = 30;

const config = [
	{
		path: '{view}/{page}',
		outlet: 'stories',
		defaultParams: {
			view: 'top',
			page: 1
		}
	}
];

const router = registerRouterInjector(config);
const appContext = new HackerNewsAppContext({ router });
registry.define('state', Injector(BaseInjector, appContext));

projector.append(root);
router.start({ dispatchCurrent: true });
appContext.showStories();
startUpdates();

