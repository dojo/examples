import { create, w, v } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import Calendar from '@dojo/widgets/calendar';

const factory = create({ icache });

export default factory(function CalendarPane({ middleware: { icache } }) {
	const month = icache.get('month');
	const year = icache.get('year');
	const selected = icache.get('selected');

	return v('div', [
		w(Calendar, {
			month,
			selectedDate: selected,
			year,
			onMonthChange: (month: number) => {
				icache.set('month', month);
			},
			onYearChange: (year: number) => {
				icache.set('year', year);
			},
			onDateSelect: (date: Date) => {
				icache.set('selected', date);
			}
		}),
		selected ? v('p', [`Selected Date: ${selected.toDateString()}`]) : null
	]);
});
