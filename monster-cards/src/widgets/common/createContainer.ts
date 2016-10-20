import createRenderMixin from 'dojo-widgets/mixins/createRenderMixin';
import createParentListMixin from 'dojo-widgets/mixins/createParentListMixin';
import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createStatefulChildrenMixin from 'dojo-widgets/mixins/createStatefulChildrenMixin';

const createContainer = createRenderMixin
	.mixin(createParentListMixin)
	.mixin(createRenderableChildrenMixin)
	.mixin(createStatefulChildrenMixin);

export default createContainer;
