import { create, tsx } from '@dojo/framework/core/vdom';
import Outlet from '@dojo/framework/routing/Outlet';

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
				<Outlet
					id="content"
					renderer={({ params: { category, page } }) => {
						return <Content key={`${category}-${page}`} category={category} page={parseInt(page)} />;
					}}
				/>
				<Outlet
					id="comments"
					renderer={({ params: { id } }) => {
						return <Comments key={id} id={id} />;
					}}
				/>
			</main>
		</div>
	);
});
