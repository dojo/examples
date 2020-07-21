import { create, tsx } from '@dojo/framework/core/vdom';
import { theme } from '@dojo/framework/core/middleware/theme';
import Link from '@dojo/framework/routing/ActiveLink';

import * as css from './styles/todoViewSwitch.m.css';

export interface TodoViewSwitchProperties {
	filter: string;
}

const factory = create({ theme }).properties<TodoViewSwitchProperties>();

export default factory(function TodoViewSwitch({ middleware: { theme }, properties }) {
	const { filter } = properties();
	const { active, viewChooser, list, cards, item, link } = theme.classes(css);
	return (
		<ul classes={[viewChooser]}>
			<li classes={[item]}>
				<Link to="view" params={{ view: 'list', filter }} activeClasses={[active]} classes={[list, link]} />
			</li>
			<li classes={[item]}>
				<Link to="view" params={{ view: 'card', filter }} activeClasses={[active]} classes={[cards, link]} />
			</li>
		</ul>
	);
});
