import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { v, w } from '@dojo/widget-core/d';
import { MenuItem } from './MenuItem';
import * as css from './styles/menu.m.css';
const logo = require('../img/logo.svg');

const categories = ['top', 'new', 'show', 'ask', 'jobs'];

export interface MenuProperties {
	currentCategory?: string;
}

export class Menu extends WidgetBase<MenuProperties> {
	private _logoLoaded = false;

	private _onLogoLoad() {
		this._logoLoaded = true;
		this.invalidate();
	}

	render() {
		const { currentCategory = '' } = this.properties;

		return v('nav', { classes: css.root }, [
			v('a', { href: '#/top/1', classes: css.home }, [
				v('img', {
					onload: this._onLogoLoad,
					classes: this._logoLoaded ? css.logoLoaded : css.logo,
					src: logo,
					alt: 'Home'
				})
			]),
			v(
				'ol',
				{ classes: css.menuContainer },
				categories.map(category => {
					return w(
						MenuItem,
						{
							key: category,
							selected: category === currentCategory,
							category
						},
						[category]
					);
				})
			)
		]);
	}
}
