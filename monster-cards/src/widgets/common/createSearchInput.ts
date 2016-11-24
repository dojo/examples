import { Widget, DNode, WidgetState } from 'dojo-interfaces/widgetBases';
import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import d from 'dojo-widgets/util/d';

export type SearchInput = Widget<WidgetState>

const createSearchInput = createWidgetBase.override({
	childNodeRenderers: [
		function(this: SearchInput): DNode[] {
			const input = d('input', { type: 'search' });
			const icon = d('i.fa.fa-2x.fa-search');

			return [ input, icon ];
		}
	]
});

export default createSearchInput;
