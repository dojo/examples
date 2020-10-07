import { createCommandFactory, createProcess } from '@dojo/framework/stores/process';

import { Level, CachedSkill, SkillHash, SkillMatrix, SkillName, State } from '../interfaces';
import { persistHash } from '../util/persistence';
import { createAssessment, createHash, DELIMITER, getAssessment, getMatrixVersion } from '../util/skills';

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

const loadAssessmentCommand = commandFactory<{ hash: SkillHash }>(async ({ payload: { hash }, state }) => {
	let sanitizedHash = hash;

	const { matrix, matrixHistory, matrixVersion } = state;

	const [, hashVersion] = hash.split(DELIMITER);
	const newSkills: CachedSkill[] = [];

	if (hashVersion !== matrixVersion) {
		const oldMatrix = matrixHistory[hashVersion];
		const oldAssessment = await getAssessment(hash, oldMatrix);
		const assessment = createAssessment(matrix, { name: oldAssessment.name });

		for (const category in assessment.skills) {
			for (const skill in assessment.skills[category]) {
				if (oldAssessment.skills[category] && oldAssessment.skills[category][skill] !== undefined) {
					const oldSkillValue = oldAssessment.skills[category][skill];
					assessment.skills[category][skill] = oldSkillValue;
				} else {
					newSkills.push({ category, skill });
				}
			}
		}

		sanitizedHash = createHash(assessment, matrixVersion);
	}

	const assessment = await getAssessment(sanitizedHash, matrix);
	state.skills.newSkills = newSkills;
	state.skills.assessment = assessment;
	state.skills.hash = sanitizedHash;
	persistHash(hash);
});

export interface UpdatedSkill {
	group: string;
	skill: SkillName;
	level: Level;
}

const updateNameCommand = commandFactory(({ payload: { name }, state }) => {
	console.log('update name', name);
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
