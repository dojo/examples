import { create, tsx } from '@dojo/framework/core/vdom';
import { Route } from '@dojo/framework/routing/Route';

import Header from './widgets/Header';
import Settings from './widgets/Settings';
import Login from './widgets/Login';
import Register from './widgets/Register';
import Profile from './widgets/Profile';
import Editor from './widgets/Editor';
import Article from './widgets/Article';
import Home from './widgets/Home';
import Footer from './widgets/Footer';

const factory = create();

export const App = factory(function App() {
	return (
		<div>
			<Header />
			<Route id="login" renderer={() => <Login />} />
			<Route id="register" renderer={() => <Register />} />
			<Route
				id="user"
				renderer={(details) => {
					if (details.isExact()) {
						return <Profile type="user" username={details.params.username} />;
					}
				}}
			/>
			<Route
				id="favorites"
				renderer={(details) => <Profile type="favorites" username={details.params.username} />}
			/>
			<Route id="edit-post" renderer={(details) => <Editor slug={details.params.slug} />} />
			<Route
				id="new-post"
				renderer={(details) => {
					if (details.isExact()) {
						return <Editor />;
					}
				}}
			/>
			<Route id="article" renderer={(details) => <Article slug={details.params.slug} />} />
			<Route id="settings" renderer={() => <Settings />} />
			<Route id="home" renderer={() => <Home />} />
			<Footer />
		</div>
	);
});

export default App;
