import { tsx, create } from '@dojo/framework/core/vdom';
import { theme } from '@dojo/framework/core/middleware/theme';
import Outlet from '@dojo/framework/routing/Outlet';

import TodoList from './widgets/TodoList';
import ThemeSwitcher from './widgets/ThemeSwitcher';
import TodoHeader from './widgets/TodoHeader';
import TodoSearch from './widgets/TodoSearch';
import TodoFooter from './widgets/TodoFooter';
import Credits from './widgets/Credits';

import * as css from './App.m.css';

const factory = create({ theme });

export default factory(function App({ middleware: { theme } }) {
	const { todoapp } = theme.get(css);
	return (
		<div>
			<section classes={[todoapp]}>
				<ThemeSwitcher />
				<TodoHeader />
				<TodoSearch />
				<Outlet
					key="list"
					id="view"
					renderer={({ params: { view, filter } }) => {
						return <TodoList view={view} filter={filter} />;
					}}
				/>
				<Outlet
					key="footer"
					id="view"
					renderer={({ params: { view, filter } }) => {
						return <TodoFooter filter={filter} />;
					}}
				/>
			</section>
			<Credits />
		</div>
	);
});
