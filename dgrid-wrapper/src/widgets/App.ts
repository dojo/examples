import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
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
	private data: DataItem[] = [
		{ first: 'Bob', last: 'Thomson', id: 1, hasChildren: true },
		{ first: 'Tom', last: 'Bobson', id: 2, hasChildren: true }
	];

	columnSets = [
		[[{ field: 'id', label: 'ID' }]],
		[[{ field: 'first', label: 'First' }], [{ field: 'last', label: 'Last' }]]
	];

	compoundColumns = [
		{
			label: 'Full Name',
			children: [{ field: 'first', label: 'First' }, { field: 'last', label: 'Last' }]
		},
		{ field: 'id', label: 'ID' }
	];

	protected render() {
		return v('div', {}, [
			w(DgridWrapper, {
				features: {
					pagination: this.paginationOn,
					keyboard: this.keyboardOn,
					selection: this.selectionType,
					tree: this.treeOn,
					columnHider: this.columnHiderOn,
					columnReorder: this.columnReorderOn,
					columnResizer: this.columnResizerOn,
					compoundColumns: this.compoundColumnsOn,
					columnSet: this.columnSetsOn
				},
				data: this.data,
				columns: this.compoundColumnsOn ? this.compoundColumns : this.columnDefs[this.columnToggle],
				columnSets: this.columnSets,

				rowsPerPage: this.rowsPerPage,
				previousNextArrows: this.previousNextArrows,
				firstLastArrows: this.firstLastArrows,
				pagingLinks: this.pagingLinks,

				pageSkip: this.pageSkip,
				tabIndex: 2,

				deselectOnRefresh: this.deselectOnRefresh,
				allowSelectAll: this.allowSelectAll,
				selectionMode: this.selectionMode,
				allowTextSelection: this.allowTextSelection,
				onSelect: (selected: SelectionData, selections: Selections) => {
					console.log('SELECTED:', selected);
					console.log('SELECTIONS:', selections);
				},
				onDeselect: (deselected: SelectionData, selections: Selections) => {
					console.log('DESELECTED:', deselected);
					console.log('SELECTIONS:', selections);
				},

				collapseOnRefresh: this.collapseOnRefresh,
				enableTreeTransitions: this.enableTreeTransitions,
				treeIndentWidth: this.treeIndentWidth,

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
					[buildToggleLabel('Pagination', this.paginationOn)]
				),
				v('div', this.renderPaginationButtons())
			]),
			v('p', [
				v(
					'button',
					{
						onclick: this.toggleKeyboard
					},
					[buildToggleLabel('Keyboard', this.keyboardOn)]
				),
				v('div', this.renderKeyboardButtons())
			]),
			v('p', [
				v(
					'button',
					{
						onclick: this.toggleSelectionOnOff
					},
					[buildToggleLabel('Selection', this.selectionType != null)]
				),
				v('div', this.renderSelectionButtons())
			]),
			v('p', [
				v(
					'button',
					{
						onclick: this.toggleTree
					},
					[buildToggleLabel('Tree', this.treeOn)]
				),
				v('div', this.renderTreeButtons())
			]),
			v('p', [
				v(
					'button',
					{
						onclick: this.toggleColumnHider
					},
					[buildToggleLabel('Column Hider', this.columnHiderOn)]
				)
			]),
			v('p', [
				v(
					'button',
					{
						onclick: this.toggleColumnReorder
					},
					[buildToggleLabel('Column Reorder', this.columnReorderOn)]
				)
			]),
			v('p', [
				v(
					'button',
					{
						onclick: this.toggleColumnResizer
					},
					[buildToggleLabel('Column Resizer', this.columnResizerOn)]
				)
			]),
			v('p', [
				v(
					'button',
					{
						onclick: this.toggleCompoundColumns
					},
					[buildToggleLabel('Compound Columns', this.compoundColumnsOn)]
				)
			]),
			v('p', [
				v(
					'button',
					{
						onclick: this.toggleColumnSets
					},
					[buildToggleLabel('Column Sets', this.columnSetsOn)]
				)
			])
		]);
	}

	private renderPaginationButtons() {
		if (this.paginationOn) {
			return [
				v('button', { onclick: this.updateRowsPerPage }, ['Set Rows Per Page ' + this.nextRowsPerPage()]),
				v('button', { onclick: this.togglePreviousNextArrows }, [
					buildToggleLabel('Prev/Next Arrows', this.previousNextArrows)
				]),
				v('button', { onclick: this.toggleFirstLastArrows }, [
					buildToggleLabel('First/Last Arrows', this.firstLastArrows)
				]),
				v('button', { onclick: this.updatePagingLinks }, ['Set Paging Links # ' + this.nextPagingLinks()])
			];
		} else {
			return [];
		}
	}

	paginationOn = false;
	private togglePagination(): void {
		this.paginationOn = !this.paginationOn;
		this.invalidate();
	}

	rowsPerPage = 5;
	private updateRowsPerPage(): void {
		this.rowsPerPage = this.nextRowsPerPage();
		this.invalidate();
	}

	private nextRowsPerPage() {
		return (this.rowsPerPage + 5) % 19;
	}

	previousNextArrows = true;
	private togglePreviousNextArrows(): void {
		this.previousNextArrows = !this.previousNextArrows;
		this.invalidate();
	}

	firstLastArrows = true;
	private toggleFirstLastArrows(): void {
		this.firstLastArrows = !this.firstLastArrows;
		this.invalidate();
	}

	pagingLinks = 2;
	private updatePagingLinks(): void {
		this.pagingLinks = this.nextPagingLinks();
		this.invalidate();
	}

	private nextPagingLinks() {
		let pagingLinks = (this.pagingLinks + 2) % 10;
		if (!pagingLinks) {
			pagingLinks = 2;
		}
		return pagingLinks;
	}

	private addData(): void {
		this.data = this.data.map((item) => {
			return duplicate(item);
		});
		for (let i = 0; i < 20; i++) {
			this.data.push({
				first: 'Extra',
				last: 'Person',
				id: this.data.length + 1,
				hasChildren: false,
				parent: (i % 2) + 1
			});
		}
		this.invalidate();
	}

	columnToggle = 0;
	columnDefs = [
		[{ field: 'first', label: 'First', renderExpando: true }, { field: 'last', label: 'Last' }],
		[
			{ field: 'id', label: 'ID', renderExpando: true },
			{ field: 'first', label: 'First' },
			{ field: 'last', label: 'Last' }
		]
	];
	private swapColumnDef(): void {
		this.columnToggle = this.columnToggle ? 0 : 1;
		this.invalidate();
	}

	keyboardOn = false;
	private toggleKeyboard(): void {
		this.keyboardOn = !this.keyboardOn;
		this.invalidate();
	}

	private renderKeyboardButtons() {
		if (this.keyboardOn) {
			return [v('button', { onclick: this.updatePageSkip }, ['Set Page Skip ' + this.nextPageSkip()])];
		} else {
			return [];
		}
	}

	pageSkip = 3;
	private updatePageSkip(): void {
		this.pageSkip = this.nextPageSkip();
		this.invalidate();
	}

	private nextPageSkip() {
		return (this.pageSkip + 2) % 9;
	}

	selectionType?: SelectionType;
	private toggleSelectionOnOff(): void {
		this.selectionType = this.selectionType ? undefined : SelectionType.row;
		this.invalidate();
	}
	private toggleSelectionType(): void {
		this.selectionType = this.selectionType === SelectionType.row ? SelectionType.cell : SelectionType.row;
		this.invalidate();
	}

	private renderSelectionButtons() {
		if (this.selectionType) {
			return [
				v('div', [
					v('button', { onclick: this.toggleSelectionType }, [
						'Set Selection Type ' + (this.selectionType === SelectionType.row ? 'Cell' : 'Row')
					])
				]),
				v('div', [
					v('button', { onclick: this.toggleDeselectOnRefresh }, [
						buildToggleLabel('Deselect On Referesh', this.deselectOnRefresh)
					]),
					v('button', { onclick: this.toggleAllowSelectAll }, [
						buildToggleLabel('Select All', this.allowSelectAll)
					]),
					v('button', { onclick: this.toggleAllowTextSelection }, [
						buildToggleLabel('Allow Text Selection', this.allowTextSelection)
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

	deselectOnRefresh = false;
	private toggleDeselectOnRefresh(): void {
		this.deselectOnRefresh = !this.deselectOnRefresh;
		this.invalidate();
	}

	allowSelectAll = false;
	private toggleAllowSelectAll(): void {
		this.allowSelectAll = !this.allowSelectAll;
		this.invalidate();
	}

	selection: { [id: string]: boolean };
	selectionMode = SelectionMode.single;

	allowTextSelection = false;
	private toggleAllowTextSelection(): void {
		this.allowTextSelection = !this.allowTextSelection;
		this.invalidate();
	}

	private setSelectionModeNone() {
		this.selectionMode = SelectionMode.none;
		this.invalidate();
	}

	private setSelectionModeMultiple() {
		this.selectionMode = SelectionMode.multiple;
		this.invalidate();
	}

	private setSelectionModeExtended() {
		this.selectionMode = SelectionMode.extended;
		this.invalidate();
	}

	private setSelectionModeSingle() {
		this.selectionMode = SelectionMode.single;
		this.invalidate();
	}

	treeOn = false;
	private toggleTree(): void {
		this.treeOn = !this.treeOn;
		this.invalidate();
	}

	private renderTreeButtons() {
		if (this.treeOn) {
			return [
				v('div', [
					v('button', { onclick: this.toggleCollapseOnRefresh }, [
						buildToggleLabel('Collapse on Refresh', this.collapseOnRefresh)
					]),
					v('button', { onclick: this.toggleEnableTreeTransitions }, [
						buildToggleLabel('Tree Transitions', this.enableTreeTransitions)
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

	collapseOnRefresh = false;
	private toggleCollapseOnRefresh() {
		this.collapseOnRefresh = !this.collapseOnRefresh;
		this.invalidate();
	}

	enableTreeTransitions = false;
	private toggleEnableTreeTransitions() {
		this.enableTreeTransitions = !this.enableTreeTransitions;
		this.invalidate();
	}

	treeIndentWidth = 9;
	private updateTreeIndentWidth() {
		this.treeIndentWidth = this.nextTreeIndentWidth();
		this.invalidate();
	}

	private nextTreeIndentWidth() {
		return (this.treeIndentWidth + 20) % 100;
	}

	columnHiderOn = false;
	private toggleColumnHider(): void {
		this.columnHiderOn = !this.columnHiderOn;
		this.invalidate();
	}

	columnReorderOn = false;
	private toggleColumnReorder(): void {
		this.columnReorderOn = !this.columnReorderOn;
		this.invalidate();
	}

	columnResizerOn = false;
	private toggleColumnResizer(): void {
		this.columnResizerOn = !this.columnResizerOn;
		this.invalidate();
	}

	compoundColumnsOn = false;
	private toggleCompoundColumns(): void {
		this.compoundColumnsOn = !this.compoundColumnsOn;
		this.invalidate();
	}

	columnSetsOn = false;
	private toggleColumnSets(): void {
		this.columnSetsOn = !this.columnSetsOn;
		this.invalidate();
	}
}

export default App;
