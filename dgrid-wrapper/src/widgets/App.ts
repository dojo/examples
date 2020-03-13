import WidgetBase from '@dojo/framework/core/WidgetBase';
import { v, w } from '@dojo/framework/core/vdom';
import DgridWrapper, {
	SelectionData,
	SelectionMode,
	Selections,
	SelectionType,
	ColumnStateChangeData
} from '@dojo/interop/dgrid/DgridWrapper';
import { deepMixin } from '@dojo/framework/core/util';

interface DataItem {
	id: number;
	first: string;
	last: string;
	hasChildren?: boolean;
	parent?: number | null;
}

function duplicate<T extends {}>(source: T): T {
	const target = Object.create(Object.getPrototypeOf(source));

	return deepMixin(target, source);
}

function buildToggleLabel(label: string, currentValue: boolean) {
	return 'Turn ' + label + (currentValue ? ' Off' : ' On');
}
export class App extends WidgetBase {
	private _data: DataItem[] = [
		{ first: 'Bob', last: 'Thomson', id: 1, hasChildren: true },
		{ first: 'Tom', last: 'Bobson', id: 2, hasChildren: true }
	];

	private _columnSets = [
		[[{ field: 'id', label: 'ID' }]],
		[[{ field: 'first', label: 'First' }], [{ field: 'last', label: 'Last' }]]
	];

	private _compoundColumns = [
		{
			label: 'Full Name',
			children: [
				{ field: 'first', label: 'First' },
				{ field: 'last', label: 'Last' }
			]
		},
		{ field: 'id', label: 'ID' }
	];

	protected render() {
		return v('div', {}, [
			w(DgridWrapper, {
				features: {
					pagination: this._paginationOn,
					keyboard: this._keyboardOn,
					selection: this._selectionType,
					tree: this._treeOn,
					columnHider: this._columnHiderOn,
					columnReorder: this._columnReorderOn,
					columnResizer: this._columnResizerOn,
					compoundColumns: this._compoundColumnsOn,
					columnSet: this._columnSetsOn
				},
				data: this._data,
				columns: this._compoundColumnsOn ? this._compoundColumns : this._columnDefs[this._columnToggle],
				columnSets: this._columnSets,

				rowsPerPage: this._rowsPerPage,
				previousNextArrows: this._previousNextArrows,
				firstLastArrows: this._firstLastArrows,
				pagingLinks: this._pagingLinks,

				pageSkip: this._pageSkip,
				tabIndex: 2,

				deselectOnRefresh: this._deselectOnRefresh,
				allowSelectAll: this._allowSelectAll,
				selectionMode: this._selectionMode,
				allowTextSelection: this._allowTextSelection,
				onSelect: (selected: SelectionData, selections: Selections) => {
					console.log('SELECTED:', selected);
					console.log('SELECTIONS:', selections);
				},
				onDeselect: (deselected: SelectionData, selections: Selections) => {
					console.log('DESELECTED:', deselected);
					console.log('SELECTIONS:', selections);
				},

				collapseOnRefresh: this._collapseOnRefresh,
				enableTreeTransitions: this._enableTreeTransitions,
				treeIndentWidth: this._treeIndentWidth,

				onColumnStateChange: (columnStateData: ColumnStateChangeData) => {
					console.log('COLUMN STATE CHANGE', columnStateData);
				}
			}),
			v(
				'button',
				{
					onclick: this.addData
				},
				['Add Data']
			),
			v(
				'button',
				{
					onclick: this.swapColumnDef
				},
				['Change Columns']
			),
			v('p', [
				v(
					'button',
					{
						onclick: this.togglePagination
					},
					[buildToggleLabel('Pagination', this._paginationOn)]
				),
				v('div', this.renderPaginationButtons())
			]),
			v('p', [
				v(
					'button',
					{
						onclick: this.toggleKeyboard
					},
					[buildToggleLabel('Keyboard', this._keyboardOn)]
				),
				v('div', this.renderKeyboardButtons())
			]),
			v('p', [
				v(
					'button',
					{
						onclick: this.toggleSelectionOnOff
					},
					[buildToggleLabel('Selection', this._selectionType != null)]
				),
				v('div', this.renderSelectionButtons())
			]),
			v('p', [
				v(
					'button',
					{
						onclick: this.toggleTree
					},
					[buildToggleLabel('Tree', this._treeOn)]
				),
				v('div', this.renderTreeButtons())
			]),
			v('p', [
				v(
					'button',
					{
						onclick: this.toggleColumnHider
					},
					[buildToggleLabel('Column Hider', this._columnHiderOn)]
				)
			]),
			v('p', [
				v(
					'button',
					{
						onclick: this.toggleColumnReorder
					},
					[buildToggleLabel('Column Reorder', this._columnReorderOn)]
				)
			]),
			v('p', [
				v(
					'button',
					{
						onclick: this.toggleColumnResizer
					},
					[buildToggleLabel('Column Resizer', this._columnResizerOn)]
				)
			]),
			v('p', [
				v(
					'button',
					{
						onclick: this.toggleCompoundColumns
					},
					[buildToggleLabel('Compound Columns', this._compoundColumnsOn)]
				)
			]),
			v('p', [
				v(
					'button',
					{
						onclick: this.toggleColumnSets
					},
					[buildToggleLabel('Column Sets', this._columnSetsOn)]
				)
			])
		]);
	}

