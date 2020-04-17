import { create, tsx } from '@dojo/framework/core/vdom';
import Route from '@dojo/framework/routing/Route';

import Comments from './Comments';
import Content from './Content';
import Menu from './Menu';

import * as css from './styles/app.m.css';

const factory = create();

export default factory(function App() {
	return (
		<div>
			<Menu />
			<main classes={[css.main]}>
				<Route
					id="content"
					renderer={({ params: { category, page } }) => {
						return <Content key={`${category}-${page}`} category={category} page={parseInt(page)} />;
					}}
				/>
				<Route
					id="comments"
					renderer={({ params: { id } }) => {
						return <Comments key={id} id={id} />;
					}}
				/>
			</main>
		</div>
	);
});
