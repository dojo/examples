import { create, v, w } from '@dojo/framework/core/vdom';
import breakpoint from '@dojo/framework/core/middleware/breakpoint';
import icache from '@dojo/framework/core/middleware/icache';

import Calendar from './Calendar';
import Card from './Card';
import ResizableSection from './ResizableSection';
import Article from './Article';
import Column from './Column';
import Button from '@dojo/widgets/button';
import * as css from './styles/app.m.css';

const factory = create({ breakpoint, icache });

function increment(value: number, increment: number) {
	return Math.min(value + increment, 8);
}

function decrement(value: number, increment: number) {
	return Math.max(value - increment, 0);
}

function resize(columns: number[], column: number, expand: boolean, isMedium: boolean) {
	columns = [...columns];
	const incrementValue = isMedium ? 2 : 1;

	if (expand && columns[column] !== 8) {
		for (let i = column + 1; i < 4; i++) {
			if (columns[i] > 0) {
				columns[i] = decrement(columns[i], incrementValue);
				columns[column] = increment(columns[column], incrementValue);
				return columns;
			}
		}

		for (let i = column - 1; i >= 0; i--) {
			if (columns[i] > 0) {
				columns[i] = decrement(columns[i], incrementValue);
				columns[column] = increment(columns[column], incrementValue);
				return columns;
			}
		}
	} else if (!expand && columns[column] !== 0) {
		for (let i = column + 1; i < 4; i++) {
			if (columns[i] === 0) {
				columns[i] = increment(columns[i], incrementValue);
				columns[column] = decrement(columns[column], incrementValue);
				return columns;
			}
		}

		for (let i = column - 1; i >= 0; i--) {
			if (columns[i] === 0) {
				columns[i] = increment(columns[i], incrementValue);
				columns[column] = decrement(columns[column], incrementValue);
				return columns;
			}
		}

		if (columns[column + 1]) {
			columns[column + 1] = increment(columns[column + 1], incrementValue);
			columns[column] = decrement(columns[column], incrementValue);
		} else if (columns[column - 1]) {
			columns[column - 1] = increment(columns[column - 1], incrementValue);
			columns[column] = decrement(columns[column], incrementValue);
		}
	}

	return columns;
}

export default factory(function App({ middleware: { breakpoint, icache } }) {
	let cachedColumns = icache.get<number[]>('columns') || [2, 2, 2, 2];
	const offset = icache.get<number>('offset') || 0;
	const { breakpoint: bp } = breakpoint.get('root', {
		SM: 0,
		MD: 800,
		LG: 1000
	}) || { breakpoint: 'LG' };
	const isSmall = bp === 'SM';
	const isMedium = bp === 'MD';

	if (isMedium && cachedColumns.filter((columns) => columns % 2 === 1).length) {
		let numberOfOdd = cachedColumns.filter((column) => column % 2 === 1).length;
		const newColumns = cachedColumns.map((columns) => (columns % 2 === 1 ? columns - 1 : columns));
		const numberOfColumns = newColumns.length;

		let index = 0;
		while (numberOfOdd > 0) {
			if (newColumns[index] !== 0) {
				newColumns[index] = newColumns[index] + 2;
				numberOfOdd -= 2;
			}
			index = (index + 1) % numberOfColumns;
		}

		cachedColumns = newColumns;
		icache.set('columns', cachedColumns);
	}

	const widgets = [
		w(Article, {}),
		v('div', {}, [
			v('h3', {}, ['Nested Components']),
			w(Column, {}, [w(Card, { labelOnLeft: true }), w(Card, { labelOnLeft: true })])
		]),
		w(Calendar, {}),
		w(Card, {})
	];

	return v('div', { classes: css.root }, [
		isSmall
			? v('div', { key: 'controls', classes: css.controls }, [
					w(
						Button,
						{
							onClick: () => () => {
								const offset = icache.get<number>('offset') || 0;
								icache.set('offset', (offset + 1) % 4);
							}
						},
						['Switch Demo Positions']
					)
			  ])
			: null,
		v('div', { key: 'root' }, [
			v(
				'div',
				{ classes: css.parentContainer },
				cachedColumns.map((columns, index) => {
					const expand = () => {
						icache.set('columns', resize(cachedColumns, index, true, isMedium));
					};
					const shrink = () => {
						icache.set('columns', resize(cachedColumns, index, false, isMedium));
					};

					return !isSmall || index === offset
						? w(
								ResizableSection,
								{
									key: index,
									expand,
									shrink,
									columns,
									isSmall,
									isMedium
								},
								[widgets[index]]
						  )
						: null;
				})
			)
		])
	]);
});
