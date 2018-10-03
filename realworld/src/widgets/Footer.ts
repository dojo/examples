import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { v } from '@dojo/framework/widget-core/d';

export class Footer extends WidgetBase {
	protected render() {
		return v('footer', [
			v('div', { classes: 'container' }, [
				v('a', { href: '/', classes: 'logo-font' }, ['conduit']),
				v('span', { classes: 'attribution' }, [
					'An interactive learning project from ',
					v('a', { href: 'https://thinkster.io' }, ['Thinkster']),
					' Code & design licensed under MIT.'
				])
			])
		]);
	}
}
