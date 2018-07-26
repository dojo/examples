import { ProjectorMixin } from '@dojo/framework/widget-core/mixins/Projector';
import ResizeObserver from 'resize-observer-polyfill';
import global from '@dojo/framework/shim/global';
import App from './widgets/App';
import '@dojo/framework/shim/browser';

if (!global.ResizeObserver) {
	global.ResizeObserver = ResizeObserver;
}

const Projector = ProjectorMixin(App);
const projector = new Projector();

projector.append();
