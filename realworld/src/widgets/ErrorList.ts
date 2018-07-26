import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { v } from '@dojo/framework/widget-core/d';
import { Errors } from '../interfaces';

interface ErrorListProperties {
	errors: Errors;
}

export class ErrorList extends WidgetBase<ErrorListProperties> {
	protected render() {
		const { errors } = this.properties;
		const errorCategories = Object.keys(errors);
		let errorList: string[] = [];
		for (let i = 0; i < errorCategories.length; i++) {
			errorList = [
				...errorList,
				...errors[errorCategories[i]].map((error: string) => `${errorCategories[i]} ${error}`)
			];
		}
		errorList;

		return v('ul', { classes: 'error-messages' }, errorList.map((error: string) => v('li', [error])));
	}
}
