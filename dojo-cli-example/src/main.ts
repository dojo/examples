import { Command, Helper, OptionsHelper } from '@dojo/cli/interfaces';
import { Argv } from 'yargs';
import { underline } from 'chalk';

export interface MyContext {
	message?: string;
}

export interface MyArgv extends Argv {
	shout: boolean;
}

const command: Command = {
	description: 'This is an example dojo-cli command',
	register(options: OptionsHelper, helper: Helper) {
		options('s', {
			alias: 'shout',
			describe: 'SHOUT the response'
		});

		// Put something in the context
		helper.context.message = 'Hello World!';
	},
	run(helper: Helper, args: MyArgv) {
		const message = (<MyContext> helper.context).message;

		if (message) {
			const outputMessage = args.shout ? message.toUpperCase() : message;
			console.log(outputMessage);
		}

		return new Promise((resolve) => setTimeout(resolve, 500));
	},
	eject() {
		return {
			copy: {
				path: __dirname,
				files: [
					'./sayhello.js'
				]
			},
			hints: [
				'to run ' + underline('node ./config/example-command/sayhello.js [--shout]')
			]
		};
	}
};

export default command;
