const { registerSuite } = intern.getInterface('object');
const { assert } = intern.getPlugin('chai');
import { stub, SinonStub } from 'sinon';
import command, { MyContext, MyArgv } from './../../src/main';
import { Helper } from './../../src/interfaces';
import { getHelperStub } from '../support/testHelper';

let optionStub: SinonStub;
let helperStub: Helper;
let consoleStub: SinonStub;
const testContextMessage = 'test';

registerSuite('main', {
	'Should contain a description'() {
		assert.isTrue(command.description !== undefined);
		assert.isTrue(typeof command.description === 'string');
	},
	'Should contain a register function'() {
		assert.isTrue(command.register !== undefined);
		assert.isTrue(typeof command.register === 'function');
	},
	'Should contain a run function'() {
		assert.isTrue(command.run !== undefined);
		assert.isTrue(typeof command.run === 'function');
	},
	'register': {
		'beforeEach'() {
			helperStub = getHelperStub<MyContext>();
			helperStub.context = {};
			optionStub = stub(helperStub.yargs, 'option');
		},
		'afterEach'() {
			optionStub.restore();
		},
		tests: {
			'Should set context message'() {
				command.register(helperStub);
				assert.equal('Hello World!', helperStub.context.message);
			},
			'Should call yargs.option'() {
				command.register(helperStub);
				assert.isTrue(optionStub.calledOnce);
			},
			'Should return yargs'() {
				const yargsResponse = command.register(helperStub);
				assert.equal(helperStub.yargs, yargsResponse);
			}
		}
	},
	'run': {
		'beforeEach'() {
			helperStub = getHelperStub<MyContext>();
			helperStub.context = {
				message: testContextMessage
			};
			consoleStub = stub(console, 'log');
		},
		'afterEach'() {
			consoleStub.restore();
		},
		tests: {
			'Should log out context message'() {
				const args = {};
				return command.run(helperStub, <MyArgv> args).then(() => {
					assert.isTrue(consoleStub.calledWith(testContextMessage));
				});
			},
			'Should shout out context message'() {
				const args = {
					shout: true
				};
				return command.run(helperStub, <MyArgv> args).then(() => {
					assert.isTrue(consoleStub.calledWith(testContextMessage.toUpperCase()));
				});
			}
		}
	}
});
