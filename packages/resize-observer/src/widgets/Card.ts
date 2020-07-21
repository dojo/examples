import { create, v } from '@dojo/framework/core/vdom';
import breakpoint from '@dojo/framework/core/middleware/breakpoint';
import * as css from './styles/card.m.css';

export interface CardProperties {
	labelOnLeft?: boolean;
}

const factory = create({ breakpoint }).properties<CardProperties>();

export default factory(function Column({ middleware: { breakpoint }, properties }) {
	const { breakpoint: bp } = breakpoint.get('root', {
		SM: 0,
		MD: 150,
		LG: 300
	}) || { breakpoint: 'SM' };
	const { labelOnLeft } = properties();
	return v(
		'div',
		{
			key: 'root',
			classes: [css.root, bp === 'SM' ? css.small : bp === 'MD' ? css.medium : css.big]
		},
		[
			v(
				'div',
				{
					classes: labelOnLeft ? css.badgeLeft : css.badge
				},
				[bp === 'SM' ? 'small' : bp === 'MD' ? 'med' : 'big']
			),
			v('div', { key: 'image', classes: css.figureHolder }, [v('div', { classes: css.figure })]),
			v('div', { key: 'body', classes: css.bodyHolder }, [
				v('h3', { classes: css.title }, [`Card Title`]),
				v('p', [
					'A basic card component. By default, the image is on top and full-width, but inside larger containers the image is positioned on the left and in very small containers the image is not displayed.'
				])
			])
		]
	);
});
