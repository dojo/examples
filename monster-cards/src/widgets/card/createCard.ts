import compose from 'dojo-compose/compose';
import createRenderMixin from 'dojo-widgets/mixins/createRenderMixin';
import createVNodeEvented from 'dojo-widgets/mixins/createVNodeEvented';

import { historyManager } from './../../routes';

const create = compose({
	},
	(instance: any, options: any) => {
		options.listeners = {
			click: (event: any): void => {
				historyManager.set(`/cards/${instance.state.id}`);
			}
		};
	})
	.mixin(createRenderMixin)
	.mixin(createVNodeEvented)
	.extend({
		tagName: 'milestone-card'
	});

export default create;
