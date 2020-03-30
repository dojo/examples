import DgridWrapper, { SelectionMode } from '@dojo/interop/dgrid/DgridWrapper';

const { describe, it } = intern.getInterface('bdd');
import harness from '@dojo/framework/testing/harness';

import { v, w } from '@dojo/framework/core/vdom';

import App from '../App';

describe('App', () => {
	it('should render widget', () => {
		const h = harness(() => w(App, {}));
		h.expect(() =>
			v('div', {}, [
				w(DgridWrapper, {
					features: {
						pagination: false,
						keyboard: false,
						selection: undefined,
						tree: false,
						columnHider: false,
						columnReorder: false,
						columnResizer: false,
						compoundColumns: false,
						columnSet: false
					},
					data: [
						{ first: 'Bob', last: 'Thomson', id: 1, hasChildren: true },
						{ first: 'Tom', last: 'Bobson', id: 2, hasChildren: true }
					],
					columns: [
						{ field: 'first', label: 'First', renderExpando: true } as any,
						{ field: 'last', label: 'Last' }
					],
					columnSets: [
						[[{ field: 'id', label: 'ID' }]],
						[[{ field: 'first', label: 'First' }], [{ field: 'last', label: 'Last' }]]
					],
					rowsPerPage: 5,
					previousNextArrows: true,
					firstLastArrows: true,
					pagingLinks: 2,

					pageSkip: 3,
					tabIndex: 2,

					deselectOnRefresh: false,
					allowSelectAll: false,
					selectionMode: SelectionMode.single,
					allowTextSelection: false,
					onSelect: () => {},
					onDeselect: () => {},

					collapseOnRefresh: false,
					enableTreeTransitions: false,
					treeIndentWidth: 9,

					onColumnStateChange: () => {}
				}),
				v(
					'button',
					{
						onclick: () => {}
					},
					['Add Data']
				),
				v(
					'button',
					{
						onclick: () => {}
					},
					['Change Columns']
				),
				v('p', [
					v(
						'button',
						{
							onclick: () => {}
						},
						['Turn Pagination On']
					),
					v('div', [])
				]),
				v('p', [
					v(
						'button',
						{
							onclick: () => {}
						},
						['Turn Keyboard On']
					),
					v('div', [])
				]),
				v('p', [
					v(
						'button',
						{
							onclick: () => {}
						},
						['Turn Selection On']
					),
					v('div', [])
				]),
				v('p', [
					v(
						'button',
						{
							onclick: () => {}
						},
						['Turn Tree On']
					),
					v('div', [])
				]),
				v('p', [
					v(
						'button',
						{
							onclick: () => {}
						},
						['Turn Column Hider On']
					)
				]),
				v('p', [
					v(
						'button',
						{
							onclick: () => {}
						},
						['Turn Column Reorder On']
					)
				]),
				v('p', [
					v(
						'button',
						{
							onclick: () => {}
						},
						['Turn Column Resizer On']
					)
				]),
				v('p', [
					v(
						'button',
						{
							onclick: () => {}
						},
						['Turn Compound Columns On']
					)
				]),
				v('p', [
					v(
						'button',
						{
							onclick: () => {}
						},
						['Turn Column Sets On']
					)
				])
			])
		);
	});
});
