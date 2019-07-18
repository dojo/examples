import { create, tsx } from '@dojo/framework/core/vdom';
import ActiveLink from './ActiveLink';
import Link from '@dojo/framework/routing/Link';

import * as css from './styles/menu.m.css';
const logo = require('../img/logo.svg');

export interface MenuProperties {
	currentCategory?: string;
}

const categories = ['top', 'new', 'show', 'ask', 'jobs'];

const factory = create();

export default factory(function Menu() {
	return (
		<nav classes={[css.root]}>
			<Link to="content" params={{ page: '1', category: 'top' }} classes={[css.home]}>
				<img src={logo} alt="Home" classes={[css.logoLoaded]} />
			</Link>
			<ol classes={[css.menuContainer]}>
				{categories.map((category) => (
					<li classes={[css.item]}>
						<ActiveLink
							classes={[css.link]}
							activeClasses={[css.selected]}
							to="content"
							params={{ category, page: '1' }}
							matchParams={{ category }}
						>
							{category}
						</ActiveLink>
					</li>
				))}
			</ol>
		</nav>
	);
});
