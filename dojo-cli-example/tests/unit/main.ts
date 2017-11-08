const { describe, it, beforeEach, afterEach } = intern.getInterface('bdd');
const { assert } = intern.getPlugin('chai');
import * as sinon from 'sinon';
import command, { MyArgv } from './../../src/main';
import { Helper } from '@dojo/interfaces/cli';

const testContextMessage = 'test';
let sandbox: sinon.SinonSandbox;
let helper: Helper;
let consoleStub: sinon.SinonStub;

describe('main', () => {
	it('should contain a description', () => {
		assert.isTrue(command.description !== undefined);
		assert.isTrue(typeof command.description === 'string');
	});
	it('should contain a register function', () => {
		assert.isTrue(command.register !== undefined);
		assert.isTrue(typeof command.register === 'function');
	});
	it('should contain a run function', () => {
		assert.isTrue(command.run !== undefined);
		assert.isTrue(typeof command.run === 'function');
	});
});

describe('register', () => {
	beforeEach(() => {
		sandbox = sinon.sandbox.create();
		helper = <Helper> {
			context: {}
		};
	});
	afterEach(() => {
		sandbox.restore();
	});
	it('should set context message', () => {
		const options = sandbox.stub();
		command.register(options, helper);
		assert.equal('Hello World!', helper.context.message);
	});
	it('should call yargs.option', () => {
		const options = sandbox.stub();
		command.register(options, helper);
		assert.isTrue(options.calledOnce);
	});
	it('should return yargs', () => {
		const options = sandbox.stub();
		command.register(options, helper);
		assert.isTrue(options.firstCall.calledWithMatch('s', {
			alias: 'shout',
			describe: 'SHOUT the response'
		}));
	});
});
describe('run', () => {
	beforeEach(() => {
		sandbox = sinon.sandbox.create();
		helper = <Helper> {
			context: { message: testContextMessage }
		};
		consoleStub = sandbox.stub(console, 'log');
	});
	afterEach(() => {
		sandbox.restore();
	});
	it('should log out context message', () => {
		const args = {};
		return command.run(helper, <MyArgv> args).then(() => {
			assert.isTrue(consoleStub.calledWith(testContextMessage));
		});
	});
	it('should shout out context message', () => {
		const args = {
			shout: true
		};
		return command.run(helper, <MyArgv> args).then(() => {
			assert.isTrue(consoleStub.calledWith(testContextMessage.toUpperCase()));
		});
	});
});
describe('eject', () => {
	it('should provide eject information', () => {
		const result = command.eject && command.eject(<Helper> {});
		if (result == null) {
			assert.fail('eject is not supported');
		} else {
			assert.isTrue('copy' in result, 'copy data is missing');
			assert.isTrue('hints' in result, 'hint data is missing');
			assert.deepEqual(result.copy && result.copy.files, [ './sayhello.js' ]);
		}
	});
});
