import { assert } from 'chai';
import { describe, it } from 'intern/lib/interfaces/bdd';

import { Level } from '../interfaces';
import { base64DecodeBuffer, base64EncodeBuffer, decodeLevels, encodeLevels } from './crypto';

describe('crypto', () => {
	it('encodes and decodes a list of levels', () => {
		const levels: Level[] = [0, 1, 2, 3, 2, 1, 0];

		const buffer = encodeLevels(levels);
		const actual = Array.from(decodeLevels(buffer));
		const expected = [...levels, 0];

		assert.deepEqual(actual, expected);
	});

	it('encodes and decodes a buffer to base64', () => {
		const buffer = new Uint8Array([27, 144]);
		const base64 = base64EncodeBuffer(buffer);
		const actual = base64DecodeBuffer(base64);

		assert.deepEqual(actual, buffer);
	});
});
