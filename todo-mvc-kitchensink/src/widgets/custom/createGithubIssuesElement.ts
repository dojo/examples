import { CustomElementDescriptor } from '@dojo/widget-core/customElements';
import { IssuesWidget } from '../IssuesWidget';

export default function createGitHubIssuesElement(): CustomElementDescriptor {
	return {
		tagName: 'github-issues',
		widgetConstructor: IssuesWidget,
		attributes: [
			{
				attributeName: 'user'
			},
			{
				attributeName: 'repo'
			}
		]
	};
}
