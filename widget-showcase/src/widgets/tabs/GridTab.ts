import { create, w, v } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import Grid from '@dojo/widgets/grid';
import { createFetcher, createUpdater } from '@dojo/widgets/grid/utils';
import { FetcherOptions, FetcherResult, ColumnConfig } from '@dojo/widgets/grid/interfaces';
import TabController, { Align } from '@dojo/widgets/tab-controller';
import Tab from '@dojo/widgets/tab';

import * as css from '../../styles/tabs.m.css';
import { generateData } from '../../data';
import TextInput from '@dojo/widgets/text-input';

const factory = create({ icache });

async function fetcher(
	page: number,
	size: number,
	options: FetcherOptions = {}
): Promise<FetcherResult<any>> {
	let url = `https://mixolydian-appendix.glitch.me/user?page=${page}&size=${size}`;
	const { filter, sort } = options;
	if (filter) {
		Object.keys(filter).forEach((key) => {
			url = `${url}&${key}=${filter[key]}`;
		});
	}
	if (sort) {
		url = `${url}&sort=${sort.columnId}&direction=${sort.direction}`;
	}
	await new Promise((resolve) => setTimeout(resolve, 4000));
	const response = await fetch(url, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const data = await response.json();
	return {
		data: data.data,
		meta: {
			total: data.total
		}
	};
}

/**
 * Custom updater that builds the API url based on the update item.
 * Provides remote updates for grid data.
 */
async function updater(item: any) {
	const { id, ...data } = item;
	const url = `https://mixolydian-appendix.glitch.me/user/${id}`;
	await fetch(url, {
		body: JSON.stringify(data),
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

const simpleColumnConfig: ColumnConfig[] = [
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

const advancedColumnConfig: ColumnConfig[] = [
	{
		id: 'firstName',
		title: 'First Name',
		filterable: true,
		sortable: true,
		editable: true,
		resizable: true
	},
	{
		id: 'lastName',
		title: 'Last Name',
		filterable: true,
		sortable: true,
		editable: true,
		resizable: true
	},
	{
		id: 'phoneNumber',
		title: 'Phone #',
		filterable: true,
		sortable: true,
		editable: true,
		resizable: true
	},
	{
		id: 'country',
		title: 'Country',
		filterable: true,
		sortable: true,
		editable: true,
		resizable: true
	}
];

interface Item {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	country: string;
}

export default factory(function GridTab({ middleware: { icache } }) {
	const data = icache.getOrSet('data', generateData(10000));
	const activeIndex = icache.get<number>('active') || 0;
	const selectedItems = icache.getOrSet<Item[]>('selected', []);

	return w(
		TabController,
		{
			alignButtons: Align.right,
			activeIndex: activeIndex,
			onRequestTabChange: (index: number) => {
				icache.set('active', index);
			}
		},
		[
			w(
				Tab,
				{
					key: 'simple-grid-tab',
					label: 'Simple Grid'
				},
				[
					v('div', { classes: css.root }, [
						w(Grid, {
							columnConfig: simpleColumnConfig,
							fetcher: createFetcher(data),
							updater: createUpdater(data),
							height: 400
						})
					])
				]
			),
			w(
				Tab,
				{
					key: 'adavanced-grid-tab',
					label: 'Advanced Grid'
				},
				[
					v('div', [
						w(Grid, {
							height: 400,
							pagination: true,
							onRowSelect: (items: Item[]) => {
								icache.set('selected', items);
							},
							fetcher,
							updater,
							columnConfig: advancedColumnConfig
						}),
						v('div', [
							v('h1', ['Selected Items']),
							...selectedItems.map((item) => {
								return v('div', {}, [
									w(TextInput, { label: 'First Name', readOnly: true, value: item.firstName }),
									w(TextInput, { label: 'Last Name', readOnly: true, value: item.lastName }),
									w(TextInput, { label: 'Phone #', readOnly: true, value: item.phoneNumber }),
									w(TextInput, { label: 'Country', readOnly: true, value: item.country })
								]);
							})
						])
					])
				]
			)
		]
	);
});
