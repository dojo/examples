import renderer from '@dojo/framework/core/vdom';
import App from './widgets/App';

const r = renderer(() => App({}));
r.mount();
