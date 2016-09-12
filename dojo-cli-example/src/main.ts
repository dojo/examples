import { Command, Helper } from './interfaces';
import { Argv } from 'yargs';

export interface MyContext {
	message?: string;
}

export interface MyArgv extends Argv {
	shout: boolean;
}

const command: Command = {
	description: 'This is an example dojo-cli command',
	register(helper) {
		// Put something in the context
		helper.context.message = 'Hello World!';

		// Return the yargs instance
		helper.yargs.option('s', {
			alias: 'shout',
			describe: 'SHOUT the response'
		});

		return helper.yargs;
	},
	run(helper: Helper, args: MyArgv) {
		const message = (<MyContext> helper.context).message;
		message && console.log(args.shout ? message.toUpperCase() : message);
		return new Promise((resolve) => setTimeout(resolve, 500));
	}
};

export default command;
