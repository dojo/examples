import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { v } from '@dojo/widget-core/d';

export class Banner extends WidgetBase {
	protected render() {
		return v('div', { classes: 'banner' }, [
			v('div', { classes: 'container' }, [
				v('h1', { classes: 'logo-font' }, ['conduit']),
				v('p', ['A place to share your knowledge.'])
			])
		]);
	}
}
