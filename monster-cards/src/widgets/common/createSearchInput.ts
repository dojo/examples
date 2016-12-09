import { Widget, DNode, WidgetState } from 'dojo-widgets/interfaces';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { v } from 'dojo-widgets/d';

export type SearchInput = Widget<WidgetState>

const createSearchInput = createWidgetBase.mixin({
	mixin: {
		getChildrenNodes: function(this: SearchInput): DNode[] {
			const input = v('input', { type: 'search' });
			const icon = v('i.fa.fa-2x.fa-search');

			return [ input, icon ];
		}
	}
});

export default createSearchInput;
