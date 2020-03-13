import renderer, { tsx } from '@dojo/framework/core/vdom';

import { ResizeWidget } from './ResizeWidget';

const r = renderer(() => <ResizeWidget />);
r.mount();
