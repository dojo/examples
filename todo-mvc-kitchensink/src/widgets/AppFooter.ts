import { v } from '@dojo/widget-core/d';
import { WidgetProperties } from '@dojo/widget-core/interfaces';
import { theme, ThemeableMixin } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import * as styles from './styles/AppFooter.css';

@theme(styles)
export class AppFooter extends ThemeableMixin(WidgetBase)<WidgetProperties> {
	render() {
		return v('footer', {
			classes: this.classes(styles.footer).get()
		}, [
			v('p', {
				id: 'edit-instructions',
				innerHTML: 'Double-click or press Enter to edit a todo'
			}),
			v('p', {
				innerHTML: `Credits: 
<a href="https://github.com/matt-gadd">Matt Gadd</a>,
<a href="https://github.com/agubler">Anthony Gubler</a>
and
<a href="https://github.com/Tomdye">Tom Dye</a>`
			}),
			v('p', {
				innerHTML: 'Part of <a href="http://todomvc.com">TodoMVC</a>'
			})
		]);
	}
}

export default AppFooter;
