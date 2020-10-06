import {
	Assessment,
	AssessmentGroup,
	AssessmentMatrix,
	Level,
	SkillAssessment,
	SkillHash,
	SkillMatrix
} from '../interfaces';
import { cleanCopyUrl } from './clipboard';
import { base64DecodeBuffer, base64EncodeBuffer, decodeLevels, encodeLevels, sha1 } from './crypto';

export const DELIMITER = '-';

export function isSkillHash(value: any): value is SkillHash {
	return typeof value === 'string' && value.indexOf(DELIMITER, value.indexOf(DELIMITER) + 1) >= 0;
}

export function isSkillMatrix(value: any): value is SkillMatrix {
	return Boolean(
		value &&
			typeof value === 'object' &&
			Object.values(value).every(
				(skills) => Array.isArray(skills) && skills.every((skill) => typeof skill === 'string')
			)
	);
}

export function* getSkillNames(matrix: SkillMatrix | AssessmentMatrix) {
	if (isSkillMatrix(matrix)) {
		for (let skills of Object.values(matrix)) {
			for (let skill of skills) {
				yield skill;
			}
		}
	} else {
		for (let assessmentGroup of Object.values(matrix)) {
			for (let skill of Object.keys(assessmentGroup)) {
				yield skill;
			}
		}
	}
}

export function* getSkillAssessment(matrix: AssessmentMatrix): Generator<SkillAssessment> {
	for (let assessmentGroup of Object.values(matrix)) {
		for (let [skill, level] of Object.entries(assessmentGroup)) {
			yield {
				skill,
				level
			};
		}
	}
}

function* getLevels(matrix: AssessmentMatrix) {
	for (let assessmentGroup of Object.values(matrix)) {
		for (let level of Object.values(assessmentGroup)) {
			yield level || Level.None;
		}
	}
}

function* getGroups(matrix: SkillMatrix) {
	for (let [groupName, skills] of Object.entries(matrix)) {
		yield {
			name: groupName,
			skills
		};
	}
}

function createAssessmentMatrix(
	matrix: SkillMatrix,
	levels: Iterator<Level> = { next: () => ({ value: Level.None, done: false }) }
) {
	const skills: AssessmentMatrix = {};
	for (let group of getGroups(matrix)) {
		skills[group.name] = group.skills.reduce<AssessmentGroup>((assessmentGroup, skill) => {
			const { value: level = Level.None } = levels.next();
			assessmentGroup[skill] = level;
			return assessmentGroup;
		}, {});
	}
	return skills;
}

export async function getMatrixVersion(matrix: SkillMatrix | AssessmentMatrix, len: number = 4) {
	const skillList = Array.from(getSkillNames(matrix)).join(DELIMITER);
	const hash = await sha1(skillList);
	const eqs = hash.lastIndexOf('=');
	return hash.slice(eqs - len, eqs);
}

/**
 * Initialize a personal assessment from the skills matrix
 */
export function createAssessment(matrix: SkillMatrix, base?: Partial<Omit<Assessment, 'skills'>>): Assessment {
	return {
		hash: '',
		skills: createAssessmentMatrix(matrix),
		...base,
		name: base && base.name && cleanCopyUrl(base.name)
	};
}

/**
 * Transforms a personal assessment into a hash
 */
export function createHash(assessment: Assessment, version: string): SkillHash {
	const name = assessment.name?.replace(/\s/g, '+') || '';
	const hash = base64EncodeBuffer(encodeLevels(getLevels(assessment.skills)));
	return `${name}${DELIMITER}${version}${DELIMITER}${hash}`;
}

/**
 * Transforms a hash into a personal assessment
 */
export async function getAssessment(hash: string, matrix: SkillMatrix): Promise<Assessment> {
	const [name, , levelHash] = hash.split(DELIMITER);
	const levels = decodeLevels(base64DecodeBuffer(levelHash));
	return {
		hash,
		name: name.replace(/\+/g, ' '),
		skills: createAssessmentMatrix(matrix, levels)
	};
}
