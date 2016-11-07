import * as registerSuite from 'intern/lib/interfaces/object';
import * as assert from 'intern/chai!assert';
import * as main from '../../src/main';

registerSuite({
	name: 'main',
	'validate api'() {
		assert(main);
	}
});
