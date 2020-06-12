import renderer, { w } from '@dojo/framework/core/vdom';
import App from './widgets/App';
import '@dojo/framework/shim/browser';

const r = renderer(() => w(App, {}));
r.mount();
