import icache from '@dojo/framework/core/middleware/icache';
import { create, tsx } from '@dojo/framework/core/vdom';
import Button from '@dojo/widgets/button';
import { Icon as DojoIcon } from '@dojo/widgets/icon';
import { TextInput } from '@dojo/widgets/text-input';

import { Level, SkillName } from '../../interfaces';
import { store } from '../../middleware/store';
import { loadAssessment, newAssessment, updateName, updateSkill } from '../../processes/assessment.processes';
import { buildCopyUrl, copyToClipboard } from '../../util/clipboard';
import { resumeHash } from '../../util/persistence';
import { GroupAssessment } from '../group-assessment/GroupAssessment';
import { Icon } from '../icon/Icon';
import { SkillKey } from '../skill-key/SkillKey';
import * as css from './Skills.m.css';
import * as buttonCss from '../styles/button.m.css';

const SUCCESS_DURATION = 1250;

const factory = create({ store, icache });

export const Skills = factory(function ({
	middleware: {
		icache,
		store: { get, path, executor }
	}
}) {
	const assessment = get(path('skills', 'assessment'));
	const hash = get(path('skills', 'hash')) || resumeHash();

	if (hash && !assessment) {
		executor(loadAssessment)({ hash });
		return;
	}

	if (!hash && !assessment) {
		executor(newAssessment)({});
		return;
	}

	const leading = (
		<div classes={css.column}>
			<TextInput
				key="personName"
				initialValue={assessment.name}
				onValue={(value) => {
					executor(updateName)({ name: value });
				}}
			>
				{{ label: 'Full Name' }}
			</TextInput>
			<div classes={css.hashInput}>
				<TextInput
					key="hashInput"
					initialValue={hash}
					disabled
				>
					{{
						label: 'Your Hash',
						trailing: (
							<Button
								classes={{
									'@dojo/widgets/button': {
										root: [buttonCss.trailing, icache.get('success') && css.successButton]
									}
								}}
								onClick={() => {
									copyToClipboard(buildCopyUrl([hash || '']));
									icache.set('success', true);
									setTimeout(() => {
										icache.set('success', false);
									}, SUCCESS_DURATION);
								}}
							>
								{icache.get('success') ? <DojoIcon type="checkIcon" /> : <Icon icon="copy" />}
							</Button>
						)
					}}
				</TextInput>
			</div>
			<SkillKey />
		</div>
	);
	const skillFields = (
		<div classes={css.column}>
			{Object.entries(assessment.skills).map(([groupName, group]) => (
				<GroupAssessment
					title={groupName}
					key={groupName}
					skills={group}
					onChange={(skill: SkillName, level: Level) => {
						executor(updateSkill)({ group: groupName, skill, level });
					}}
				/>
			))}
		</div>
	);

	return (
		<div classes={css.root}>
			{leading}
			{skillFields}
		</div>
	);
});
