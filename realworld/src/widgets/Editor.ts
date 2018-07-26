import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import { ErrorList } from './ErrorList';
import { Errors, WithTarget } from '../interfaces';
import { TitlePayload, DescriptionPayload, BodyPayload, TagPayload } from '../processes/interfaces';

export interface EditorProperties {
	title: string;
	description: string;
	body: string;
	tag: string;
	errors?: Errors;
	inProgress?: boolean;
	slug: string;
	tags?: string[];
	onPublishPost: (opts: object) => void;
	onTitleInput: (opts: TitlePayload) => void;
	onDescriptionInput: (opts: DescriptionPayload) => void;
	onContentInput: (opts: BodyPayload) => void;
	onTagInput: (opts: TagPayload) => void;
	onTagCreate: (opts: TagPayload) => void;
	onTagDelete: (opts: TagPayload) => void;
}

export class Editor extends WidgetBase<EditorProperties> {
	private _onTitleInput({ target: { value: title } }: WithTarget) {
		this.properties.onTitleInput({ title });
	}

	private _onDescriptionInput({ target: { value: description } }: WithTarget) {
		this.properties.onDescriptionInput({ description });
	}

	private _onContentInput({ target: { value: body } }: WithTarget) {
		this.properties.onContentInput({ body });
	}

	private _onTagInput({ target: { value: tag } }: WithTarget) {
		this.properties.onTagInput({ tag });
	}

	private _onTagCreate(event: WithTarget<KeyboardEvent>) {
		if (event.keyCode === 13) {
			event.preventDefault();
			this.properties.onTagCreate({ tag: event.target.value });
		}
	}

	private _onPublishPost() {
		this.properties.onPublishPost({});
	}

	// prettier-ignore
	protected render() {
		const { onTagDelete, title, description, body, tag, errors, inProgress = false, tags = [] } = this.properties;
		return v('div', { classes: 'editor-page' }, [
			v('div', { classes: ['container', 'page'] }, [
				v('div', { classes: 'row' }, [
					v('div', { classes: ['col-md-10', 'offset-md-1', 'col-xs-12'] }, [
						errors ? w(ErrorList, { errors }) : null,
						v('form', [
							v('fieldset', [
								v('fieldset', { classes: 'form-group' }, [
									v('input', {
										classes: ['form-control', 'form-control-lg'],
										type: 'text',
										placeholder: 'Article Title',
										value: title,
										oninput: this._onTitleInput
									})
								]),
								v('fieldset', { classes: 'form-group' }, [
									v('input', {
										classes: 'form-control',
										type: 'text',
										placeholder: "What's this article about?",
										value: description,
										oninput: this._onDescriptionInput
									})
								]),
								v('fieldset', { classes: 'form-group' }, [
									v('textarea', {
										classes: 'form-control',
										type: 'text',
										rows: 8,
										placeholder: 'Write your article (in markdown)',
										value: body,
										oninput: this._onContentInput
									})
								]),
								v('fieldset', { classes: 'form-group' }, [
									v('input', {
										classes: 'form-control',
										type: 'text',
										placeholder: 'Enter tags',
										value: tag,
										oninput: this._onTagInput,
										onkeyup: this._onTagCreate
									}),
									v('div', { classes: 'tag-list' }, tags.map((tag) => {
										return v('span', { classes: ['tag-default', 'tag-pill'] }, [
											v('i', {
												classes: 'ion-close-round',
												onclick: () => {
													onTagDelete({ tag });
												}
											}),
											tag
										]);
									}))
								]),
								v('button', {
									classes: ['btn', 'btn-lg', 'pull-xs-right', 'btn-primary'],
									type: 'button',
									disabled: inProgress,
									onclick: this._onPublishPost
								}, ['Publish Article'])
							])
						])
					])
				])
			])
		]);
	}
}
