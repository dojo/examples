import renderer, { w } from '@dojo/framework/core/vdom';
import App from './widgets/App';

const r = renderer(() => w(App, {}));
r.mount();
