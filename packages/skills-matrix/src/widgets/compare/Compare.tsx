import icache from '@dojo/framework/core/middleware/icache';
import { create, tsx } from '@dojo/framework/core/vdom';
import Button from '@dojo/widgets/button';
import { Icon as DojoIcon } from '@dojo/widgets/icon';
import { Dialog } from '@dojo/widgets/dialog';
import { TextInput } from '@dojo/widgets/text-input';

import { AssessmentMap, Level } from '../../interfaces';
import { store } from '../../middleware/store';
import { addAssessment, deleteAssessment, loadAssessments, setFilters } from '../../processes/assessments.processes';
import { buildCopyUrl, copyToClipboard } from '../../util/clipboard';
// import { persistComparison, resumeComparison } from '../../util/persistence';
import { DELIMITER, getSkillAssessment, getSkillNames } from '../../util/skills';
import { AssessmentList } from '../assessment-list/AssessmentList';
import { Assessment } from '../assessment/Assessment';
import { Icon } from '../icon/Icon';
import { SkillKey } from '../skill-key/SkillKey';
import { SkillsetFilter } from '../skillset-filter/SkillsetFilter';
import * as css from './Compare.m.css';
import * as buttonCss from '../styles/button.m.css';
import { resumeComparison } from '../../util/persistence';

const factory = create({ store, icache });

const SUCCESS_DURATION = 1250;

export const Compare = factory(function ({
	middleware: {
		icache,
		store: { get, path, executor }
	}
}) {
	const outdatedHashes = get(path('compare', 'outdatedHashes'));
	const warningDismissed = icache.get('warningDismissed');
	const matrix = get(path('matrix'));
	const assessments = get(path('compare', 'assessments')).sort(({ name: nameA = '' }, { name: nameB = '' }) =>
		nameA < nameB ? -1 : 1
	);

	const resumeHashes = resumeComparison();
	if (assessments.length === 0 && resumeHashes) {
		executor(loadAssessments)({ hashes: resumeHashes.split(',') });
		return;
	}

	const assessmentsMap: AssessmentMap = icache.getOrSet('assessmentsMap', {});
	const filters = get(path('compare', 'filters')) || [];
	const showAll = icache.getOrSet<number[]>('showAll', []);
	const skills = Array.from(getSkillNames(matrix));
	const filterSet = new Set(filters);
	const isFiltering = filters.length > 0;

	const leading = (
		<div classes={css.column}>
			<SkillsetFilter
				skills={skills}
				initialSelected={filters}
				onChange={(skills) => {
					executor(setFilters)({ filters: skills });
				}}
			/>
			<div classes={css.hashInput}>
				<TextInput
					key="hashInput"
					initialValue={assessments
						.filter((assessment) => !assessmentsMap[assessment.hash])
						.map((assessment) => assessment.hash)
						.join(',')}
					disabled
				>
					{{
						label: 'Combined Hash',
						trailing: (
							<Button
								classes={{
									'@dojo/widgets/button': {
										root: [buttonCss.trailing, icache.get('success') && css.successButton]
									}
								}}
								onClick={() => {
									copyToClipboard(
										buildCopyUrl(
											assessments
												.filter((assessment) => !assessmentsMap[assessment.hash])
												.map((assessment) => assessment.hash)
										)
									);
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
			<AssessmentList
				assessments={assessments}
				assessmentsMap={assessmentsMap}
				onAdd={(hash) => executor(addAssessment)({ hash })}
				onChange={(hash, active) => {
					icache.set('assessmentsMap', {
						...assessmentsMap,
						[hash]: active
					});
				}}
				onRemove={(assessment) => executor(deleteAssessment)({ hash: assessment.hash })}
			/>
		</div>
	);

	const trailing = (
		<div classes={css.column}>
			{assessments.map(({ hash, name = '', skills }, i) => {
				if (assessmentsMap[hash]) {
					return undefined;
				}
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
					<Assessment title={name} skillAssessments={skillAssessments} key={hash}>
						{isFiltering && (
							<div classes={css.showToggle} onclick={toggleShowAll}>
								{shouldShowAll ? 'See Less' : 'See All'}
							</div>
						)}
					</Assessment>
				);
			})}
		</div>
	);

	return (
		<div classes={css.root}>
			{leading}
			{trailing}
			<Dialog
				underlay={false}
				closeable={true}
				onRequestClose={() => icache.set('warningDismissed', true)}
				open={outdatedHashes && outdatedHashes.length > 0 && !warningDismissed}
				role="dialog"
				classes={{
					'@dojo/widgets/dialog': {
						title: [css.dialogTitle],
						content: [css.dialogContent],
						actions: [css.dialogActions]
					}
				}}
			>
				{{
					title: 'Outdated Hashes',
					content: (
						<virtual>
							The following users have outdated hashes and should update them accordingly:
							<br />
							<ul>
								{outdatedHashes && outdatedHashes.map((hash) => <li>{hash.split(DELIMITER)[0]}</li>)}
							</ul>
						</virtual>
					),
					actions: <Button onClick={() => icache.set('warningDismissed', true)}>Continue</Button>
				}}
			</Dialog>
		</div>
	);
});
