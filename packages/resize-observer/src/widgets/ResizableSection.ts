import { create, v } from '@dojo/framework/core/vdom';
import * as css from './styles/resizableSection.m.css';

export interface ResizableSectionProperties {
	columns: number;
	isMedium?: boolean;
	isSmall?: boolean;
	expand: () => void;
	shrink: () => void;
}

const factory = create().properties<ResizableSectionProperties>();

const columnClasses: { [index: number]: string } = {
	0: css.zeroColumns,
	1: css.oneColumn,
	2: css.twoColumns,
	3: css.threeColumns,
	4: css.fourColumns,
	5: css.fiveColumns,
	6: css.sixColumns,
	7: css.sevenColumns,
	8: css.eightColumns
};

export default factory(function ResizableSection({ properties, children }) {
	const { isSmall, isMedium, columns, expand, shrink } = properties();

	return v(
		'div',
		{
			key: 'root',
			classes: [css.root, isSmall ? css.eightColumns : columnClasses[columns]]
		},
		[
			isSmall
				? null
				: v('div', { classes: css.sizeControls }, [
						v(
							'button',
							{
								disabled: columns <= (isMedium ? 2 : 1),
								onclick: shrink
							},
							['Shrink Component']
						),
						v('button', { disabled: columns === 8, onclick: expand }, ['Expand Component'])
				  ]),
			...children()
		]
	);
});
