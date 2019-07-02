import { create, tsx } from "@dojo/framework/core/vdom";
import { Outlet } from "@dojo/framework/routing/Outlet";

import Header from "./widgets/Header";
import Settings from "./widgets/Settings";
import Login from "./widgets/Login";
import Register from "./widgets/Register";
import Profile from "./widgets/Profile";
import Editor from "./widgets/Editor";
import Article from "./widgets/Article";
import Home from "./widgets/Home";
import Footer from "./widgets/Footer";

const factory = create();

export const App = factory(function App() {
	return (
		<div>
			<Header />
			<Outlet id="login" renderer={() => <Login />} />
			<Outlet id="register" renderer={() => <Register />} />
			<Outlet
				id="user"
				renderer={(details) => {
					if (details.isExact()) {
						return <Profile type="user" username={details.params.username} />;
					}
				}}
			/>
			<Outlet
				id="favorites"
				renderer={(details) => <Profile type="favorites" username={details.params.username} />}
			/>
			<Outlet id="edit-post" renderer={(details) => <Editor slug={details.params.slug} />} />
			<Outlet
				id="new-post"
				renderer={(details) => {
					if (details.isExact()) {
						return <Editor />;
					}
				}}
			/>
			<Outlet id="article" renderer={(details) => <Article slug={details.params.slug} />} />
			<Outlet id="settings" renderer={() => <Settings />} />
			<Outlet id="home" renderer={() => <Home />} />
			<Footer />
		</div>
	);
});

export default App;
