import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import { Request } from '@dojo/routing/interfaces';
import { Route } from '@dojo/routing/Route';
import App, { PAGE_SIZE, Item } from './App';
import { getStoriesForView, getCountForView, story_type, startUpdates } from './stories';
import router from './routes';

export interface ProjectorProperties {
	type: story_type;
	page: number;
	stories: Item[]
}

const root = document.querySelector('my-app') || undefined;

const Projector = ProjectorMixin<ProjectorProperties, typeof App>(App);
const projector = new Projector();
const properties: { type: story_type, page: number } = {
	type: 'top',
	page: 1
};
let navigating = 0;

function loadStories() {
	const { type, page } = properties;
	console.time('Fetching Data');
	console.time('Counting');
	const stories = getStoriesForView(type, page, PAGE_SIZE);
	const count = getCountForView(type);
	return count.then((count) => {
		console.timeEnd('Counting');
		const pages = Math.ceil(count/PAGE_SIZE);
		projector.setProperties({ ...properties, stories: [], pages });
		return stories.then((stories) => {
			console.log(stories);
			console.timeEnd('Fetching Data');
			projector.setProperties({ ...properties, stories, pages });
		});
	});
}

function setPropertiesFromRequest(request: Request<any, any>) {
	navigating++;
	const { type = properties.type, page = 1 } = request.params;
	console.log(`Starting a new navigation request to ${type}/${page}. ${navigating} active navigation request`);
	properties.type = type;
	properties.page = page;
	loadStories().then(() => {
		navigating--;
		console.log(`Completed navigating to ${type}/${page}. ${navigating} active navigation request`);
	});
}

router.append([
	new Route<any, any>({
		path: '/',
		exec: setPropertiesFromRequest
	}),
	new Route<any, any>({
		path: `/{type}`,
		exec: setPropertiesFromRequest
	}),
	new Route<any, any>({
		path: `/{type}/{page}`,
		exec: setPropertiesFromRequest
	})
]);

projector.append(root);
router.start();

loadStories().then(() => {
	startUpdates();
});

