import createRenderMixin from 'dojo-widgets/mixins/createRenderMixin';
import createVNodeEvented from 'dojo-widgets/mixins/createVNodeEvented';

const create = createRenderMixin
	.mixin(createVNodeEvented)
	.extend({
		tagName: 'milestone-card',
		listeners: {
			click: () => { console.log('clicked'); }
		}
	});

export default create;
