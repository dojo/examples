import { createCommandFactory, createProcess } from '@dojo/framework/stores/process';

import { SkillName, State } from '../interfaces';
import { getAssessment } from '../util/skills';

const commandFactory = createCommandFactory<State>();

const loadAssessmentsCommand = commandFactory<{ hashes: string[] }>(async ({ state, payload: { hashes } }) => {
	const matrix = state.matrix;
	const assessments = await Promise.all(hashes.map((hash) => getAssessment(hash, matrix)));

	state.compare.assessments = assessments;
});

const addAssessmentCommand = commandFactory<{ hash: string }>(async ({ state, payload: { hash } }) => {
	const matrix = state.matrix;
	const assessment = await getAssessment(hash, matrix);
	state.compare.assessments.push(assessment);
});

const setFiltersCommand = commandFactory<{ filters: SkillName[] }>(({ state, payload: { filters } }) => {
	state.compare.filters = filters;
});

const deleteAssessmentCommand = commandFactory<{ hash: string }>(async ({ state, payload: { hash } }) => {
	state.compare.assessments = state.compare.assessments.filter((assessment) => assessment.hash !== hash);
});

export const loadAssessments = createProcess('set-assessments', [loadAssessmentsCommand]);
export const setFilters = createProcess('set-filters', [setFiltersCommand]);
export const deleteAssessment = createProcess('remove-assessent', [deleteAssessmentCommand]);
export const addAssessment = createProcess('add-assessment', [addAssessmentCommand]);
