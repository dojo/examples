import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import ResizeObserver from 'resize-observer-polyfill';
import global from '@dojo/shim/global';
import App from './widgets/App';
import '@dojo/shim/browser';

if (!global.ResizeObserver) {
	global.ResizeObserver = ResizeObserver;
}

const Projector = ProjectorMixin(App);
const projector = new Projector();

projector.append();
