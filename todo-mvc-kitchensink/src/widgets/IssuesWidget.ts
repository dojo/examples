import request from '@dojo/core/request';
import { v } from '@dojo/widget-core/d';
import { WidgetProperties } from '@dojo/widget-core/interfaces';
import { theme, ThemeableMixin, ThemeableProperties } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import * as styles from './styles/IssuesWidget.m.css';

export interface IssuesWidgetProperties extends WidgetProperties, ThemeableProperties {
	user: string;
	repo: string;
}

interface Issue {
	title: string;
	link: string;
	number: number;
}

@theme(styles)
export class IssuesWidget extends ThemeableMixin(WidgetBase)<IssuesWidgetProperties> {
	private _issues: Issue[] = [];
	private _loaded = false;

	render() {
		if (!this._loaded) {
			this._loadIssues();
			this._loaded = true;
		}

		if (!this._issues.length) {
			return v('section');
		}
		else {
			return v('section', [
				v('h6', {
					classes: this.classes(styles.widgetTitle),
					innerHTML: 'This GitHub issues widget is a custom element!'
				}),
				v('ul', {
					classes: this.classes(styles.issuesWidget)
				}, this._issues.map(issue => {
					return v('li', {
						classes: this.classes(styles.issue)
					}, [
						v('span', {
							classes: this.classes(styles.issueNumber),
							innerHTML: String(issue.number)
						}),
						v('a', {
							classes: this.classes(styles.issueTitle),
							href: issue.link,
							innerHTML: issue.title,
							target: '_blank'
						})
					]);
				}))
			]);
		}
	}

	private _loadIssues() {
		const { user, repo } = this.properties;

		return request
			.get(`https://api.github.com/repos/${user}/${repo}/issues`)
			.then(response => response.json())
			.then(json => {
				if (json instanceof Array) {
					let issues: Issue[] = [];

					json.forEach((githubIssue: any) => {
						const issue: Issue = {
							title: githubIssue.title,
							number: githubIssue.number,
							link: githubIssue.html_url
						};

						issues.push(issue);
					});

					this._issues = issues;
					this.invalidate();
				}
			});
	}
}

export default IssuesWidget;
