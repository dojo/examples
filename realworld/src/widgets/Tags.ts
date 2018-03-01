import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { v } from '@dojo/widget-core/d';
import { FetchFeedPayload } from '../processes/interfaces';

export interface TagsProperties {
	tags?: string[];
	fetchFeed: (opts: FetchFeedPayload) => void;
}

export class Tags extends WidgetBase<TagsProperties> {
	// prettier-ignore
	protected render() {
		const { tags = [] } = this.properties;
		return v('div', { classes: 'col-md-3' }, [
			v('div', { classes: 'sidebar' }, [
				v('p', ['Popular Tags']),
				v(
					'div',
					{ classes: 'tag-list' },
					tags.map((tag, index) =>
						v('a', {
							href: '',
							onclick: (event: MouseEvent) => {
								event.preventDefault();
								this.properties.fetchFeed({ type: 'tag', page: 0, filter: tag });
							},
							key: `${index}`,
							classes: ['tag-pill', 'tag-default']
						}, [tag])
					)
				)
			])
		]);
	}
}
