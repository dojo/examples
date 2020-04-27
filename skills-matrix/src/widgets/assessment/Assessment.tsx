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
		skillAssessments.length > 0 && (
			<div classes={css.root}>
				<h1 classes={css.title}>{title}</h1>
				<div>
					{skillAssessments.map(({ skill, level }) => (
						<Chip
							key={skill}
							classes={{
								'@dojo/widgets/chip': {
									root: [css.chip],
									iconWrapper: [css.chipIcon]
								}
							}}
						>
							{{
								label: skill,
								icon: () => <LevelIcon small level={level} />
							}}
						</Chip>
					))}
					{children()}
				</div>
			</div>
		)
	);
});

export { Widget as Assessment };
