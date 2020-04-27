import icache from '@dojo/framework/core/middleware/icache';
import { create, tsx } from '@dojo/framework/core/vdom';
import Link from '@dojo/framework/routing/Link';
import Icon from '@dojo/widgets/icon';
import TwoColumnLayout from '@dojo/widgets/two-column-layout';

import { Level } from '../../interfaces';
import { store } from '../../middleware/store';
import { setFilters } from '../../processes/assessments.processes';
import { RouteName } from '../../routes';
import { getSkillAssessment, getSkillNames } from '../../util/skills';
import { Assessment } from '../assessment/Assessment';
import { SkillKey } from '../skill-key/SkillKey';
import { SkillsetFilter } from '../skillset-filter/SkillsetFilter';
import * as css from './Compare.m.css';

const factory = create({ store, icache });

export const Compare = factory(function ({
	middleware: {
		icache,
		store: { get, path, executor }
	}
}) {
	const matrix = get(path('matrix'));
	const assessments = get(path('compare', 'assessments'));
	const filters = get(path('compare', 'filters')) || [];
	const showAll = icache.getOrSet<number[]>('showAll', []);
	const skills = Array.from(getSkillNames(matrix));
	const filterSet = new Set(filters);
	const isFiltering = filters.length > 0;

	const leading = (
		<div>
			<SkillsetFilter
				skills={skills}
				initialSelected={filters}
				onChange={(skills) => {
					executor(setFilters)({ filters: skills });
				}}
			/>
			<Link to={RouteName.Home} classes={css.editLink}>
				<span classes={css.linkText}>Edit Hash list</span> <Icon type="editIcon" />
			</Link>
			<SkillKey />
		</div>
	);

	const trailing = (
		<div>
			{assessments.map(({ name = '', skills }, i) => {
				const shouldShowAll = showAll.includes(i);
				const skillAssessments = Array.from(getSkillAssessment(skills)).filter(
					({ skill, level }) => level > Level.None && (!isFiltering || shouldShowAll || filterSet.has(skill))
				);
				const toggleShowAll = () => {
					const filteredShowAll = showAll.filter((value) => value !== i);
					if (filteredShowAll.length === showAll.length) {
						filteredShowAll.push(i);
					}
					icache.set('showAll', filteredShowAll);
				};
				return (
					<Assessment title={name} skillAssessments={skillAssessments}>
						{isFiltering && (
							<span classes={css.showToggle} onclick={toggleShowAll}>
								{shouldShowAll ? 'See Less' : 'See All'}
							</span>
						)}
					</Assessment>
				);
			})}
		</div>
	);

	return (
		<div classes={css.root}>
			<TwoColumnLayout
				classes={{
					'@dojo/widgets/two-column-layout': {
						root: [css.layoutRoot],
						column: [css.column]
					}
				}}
			>
				{{
					leading,
					trailing
				}}
			</TwoColumnLayout>
		</div>
	);
});
