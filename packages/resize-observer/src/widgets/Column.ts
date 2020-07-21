import { create, v } from '@dojo/framework/core/vdom';
import breakpoint from '@dojo/framework/core/middleware/breakpoint';
import * as css from './styles/columns.m.css';

const factory = create({ breakpoint });

export default factory(function Column({ middleware: { breakpoint }, children }) {
	const { breakpoint: bp } = breakpoint.get('root', { SM: 0, BG: 500 }) || { breakpoint: 'SM' };
	return v('div', { key: 'root', classes: [css.root, bp === 'SM' ? css.small : css.big] }, [
		v('div', { classes: css.badge }, [bp === 'SM' ? 'small' : 'big']),
		...children()
	]);
});