	private renderPaginationButtons() {
		if (this._paginationOn) {
			return [
				v('button', { onclick: this.updateRowsPerPage }, ['Set Rows Per Page ' + this.nextRowsPerPage()]),
				v('button', { onclick: this.togglePreviousNextArrows }, [
					buildToggleLabel('Prev/Next Arrows', this._previousNextArrows)
				]),
				v('button', { onclick: this.toggleFirstLastArrows }, [
					buildToggleLabel('First/Last Arrows', this._firstLastArrows)
				]),
				v('button', { onclick: this.updatePagingLinks }, ['Set Paging Links # ' + this.nextPagingLinks()])
			];
		} else {
			return [];
		}
	}

	private _paginationOn = false;
	private togglePagination(): void {
		this._paginationOn = !this._paginationOn;
		this.invalidate();
	}

	private _rowsPerPage = 5;
	private updateRowsPerPage(): void {
		this._rowsPerPage = this.nextRowsPerPage();
		this.invalidate();
	}

	private nextRowsPerPage() {
		return (this._rowsPerPage + 5) % 19;
	}

	private _previousNextArrows = true;
	private togglePreviousNextArrows(): void {
		this._previousNextArrows = !this._previousNextArrows;
		this.invalidate();
	}

	private _firstLastArrows = true;
	private toggleFirstLastArrows(): void {
		this._firstLastArrows = !this._firstLastArrows;
		this.invalidate();
	}

	private _pagingLinks = 2;
	private updatePagingLinks(): void {
		this._pagingLinks = this.nextPagingLinks();
		this.invalidate();
	}

	private nextPagingLinks() {
		let pagingLinks = (this._pagingLinks + 2) % 10;
		if (!pagingLinks) {
			pagingLinks = 2;
		}
		return pagingLinks;
	}

	private addData(): void {
		this._data = this._data.map((item) => {
			return duplicate(item);
		});
		for (let i = 0; i < 20; i++) {
			this._data.push({
				first: 'Extra',
				last: 'Person',
				id: this._data.length + 1,
				hasChildren: false,
				parent: (i % 2) + 1
			});
		}
		this.invalidate();
	}

	private _columnToggle = 0;
	private _columnDefs = [
		[
			{ field: 'first', label: 'First', renderExpando: true },
			{ field: 'last', label: 'Last' }
		],
		[
			{ field: 'id', label: 'ID', renderExpando: true },
			{ field: 'first', label: 'First' },
			{ field: 'last', label: 'Last' }
		]
	];
	private swapColumnDef(): void {
		this._columnToggle = this._columnToggle ? 0 : 1;
		this.invalidate();
	}

	private _keyboardOn = false;
	private toggleKeyboard(): void {
		this._keyboardOn = !this._keyboardOn;
		this.invalidate();
	}

	private renderKeyboardButtons() {
		if (this._keyboardOn) {
			return [v('button', { onclick: this.updatePageSkip }, ['Set Page Skip ' + this.nextPageSkip()])];
		} else {
			return [];
		}
	}

	private _pageSkip = 3;
	private updatePageSkip(): void {
		this._pageSkip = this.nextPageSkip();
		this.invalidate();
	}

	private nextPageSkip() {
		return (this._pageSkip + 2) % 9;
	}

	private _selectionType?: SelectionType;
	private toggleSelectionOnOff(): void {
		this._selectionType = this._selectionType ? undefined : SelectionType.row;
		this.invalidate();
	}
	private toggleSelectionType(): void {
		this._selectionType = this._selectionType === SelectionType.row ? SelectionType.cell : SelectionType.row;
		this.invalidate();
	}

