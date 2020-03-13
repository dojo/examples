import { create, v } from '@dojo/framework/core/vdom';
import breakpoint from '@dojo/framework/core/middleware/breakpoint';
import * as css from './styles/calendar.m.css';

const times = ['9 a.m.', '10 a.m.', '11 a.m.', '12 p.m.', '1 p.m.', '2 p.m.', '3 p.m.', '4 p.m.', '5 p.m.'];

interface CalendarEntry {
	time: string;
	duration: number;
	start: number;
	description: string;
}

interface Day {
	date: number;
	weekday: string;
	entries: CalendarEntry[];
}

const days: Day[] = [
	{
		date: 5,
		weekday: 'Mon',
		entries: [
			{
				time: '9 - 11 a.m.',
				start: 9,
				duration: 2,
				description: 'Planning'
			},
			{
				time: '12 - 2 p.m.',
				start: 12,
				duration: 2,
				description: 'Team lunch'
			}
		]
	},
	{
		date: 6,
		weekday: 'Tue',
		entries: [
			{
				time: '12 - 1 p.m.',
				start: 12,
				duration: 1,
				description: 'Work out'
			},
			{
				time: '2 - 3 p.m.',
				start: 14,
				duration: 1,
				description: 'Doctor'
			},
			{
				time: '4 - 6 p.m.',
				start: 16,
				duration: 2,
				description: 'Soccer'
			}
		]
	},
	{
		date: 7,
		weekday: 'Wed',
		entries: [
			{
				time: '9 - 11 a.m.',
				start: 9,
				duration: 2,
				description: 'Customer call'
			},
			{
				time: '2 - 6 p.m.',
				start: 14,
				duration: 2,
				description: 'Team event'
			}
		]
	},
	{
		date: 8,
		weekday: 'Thu',
		entries: [
			{
				time: '12 - 1 p.m.',
				start: 12,
				duration: 1,
				description: 'Work out'
			}
		]
	},
	{
		date: 9,
		weekday: 'Fri',
		entries: [
			{
				time: '9 - 6 p.m.',
				start: 9,
				duration: 9,
				description: 'No meetings'
			}
		]
	}
];

const entryHeight = 3.333;

const factory = create({ breakpoint });

export default factory(function Calendar({ middleware: { breakpoint } }) {
	const { breakpoint: bp } = breakpoint.get('root', {
		SM: 0,
		MD: 500,
		LG: 800
	}) || { breakpoint: 'SM' };
	const isSmall = bp === 'SM';
	const isMedium = bp === 'MD';

	const sizeClass = isSmall ? null : isMedium ? css.medium : css.large;

	return v('div', { key: 'root', classes: [css.root, sizeClass] }, [
		v('div', { classes: css.badge }, [isSmall ? 'small' : isMedium ? 'med' : 'big']),
		v(
			'ul',
			{ classes: css.calendarTimes },
			times.map((time) => v('li', { classes: css.calendarTime }, [time]))
		),
		...days.map(({ date, weekday, entries }, i) =>
			v('div', { key: i, classes: css.calendarDay }, [
				v('header', { classes: css.calendarDayHeader }, [
					v('div', { classes: css.calendarDate }, [
						v('div', { classes: css.calendarDateMo }, [String(date)]),
						v('div', { classes: css.calendarDateWk }, [weekday])
					])
				]),
				v(
					'ul',
					{ classes: css.calendarEntries },
					entries.map(({ duration, start, time, description }, i) =>
						v(
							'li',
							{
								key: i,
								classes: css.calendarEntry,
								styles: {
									height: `calc(${duration} * ${entryHeight}em)`,
									top: `calc(${start} * ${entryHeight}em - ${9 * entryHeight}em)`
								}
							},
							[
								v('div', { classes: css.calendarEntryTime }, [time]),
								v('div', { classes: css.calendarEntryDesc }, [description])
							]
						)
					)
				)
			])
		)
	]);
});
