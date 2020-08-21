import { create, tsx } from '@dojo/framework/core/vdom';
import Chip from '@dojo/widgets/chip';

import { SkillAssessment } from '../../interfaces';
import { LevelIcon } from '../level-icon/LevelIcon';
import * as css from './Assessment.m.css';

export interface AssessmentProperties {
	title: string;
	skillAssessments: SkillAssessment[];
}

const factory = create().properties<AssessmentProperties>();

const Widget = factory(function ({ properties, children }) {
	const { title, skillAssessments } = properties();

	return (
		<div classes={css.root}>
			<h1 classes={css.title}>{title}</h1>
			<div>
				{skillAssessments.length > 0 ? (
					skillAssessments.map(({ skill, level }) => (
						<Chip key={skill}>
							{{
								label: skill,
								icon: () => <LevelIcon small level={level} />
							}}
						</Chip>
					))
				) : (
					<div classes={css.noResults}>No matching skills found</div>
				)}
				{children()}
			</div>
		</div>
	);
});

export { Widget as Assessment };
