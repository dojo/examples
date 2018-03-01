import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { v, w } from '@dojo/widget-core/d';
import { Banner } from './Banner';
import { FeedsContainer } from './../containers/FeedsContainer';
import { TagsContainer } from './../containers/TagsContainer';

export class Home extends WidgetBase {
	protected render() {
		return v('div', { classes: 'home-page' }, [
			w(Banner, {}),
			v('div', { classes: ['container', 'page'] }, [
				v('div', { classes: 'row' }, [w(FeedsContainer, {}), w(TagsContainer, {})])
			])
		]);
	}
}
