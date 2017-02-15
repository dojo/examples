import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import { App } from './App';
import router from './routes';

const appProjector = ProjectorMixin(App);
const projector = new appProjector();

projector.root = document.getElementsByTagName('my-app')[ 0 ];

projector
	.append()
	.then(() => router.start());
