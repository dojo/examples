import { renderer, tsx } from '@dojo/framework/core/vdom';
import App from './App';

const r = renderer(() => <App />);
r.mount();
