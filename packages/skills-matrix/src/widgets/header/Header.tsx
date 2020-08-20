import { create, tsx } from '@dojo/framework/core/vdom';
import Link from '@dojo/framework/routing/Link';
import Route from '@dojo/framework/routing/Route';
import Header from '@dojo/widgets/header';

import { RouteName } from '../../routes';
import { Icon } from '../icon/Icon';
import * as css from './Header.m.css';

const factory = create();

export default factory(function () {
	const backArrow = () => (
		<Link to={RouteName.Home} classes={css.arrow}>
			<Icon icon="backArrow" />
		</Link>
	);

	const leading = (
		<div>
			<Route id={RouteName.Compare} renderer={backArrow} />
			<Route id={RouteName.Skills} renderer={backArrow} />
		</div>
	);

	return (
		<div classes={[css.root]}>
			<Header>
				{{
					title: 'Skill Tracker',
					leading
				}}
			</Header>
		</div>
	);
});
