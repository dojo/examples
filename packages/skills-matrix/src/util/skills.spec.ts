import { assert } from 'chai';
import { describe, it } from 'intern/lib/interfaces/bdd';

import { Assessment, SkillMatrix } from '../interfaces';
import { createAssessment, createHash, getAssessment, getMatrixVersion, isSkillHash, isSkillMatrix } from './skills';

const matrix = require('../skillmatrix.json');
const DELIMITER = '-';

const smallSkillMatrix: SkillMatrix = {
	recipes: ['tacos', 'burritos', 'pizza']
};

const smallAssessment: Assessment = {
	hash: '',
	name: 'Paul',
	skills: {
		recipes: {
			tacos: 1,
			burritos: 2,
			pizza: 2
		}
	}
};

const version = 'efWo';

describe('skills', () => {
	describe('isSkillHash', () => {
		it('returns true only for a skill hash', () => {
			assert.isTrue(isSkillHash(`Paul Shannon${DELIMITER}xxxx${DELIMITER}AAAA`));
			assert.isFalse(isSkillHash(Symbol('not a string, returns false')));
			assert.isFalse(isSkillHash(`I only have one ${DELIMITER}`));
		});
	});

	describe('isSkillMatrix', () => {
		it('returns true for a skill matrix', () => {
			assert.isTrue(isSkillMatrix(matrix));
			assert.isFalse(isSkillMatrix(null));
			assert.isFalse(isSkillMatrix('not an object'));
			assert.isFalse(
				isSkillMatrix({
					name: 'this is not an array'
				})
			);
		});
	});

	describe('getMatrixVersion', () => {
		it('hashes skill and assessment', async () => {
			assert.strictEqual(await getMatrixVersion(smallSkillMatrix), version);
			assert.strictEqual(await getMatrixVersion(smallAssessment.skills), version);
		});
	});

	describe('createAssessment', () => {
		const expectedSkillAssessment = {
			hash: '',
			skills: {
				recipes: {
					tacos: 0,
					burritos: 0,
					pizza: 0
				}
			}
		};

		it('creates a new assessment', () => {
			const assessment = createAssessment(smallSkillMatrix);

			assert.deepEqual(assessment, expectedSkillAssessment);
		});

		it('creates a new assessment with name', () => {
			const name = 'Paul';
			const assessment = createAssessment(smallSkillMatrix, { name });

			assert.deepEqual(assessment, { name, ...expectedSkillAssessment });
		});
	});

	describe('createHash', () => {
		it('creates a hash', () => {
			const hash = createHash(smallAssessment, 'xxxx');

			assert.strictEqual(hash, 'Paul-xxxx-aA==');
		});
	});

	describe('getAssessment', () => {
		it('reverses a hash into an assessment', async () => {
			const hash = createHash(smallAssessment, version);
			assert.deepEqual(await getAssessment(hash, smallSkillMatrix), {
				...smallAssessment,
				hash
			});
		});

		it(`throws if the version doesn't match the matrix version`, async () => {
			const hash = createHash(smallAssessment, 'xxxx');

			try {
				await getAssessment(hash, smallSkillMatrix);
			} catch (e) {
				return;
			}
			assert.fail('assessment should fail');
		});
	});
});
