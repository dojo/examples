import { v } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

import * as css from './styles/hackerNewsStory.m.css';
import { Item } from '../HackerNewsAppContext';

export const HackerNewsStoryBase = ThemeableMixin(WidgetBase);

export interface HackerNewsStoryProperties extends WidgetProperties, Item {}

@theme(css)
export default class HackerNewsStory extends HackerNewsStoryBase<HackerNewsStoryProperties> {
	private _getDomain(url?: string) {
		const withoutProtocol = url && (url.split('https://')[1] || url.split('http://')[1]);
		const domain = withoutProtocol && withoutProtocol.split('/')[0];
		const splitWithoutWWW = domain && domain.split('www.');
		const withoutWWW = splitWithoutWWW && (splitWithoutWWW.length > 1 ? splitWithoutWWW[1] : splitWithoutWWW[0]);
		if (!withoutWWW) {
			return null;
		}
		return v('span', { classes: this.classes(css.domain) }, [ ` (${withoutWWW})` ]);
	}

	protected render(): DNode {
		function pluralize(label: string, value: number) {
			return `${value} ${value !== 1 ? label + 's' : label}`;
		}

		const pointText = pluralize('point', this.properties.score || 0);
		const authorText = `by ${this.properties.by}`;
		const seconds = Math.floor(Date.now()/1000  - (this.properties.time || (Date.now()/1000)));
		const minutes = seconds && Math.floor(seconds/60);
		const hours = minutes && Math.floor(minutes/60);
		const days = hours && Math.floor(hours/24);
		const months = days && Math.floor(days/30);
		const years = months && Math.floor(months/12);
		const timeText = ((years && pluralize('year', years)) || (months && pluralize('month', months)) ||
			(days && pluralize('day', days)) || (hours && pluralize('hour', hours)) ||
			(minutes && pluralize('minute', minutes)) || pluralize('second', seconds)) + ' ago';

		return v('li', { classes: this.classes(css.story) }, [
			v('div', {}, [
				v(
					'a',
					{ href: this.properties.url, classes: this.classes(css.title) },
					[ this.properties.title || `Couldn't retrieve title` ]
				),
				this._getDomain(this.properties.url)
			]),
			v('div', { classes: this.classes(css.info) }, [
				`${pointText} ${authorText} ${timeText} | discuss`
			])
		]);
	}
}

