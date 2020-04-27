import { createCommandFactory, createProcess } from '@dojo/framework/stores/process';

import { SkillName, State } from '../interfaces';
import { getAssessment } from '../util/skills';

const commandFactory = createCommandFactory<State>();

const loadAssessmentsCommand = commandFactory<{ hashes: string[] }>(async ({ state, payload: { hashes } }) => {
	const matrix = state.matrix;
	const assessments = await Promise.all(hashes.map((hash) => getAssessment(hash, matrix)));

	state.compare.assessments = assessments;
});

const setFiltersCommand = commandFactory<{ filters: SkillName[] }>(({ state, payload: { filters } }) => {
	state.compare.filters = filters;
});

export const loadAssessments = createProcess('set-assessments', [loadAssessmentsCommand]);
export const setFilters = createProcess('set-filters', [setFiltersCommand]);
