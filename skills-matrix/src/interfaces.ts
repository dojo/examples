export interface State {
	matrix: SkillMatrix;
	matrixVersion: string;
	skills: {
		assessment?: Assessment;
		hash?: string;
	};
	compare: {
		assessments: Assessment[];
		filters?: SkillName[];
	};
}

export const enum Level {
	None = 0,
	Basic = 1,
	Proficient = 2,
	Expert = 3
}

export type SkillName = string;

export type SkillHash = string;

export interface SkillMatrix {
	[group: string]: SkillName[];
}

export interface Assessment {
	hash: string;
	name?: string;
	skills: AssessmentMatrix;
}

export type AssessmentMatrix = {
	[group: string]: AssessmentGroup;
};

export type AssessmentGroup = {
	[skill: string]: Level;
};

export type SkillAssessment = {
	skill: string;
	level: Level;
};

export interface AssessmentEntry {
	active: boolean;
	assessment: Assessment;
}

export interface AssessmentMap {
	[hash: string]: boolean;
}
