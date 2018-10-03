import renderer from '@dojo/framework/widget-core/vdom';
import { w } from '@dojo/framework/widget-core/d';
import App from './widgets/App';
import '@dojo/framework/shim/browser';

const r = renderer(() => w(App, {}));
r.mount();
