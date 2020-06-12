import { renderer, tsx } from '@dojo/framework/core/vdom';
import { registry } from './store';

import { App } from './App';

const r = renderer(() => <App />);
r.mount({ registry });
