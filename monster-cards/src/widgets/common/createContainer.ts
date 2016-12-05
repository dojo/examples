import createRenderMixin from 'dojo-widgets/mixins/createRenderMixin';
import createParentListMixin from 'dojo-widgets/mixins/createParentListMixin';
import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createStatefulChildrenMixin from 'dojo-widgets/mixins/createStatefulChildrenMixin';
import * as css from './general.module.styl';

const createContainer = createRenderMixin
	.mixin(createParentListMixin)
	.mixin(createRenderableChildrenMixin)
	.mixin(createStatefulChildrenMixin)
	.mixin({
		mixin: {
			classes: [ css.app ]
		}
	});

export default createContainer;
