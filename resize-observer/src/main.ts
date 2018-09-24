import renderer from '@dojo/framework/widget-core/vdom';
import { w } from '@dojo/framework/widget-core/d';
import ResizeObserver from 'resize-observer-polyfill';
import global from '@dojo/framework/shim/global';
import App from './widgets/App';
import '@dojo/framework/shim/browser';

if (!global.ResizeObserver) {
	global.ResizeObserver = ResizeObserver;
}

const r = renderer(() => w(App, {}));
r.mount();
