import { Widget, DNode } from 'dojo-interfaces/widgetBases';
import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import d from 'dojo-widgets/util/d';

export type SearchInputState = {}
export type SearchInput = Widget<SearchInputState>

const createSearchInput = createWidgetBase.extend({
	childNodeRenderers: [
		function(this: SearchInput): DNode[] {
			return [
				d('input', { type: 'search' }),
				d('i.fa.fa-2x.fa-search')
			];
		}
	]
});

export default createSearchInput;
