import { create, tsx } from '@dojo/framework/core/vdom';

import { AssessmentGroup, Level, SkillName } from '../../interfaces';
import { LevelIcon } from '../level-icon/LevelIcon';
import * as css from './GroupAssessment.m.css';
import { store } from '../../middleware/store';

export interface GroupAssessmentProperties {
	title: string;
	skills: AssessmentGroup;
	readonly?: boolean;
	onChange?: (skill: SkillName, level: Level) => void;
}

const factory = create({ store }).properties<GroupAssessmentProperties>();

const NUM_LEVELS = Level.Expert + 1;

export const GroupAssessment = factory(function ({
	properties,
	middleware: {
		store: { get, path }
	}
}) {
	const { title, skills, onChange } = properties();
	const newSkills = get(path('skills', 'newSkills'));
	return (
		<div classes={css.root}>
			<h1 classes={css.title}>{title}</h1>
			{Object.entries(skills).map(([name, level]) => {
				const isNew =
					newSkills &&
					newSkills.find((newSkill) => {
						return newSkill.category === title && newSkill.skill === name;
					});

				return (
					<div
						classes={[css.row, isNew && css.isNew]}
						onclick={() => {
							if (onChange) {
								const nextLevel = (level + 1) % NUM_LEVELS;
								onChange(name, nextLevel);
							}
						}}
					>
						<LevelIcon key={title + name} level={level} />
						<span classes={css.name}>{name}</span>
					</div>
				);
			})}
		</div>
	);
});
