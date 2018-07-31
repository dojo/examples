import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v } from '@dojo/framework/widget-core/d';
import Resize, { ContentRect } from '@dojo/framework/widget-core/meta/Resize';
import * as css from './styles/columns.m.css';

export class Column extends WidgetBase {

	protected _smallPredicate(contentRect: ContentRect) {
		return contentRect.width < 500;
	}

	protected render() {
		const { isSmall } = this.meta(Resize).get('root', {
			isSmall: this._smallPredicate
		});

		return v('div', { key: 'root', classes: [ css.root, isSmall ? css.small : css.big ] }, [
			v('div', { classes: css.badge }, [ isSmall ? 'small' : 'big' ]),
			...this.children
		]);
	}
}

export default Column;
