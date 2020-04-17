import { tsx, create } from '@dojo/framework/core/vdom';
import Route from '@dojo/framework/routing/Route';
import Header from './Header';
import BlogList from './BlogList';
import Blog from './Blog';

const factory = create();

export default factory(function App() {
	return (
		<div>
			<Header title="My Dojo Blog" />
			<Route id="blog-list" renderer={() => <BlogList />} />
			<Route id="blog" renderer={({ params }) => <Blog name={params.blog} />} />
		</div>
	);
});
