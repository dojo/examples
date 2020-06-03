import icache from '@dojo/framework/core/middleware/icache';
import { create, tsx } from '@dojo/framework/core/vdom';
import Button from '@dojo/widgets/button';
import { Icon as DojoIcon } from '@dojo/widgets/icon';
import TwoColumnLayout from '@dojo/widgets/two-column-layout';

import { Level, SkillName } from '../../interfaces';
import { store } from '../../middleware/store';
import { newAssessment, updateName, updateSkill } from '../../processes/assessment.processes';
import { buildCopyUrl, copyToClipboard } from '../../util/clipboard';
import { GroupAssessment } from '../group-assessment/GroupAssessment';
import { Icon } from '../icon/Icon';
import { SkillKey } from '../skill-key/SkillKey';
import TextInput from '../text-input/TextInput';
import * as css from './Skills.m.css';

const SUCCESS_DURATION = 1250;

const factory = create({ store, icache });

export const Skills = factory(function ({
	middleware: {
		icache,
		store: { get, path, executor }
	}
}) {
	const assessment = get(path('skills', 'assessment'));
	const hash = get(path('skills', 'hash'));

	if (!assessment) {
		executor(newAssessment)({});
		return;
	}

	const leading = (
		<div>
			<TextInput
				key="personName"
				label="Full Name"
				initialValue={assessment.name}
				onValue={(value) => {
					executor(updateName)({ name: value });
				}}
			/>
			<div classes={css.hashInput}>
				<TextInput key="hashInput" label="Your Hash" initialValue={hash} disabled>
					{{
						trailing: (
							<Button
								classes={{
									'@dojo/widgets/button': {
										root: [css.copyButton, icache.get('success') && css.successButton]
									}
								}}
								onClick={() => {
									copyToClipboard(buildCopyUrl([hash]));
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
		<div>
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
					trailing: skillFields
				}}
			</TwoColumnLayout>
		</div>
	);
});
