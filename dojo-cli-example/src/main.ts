import { Command, Helper } from './interfaces';
import { Argv } from 'yargs';

interface MyArgv extends Argv {
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
		const message = helper.context.message;
		console.log(args.shout ? message.toUpperCase() : message);
		console.log('Resolving in 3 seconds');
		return new Promise((resolve) => setTimeout(resolve, 3000)).then(() => console.log('Done!'));
	}
};

export default command;
