import * as registerSuite from 'intern/lib/interfaces/object';
import { assert } from 'chai';
import * as main from '../../src/main';

registerSuite({
	name: 'main',
	'validate api'() {
		assert(main);
	}
});
