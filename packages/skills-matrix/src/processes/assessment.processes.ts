import { createCommandFactory, createProcess } from '@dojo/framework/stores/process';

import { Level, CachedSkill, SkillHash, SkillMatrix, SkillName, State } from '../interfaces';
import { persistHash } from '../util/persistence';
import { createAssessment, createHash, getAssessment, getMatrixVersion } from '../util/skills';

const commandFactory = createCommandFactory<State>();

const setSkillMatrixCommand = commandFactory<{ matrix: SkillMatrix }>(async ({ state, payload: { matrix } }) => {
	state.matrix = matrix;
	state.matrixVersion = await getMatrixVersion(matrix);
	delete state.skills;
});

const newAssessmentCommand = commandFactory<{ name?: string }>(async ({ payload: { name = '' }, state }) => {
	const { matrix, matrixVersion } = state;
	const assessment = createAssessment(matrix, { name });
	const hash = createHash(assessment, matrixVersion);
	assessment.hash = hash;

	state.skills = {
		assessment,
		hash
	};
});

const loadAssessmentCommand = commandFactory<{ hash: SkillHash; newSkills?: CachedSkill[] }>(
	async ({ payload: { hash, newSkills }, state }) => {
		const { matrix } = state;
		const assessment = await getAssessment(hash, matrix);
		state.skills.newSkills = newSkills;
		state.skills.assessment = assessment;
		state.skills.hash = hash;
	}
);

export interface UpdatedSkill {
	group: string;
	skill: SkillName;
	level: Level;
}

const updateNameCommand = commandFactory(({ payload: { name }, state }) => {
	const { matrixVersion } = state;
	if (state.skills.assessment) {
		state.skills.assessment.name = name;

		const hash = createHash(state.skills.assessment, matrixVersion);
		state.skills.hash = hash;
		persistHash(hash);
	}
});

const updateSkillCommand = commandFactory<UpdatedSkill>(async ({ payload: { group, skill, level }, state }) => {
	const { matrixVersion } = state;
	if (state.skills.assessment) {
		state.skills.assessment.skills[group][skill] = level;

		const hash = createHash(state.skills.assessment, matrixVersion);
		state.skills.hash = hash;
		persistHash(hash);
	}
});

export const setSkillMatrix = createProcess('set-matrix', [setSkillMatrixCommand]);
export const newAssessment = createProcess('new-assessment', [newAssessmentCommand]);
export const loadAssessment = createProcess('load-assessment', [loadAssessmentCommand]);
export const updateSkill = createProcess('update-skill', [updateSkillCommand]);
export const updateName = createProcess('update-name', [updateNameCommand]);
