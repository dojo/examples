import { v, w } from '@dojo/framework/widget-core/d';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { ContentContainer } from './../containers/ContentContainer';
import { CommentsContainer } from './../containers/CommentsContainer';
import { MenuContainer } from './../containers/MenuContainer';

import * as css from './styles/app.m.css';
export class App extends WidgetBase<any> {
	protected render() {
		const { route } = this.properties;
		return v('div', [
			w(MenuContainer, {}),
			v('main', { classes: css.main }, [
				route === 'content' ? w(ContentContainer, {}) : null,
				route === 'comments' ? w(CommentsContainer, {}) : null
			])
		]);
	}
}
