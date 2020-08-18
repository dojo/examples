import { create, tsx } from '@dojo/framework/core/vdom';

import { AssessmentGroup, Level, SkillName } from '../../interfaces';
import { LevelIcon } from '../level-icon/LevelIcon';
import * as css from './GroupAssessment.m.css';

export interface GroupAssessmentProperties {
	title: string;
	skills: AssessmentGroup;
	readonly?: boolean;
	onChange?: (skill: SkillName, level: Level) => void;
}

const factory = create().properties<GroupAssessmentProperties>();

const NUM_LEVELS = Level.Expert + 1;

export const GroupAssessment = factory(function ({ properties }) {
	const { title, skills, onChange } = properties();
	return (
		<div classes={css.root}>
			<h1 classes={css.title}>{title}</h1>
			{Object.entries(skills).map(([name, level]) => (
				<div
					classes={css.row}
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
			))}
		</div>
	);
});
