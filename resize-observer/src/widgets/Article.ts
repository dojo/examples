import { create, v } from '@dojo/framework/core/vdom';
import breakpoint from '@dojo/framework/core/middleware/breakpoint';
import * as css from './styles/article.m.css';

const factory = create({ breakpoint });

export default factory(function Article({ middleware: { breakpoint } }) {
	const { breakpoint: bp } = breakpoint.get('root', {
		SM: 0,
		MD: 500,
		LG: 800
	}) || { breakpoint: 'SM' };

	return v(
		'div',
		{
			key: 'root',
			classes: [css.root, bp === 'SM' ? css.small : bp === 'MD' ? css.medium : css.big]
		},
		[
			v('div', { classes: css.badge }, [bp === 'SM' ? 'small' : bp === 'MD' ? 'med' : 'big']),
			v('h3', { classes: css.title }, ['Multi-column layout']),
			v('div', { key: 'content', classes: css.content }, [
				v('p', { classes: css.paragraph }, [
					'This app demonstrates the use of the resize meta to allow widgets to adjust their display dynamically based on the space available to them in their current container. These widgets will adjust their styles as they are moved between containers. The design of the example widgets is heavily inspired by ',
					v('a', { href: 'https://philipwalton.github.io/responsive-components/' }, [
						'the demo of this concept '
					]),
					'created by Philip Walton'
				]),
				v('p', { classes: css.paragraph }, [
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
				]),
				v('p', { classes: css.paragraph }, [
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
				])
			])
		]
	);
});
