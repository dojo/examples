import { createCommandFactory, createProcess } from '@dojo/framework/stores/process';

import { SkillName, State } from '../interfaces';
import { persistComparison } from '../util/persistence';
import { DELIMITER, getAssessment } from '../util/skills';

const commandFactory = createCommandFactory<State>();

const loadAssessmentsCommand = commandFactory<{ hashes: string[] }>(async ({ state, payload: { hashes } }) => {
	const matrix = state.matrix;
	const assessments = await Promise.all(hashes.map((hash) => getAssessment(hash, matrix)));

	const outdatedHashes = hashes.filter((hash) => {
		const hashVersion = hash.split(DELIMITER)[1];
		if (hashVersion !== state.matrixVersion) {
			return true;
		}
	});

	state.compare.assessments = assessments;
	state.compare.outdatedHashes = outdatedHashes;
	console.log('load persist');
	persistComparison(assessments.map((assessment) => assessment.hash).join(','));
});

const addAssessmentCommand = commandFactory<{ hash: string }>(async ({ state, payload: { hash } }) => {
	const matrix = state.matrix;
	const assessment = await getAssessment(hash, matrix);
	state.compare.assessments.push(assessment);
	persistComparison(state.compare.assessments.map((assessment) => assessment.hash).join(','));
});

const setFiltersCommand = commandFactory<{ filters: SkillName[] }>(({ state, payload: { filters } }) => {
	state.compare.filters = filters;
});

const deleteAssessmentCommand = commandFactory<{ hash: string }>(async ({ state, payload: { hash } }) => {
	const assessments = state.compare.assessments.filter((assessment) => assessment.hash !== hash);
	persistComparison(assessments.map((assessment) => assessment.hash).join(','));
	state.compare.assessments = assessments;
});

export const loadAssessments = createProcess('set-assessments', [loadAssessmentsCommand]);
export const setFilters = createProcess('set-filters', [setFiltersCommand]);
export const deleteAssessment = createProcess('remove-assessnent', [deleteAssessmentCommand]);
export const addAssessment = createProcess('add-assessment', [addAssessmentCommand]);
