import { create, tsx } from '@dojo/framework/core/vdom';
import { Errors } from '../interfaces';

interface ErrorListProperties {
	errors: Errors;
}

const factory = create({}).properties<ErrorListProperties>();

export const ErrorList = factory(function ErrorList({ properties }) {
	const { errors } = properties();
	const errorCategories = Object.keys(errors);
	let errorList: string[] = [];
	for (let i = 0; i < errorCategories.length; i++) {
		errorList = [
			...errorList,
			...errors[errorCategories[i]].map((error: string) => `${errorCategories[i]} ${error}`)
		];
	}
	errorList;

	return (
		<ul classes={['error-messages']}>
			{errorList.map((error: string) => (
				<li>{error}</li>
			))}
		</ul>
	);
});

export default ErrorList;
