import createParentListMixin from 'dojo-widgets/mixins/createParentListMixin';
import createRenderMixin from 'dojo-widgets/mixins/createRenderMixin';
import createStatefulChildrenMixin from 'dojo-widgets/mixins/createStatefulChildrenMixin';

// import { VNode } from 'maquette';
// import { List } from 'immutable';

import createNavCard from './createNavCard';

const create = createRenderMixin
	.mixin(createParentListMixin)
	.mixin(createStatefulChildrenMixin)
	.extend({
		tagName: 'ul'
	});

export default create;