	private renderSelectionButtons() {
		if (this._selectionType) {
			return [
				v('div', [
					v('button', { onclick: this.toggleSelectionType }, [
						'Set Selection Type ' + (this._selectionType === SelectionType.row ? 'Cell' : 'Row')
					])
				]),
				v('div', [
					v('button', { onclick: this.toggleDeselectOnRefresh }, [
						buildToggleLabel('Deselect On Referesh', this._deselectOnRefresh)
					]),
					v('button', { onclick: this.toggleAllowSelectAll }, [
						buildToggleLabel('Select All', this._allowSelectAll)
					]),
					v('button', { onclick: this.toggleAllowTextSelection }, [
						buildToggleLabel('Allow Text Selection', this._allowTextSelection)
					])
				]),
				v('div', [
					v('button', { onclick: this.setSelectionModeNone }, ['Select Mode: None']),
					v('button', { onclick: this.setSelectionModeMultiple }, ['Select Mode: Multiple']),
					v('button', { onclick: this.setSelectionModeExtended }, ['Select Mode: Extended']),
					v('button', { onclick: this.setSelectionModeSingle }, ['Select Mode: Single'])
				])
			];
		} else {
			return [];
		}
	}

	private _deselectOnRefresh = false;
	private toggleDeselectOnRefresh(): void {
		this._deselectOnRefresh = !this._deselectOnRefresh;
		this.invalidate();
	}

	private _allowSelectAll = false;
	private toggleAllowSelectAll(): void {
		this._allowSelectAll = !this._allowSelectAll;
		this.invalidate();
	}

	private _selectionMode = SelectionMode.single;

	private _allowTextSelection = false;
	private toggleAllowTextSelection(): void {
		this._allowTextSelection = !this._allowTextSelection;
		this.invalidate();
	}

	private setSelectionModeNone() {
		this._selectionMode = SelectionMode.none;
		this.invalidate();
	}

	private setSelectionModeMultiple() {
		this._selectionMode = SelectionMode.multiple;
		this.invalidate();
	}

	private setSelectionModeExtended() {
		this._selectionMode = SelectionMode.extended;
		this.invalidate();
	}

	private setSelectionModeSingle() {
		this._selectionMode = SelectionMode.single;
		this.invalidate();
	}

	private _treeOn = false;
	private toggleTree(): void {
		this._treeOn = !this._treeOn;
		this.invalidate();
	}

	private renderTreeButtons() {
		if (this._treeOn) {
			return [
				v('div', [
					v('button', { onclick: this.toggleCollapseOnRefresh }, [
						buildToggleLabel('Collapse on Refresh', this._collapseOnRefresh)
					]),
					v('button', { onclick: this.toggleEnableTreeTransitions }, [
						buildToggleLabel('Tree Transitions', this._enableTreeTransitions)
					]),
					v('button', { onclick: this.updateTreeIndentWidth }, [
						'Set Tree Indent ' + this.nextTreeIndentWidth()
					])
				])
			];
		} else {
			return [];
		}
	}

	private _collapseOnRefresh = false;
	private toggleCollapseOnRefresh() {
		this._collapseOnRefresh = !this._collapseOnRefresh;
		this.invalidate();
	}

	private _enableTreeTransitions = false;
	private toggleEnableTreeTransitions() {
		this._enableTreeTransitions = !this._enableTreeTransitions;
		this.invalidate();
	}

	private _treeIndentWidth = 9;
	private updateTreeIndentWidth() {
		this._treeIndentWidth = this.nextTreeIndentWidth();
		this.invalidate();
	}

	private nextTreeIndentWidth() {
		return (this._treeIndentWidth + 20) % 100;
	}

	private _columnHiderOn = false;
	private toggleColumnHider(): void {
		this._columnHiderOn = !this._columnHiderOn;
		this.invalidate();
	}

	private _columnReorderOn = false;
	private toggleColumnReorder(): void {
		this._columnReorderOn = !this._columnReorderOn;
		this.invalidate();
	}

	private _columnResizerOn = false;
	private toggleColumnResizer(): void {
		this._columnResizerOn = !this._columnResizerOn;
		this.invalidate();
	}

	private _compoundColumnsOn = false;
	private toggleCompoundColumns(): void {
		this._compoundColumnsOn = !this._compoundColumnsOn;
		this.invalidate();
	}

	private _columnSetsOn = false;
	private toggleColumnSets(): void {
		this._columnSetsOn = !this._columnSetsOn;
		this.invalidate();
	}
}

export default App;
