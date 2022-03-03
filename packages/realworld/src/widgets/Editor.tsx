import { create, tsx } from '@dojo/framework/core/vdom';
import store from '../store';
import {
	getEditorArticleProcess,
	titleInputProcess,
	descInputProcess,
	bodyInputProcess,
	tagInputProcess,
	addTagProcess,
	removeTagProcess,
	publishArticleProcess
} from '../processes/editorProcesses';
import ErrorList from './ErrorList';

export interface EditorProperties {
	slug?: string;
}

const factory = create({ store }).properties<EditorProperties>();

export const Editor = factory(function Editor({ middleware: { store }, properties }) {
	const { get, path, executor } = store;
	const article = get(path('editor')) || {};
	const errors = get(path('errors'));
	const { slug } = properties();

	if (slug && (!article || (article.slug !== slug && !article.isLoading))) {
		executor(getEditorArticleProcess)({ slug });
		return null;
	}

	return (
		<div classes={['editor-page']}>
			<div classes={['container', 'page']}>
				<div classes={['row']}>
					<div classes={['col-md-10', 'offset-md-1', 'col-xs-12']}>
						{errors && <ErrorList errors={errors} />}
						<form>
							<fieldset>
								<fieldset classes={['form-group']}>
									<input
										value={article.title}
										oninput={(event: KeyboardEvent<HTMLInputElement>) => {
											executor(titleInputProcess)({ title: event.target.value });
										}}
										placeholder="Article Title"
										classes={['form-control', 'form-control-lg']}
									/>
								</fieldset>
								<fieldset classes={['form-group']}>
									<input
										value={article.description}
										oninput={(event: KeyboardEvent<HTMLInputElement>) => {
											executor(descInputProcess)({ description: event.target.value });
										}}
										placeholder="What's this article about?"
										classes={['form-control', 'form-control-lg']}
									/>
								</fieldset>
								<fieldset classes={['form-group']}>
									<textarea
										value={article.body}
										oninput={(event: KeyboardEvent<HTMLTextAreaElement>) => {
											executor(bodyInputProcess)({ body: event.target.value });
										}}
										rows={8}
										placeholder="Write your article (in markdown)"
										classes={['form-control']}
									/>
								</fieldset>
								<fieldset classes={['form-group']}>
									<input
										onkeydown={(event: KeyboardEvent<HTMLInputElement>) => {
											if (event.keyCode === 13) {
												event.preventDefault();
												executor(addTagProcess)({ tag: event.target.value });
											}
										}}
										oninput={(event: KeyboardEvent<HTMLInputElement>) => {
											executor(tagInputProcess)({ tag: event.target.value });
										}}
										value={article.tag}
										placeholder="Enter Tag"
										classes={['form-control']}
									/>
									<div classes={['tag-list']}>
										{article.tagList &&
											article.tagList.map((tag) => (
												<span classes={['tag-default', 'tag-pill']}>
													<i
														onclick={() => {
															executor(removeTagProcess)({ tag });
														}}
														classes={['ion-close-round']}
													/>
													{tag}
												</span>
											))}
									</div>
								</fieldset>
								<button
									disabled={article.isLoaded && article.isLoading}
									onclick={(event: MouseEvent) => {
										event.preventDefault();
										executor(publishArticleProcess)({});
									}}
									classes={['btn', 'btn-lg', 'pull-xs-right', 'btn-primary']}
								>
									Publish Article
								</button>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
});

export default Editor;
