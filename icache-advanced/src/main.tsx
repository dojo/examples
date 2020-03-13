import { tsx, renderer } from '@dojo/framework/core/vdom';
import '@material/card/dist/mdc.card.css';
import '@material/button/dist/mdc.button.css';
import '@material/typography/dist/mdc.typography.css';

import { App } from './App';

const r = renderer(() => <App />);
r.mount();
