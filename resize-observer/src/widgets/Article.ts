import WidgetBase from '@dojo/widget-core/WidgetBase';
import { v } from '@dojo/widget-core/d';
import Resize, { ContentRect } from '@dojo/widget-core/meta/Resize';
import * as css from './styles/article.m.css';

export class Article extends WidgetBase {

	protected _mediumPredicate(contentRect: ContentRect) {
		return contentRect.width < 800;
	}

	protected _smallPredicate(contentRect: ContentRect) {
		return contentRect.width < 500;
	}

	private _getSizeClass(isMedium: boolean, isSmall: boolean): string {
		if (isSmall) {
			return css.small;
		} else if (isMedium) {
			return css.medium;
		} else {
			return css.big;
		}
	}

	protected render() {
		const { isMedium, isSmall } = this.meta(Resize).get('root', {
			isMedium: this._mediumPredicate,
			isSmall: this._smallPredicate
		});

		return v('div', {
			key: 'root',
			classes: [
				css.root,
				this._getSizeClass(isMedium, isSmall)
			]
		}, [
			v('div', { classes: css.badge }, [ isSmall ? 'small' : isMedium ? 'med' : 'big' ]),
			v('h3', { classes: css.title }, [ 'Multi-column layout' ]),
			v('div', { key: 'content', classes: css.content }, [
				v('p', [
				  'This app demonstrates the use of the resize meta to allow widgets to adjust their display dynamically based on the space available to them in their current container. These widgets will adjust their styles as they are moved between containers. The design of the example widgets is heavily inspired by ',
          v('a', { href: 'https://philipwalton.github.io/responsive-components/' }, [ 'the demo of this concept ' ]),
          'created by Philip Walton'
        ]),
				v('p', [ 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' ]),
				v('p', [ 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' ])
			])
		]);
	}
}

export default Article;
