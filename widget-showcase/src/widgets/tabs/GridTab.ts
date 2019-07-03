import { create, w, v } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import Grid from '@dojo/widgets/grid';
import { createFetcher, createUpdater } from '@dojo/widgets/grid/utils';
import { ColumnConfig } from '@dojo/widgets/grid/interfaces';

import * as css from '../../styles/tabs.m.css';
import { generateData } from '../../data';

const factory = create({ icache });

const columnConfig: ColumnConfig[] = [
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

export default factory(function GridTab({ middleware: { icache } }) {
	const data = icache.getOrSet('data', generateData(10000));
	return v('div', { classes: css.root }, [
		w(Grid, {
			columnConfig: columnConfig,
			fetcher: createFetcher(data),
			updater: createUpdater(data),
			height: 400
		})
	]);
});
