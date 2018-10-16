import renderer from '@dojo/framework/widget-core/vdom';
import { w } from '@dojo/framework/widget-core/d';
import App from './widgets/App';

const r = renderer(() => w(App, {}));

r.mount();
