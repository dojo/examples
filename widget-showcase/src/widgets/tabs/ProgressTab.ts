import { create, w, v } from '@dojo/framework/core/vdom';
import cache from '@dojo/framework/core/middleware/cache';
import Progress from '@dojo/widgets/progress';
import * as css from '../../styles/tabs.m.css';

const factory = create({ cache });

export default factory(function ProgressTab({ middleware: { cache } }) {
	const customOutputMax = cache.get<number>('output-max') || 750;

	return v('div', { classes: css.root }, [
		v('h2', ['Progress Bars']),
		v('div', [
			v('h3', {}, ['value: 50%']),
			w(Progress, { value: 50 }),
			v('h3', {}, ['value: 0.3, max: 1']),
			w(Progress, { value: 0.3, max: 1 }),
			v('h3', {}, ['value: 250, custom output function']),
			w(Progress, {
				value: 250,
				max: customOutputMax,
				output: (value: number, percent: number) => {
					return `${value} of ${customOutputMax} is ${percent}%`;
				}
			}),
			v('h3', {}, ['value: 10, showOutput: false']),
			w(Progress, { value: 10, showOutput: false })
		])
	]);
});
