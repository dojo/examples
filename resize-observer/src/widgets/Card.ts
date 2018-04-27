import WidgetBase from '@dojo/widget-core/WidgetBase';
import { v } from '@dojo/widget-core/d';
import Resize, { ContentRect } from '@dojo/widget-core/meta/Resize';
import * as css from './styles/card.m.css';

export class Card extends WidgetBase<CardProperties> {
  protected _smallPredicate(contentRect: ContentRect) {
    return contentRect.width < 150;
  }

	protected _mediumPredicate(contentRect: ContentRect) {
		return contentRect.width < 300;
	}

	protected render() {
		const { isMedium, isSmall } = this.meta(Resize).get('root', {
			isMedium: this._mediumPredicate,
      isSmall: this._smallPredicate
		});

		return v('div', { key: 'root', classes: [
				css.root,
				isSmall ? css.small : (isMedium ? css.medium : css.big)
			] }, [
			v('div', {
			  classes: this.properties.labelOnLeft ? css.badgeLeft : css.badge
      }, [
        isSmall ? 'small' : (isMedium ? 'med' : 'big')
      ]),
			v('div', { key: 'image', classes: css.figureHolder }, [
				v('div', { classes: css.figure })
			]),
			v('div', { key: 'body', classes: css.bodyHolder }, [
				v('h3', { classes: css.title }, [ `Card Title` ]),
				v('p', [ 'A basic card component. By default, the image is on top and full-width, but inside larger containers the image is positioned on the left and in very small containers the image is not displayed.' ])
			])
		]);
	}
}

export default Card;

export interface CardProperties {
  labelOnLeft?: boolean
}
