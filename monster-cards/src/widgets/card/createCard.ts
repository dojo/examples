import createRenderMixin from 'dojo-widgets/mixins/createRenderMixin';
import createVNodeEvented from 'dojo-widgets/mixins/createVNodeEvented';

import compose from 'dojo-compose/compose';

const create = compose({
	},
	(instance: any, options: any) => {
		options.listeners = {
			click: (event: any): void => { console.log('clicked'); }
		};
	})
	.mixin(createRenderMixin)
	.mixin(createVNodeEvented)
	.extend({
		tagName: 'milestone-card'
	});

export default create;
