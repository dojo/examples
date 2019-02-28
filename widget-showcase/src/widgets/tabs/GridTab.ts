import { v, w } from '@dojo/framework/widget-core/d';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import Grid from '@dojo/widgets/grid';
import { createFetcher, createUpdater } from '@dojo/widgets/grid/utils';

import * as css from '../../styles/tabs.m.css';
import { generateData } from '../../data';
import { ColumnConfig } from '@dojo/widgets/grid/interfaces';

export default class GridTab extends WidgetBase {

	private _data = generateData(100000);

	private _columnConfig: ColumnConfig[] = [
		{
			id: 'id',
			title: 'Id'
		},
		{
			id: 'firstName',
			title: 'First Name',
			renderer: (props: { value: string }) => {
				return v(
					'a',
					{
						href: 'https://google.com',
						target: '_blank'
					},
					[props.value]
				);
			}
		},
		{
			id: 'lastName',
			title: 'Last Name',
			sortable: true,
			filterable: true,
			editable: true
		},
		{
			id: 'location',
			title: 'Location',
			sortable: true,
			filterable: true
		}
	];

	protected render() {
		return v('div', { classes: css.root }, [
			w(Grid, {
				columnConfig: this._columnConfig,
				fetcher: createFetcher(this._data),
				updater: createUpdater(this._data),
				height: 400
			})
		]);
	}
}
