export interface ClientError {
	message: string;
	source?: string;
	lineno?: number;
	colno?: number;
	error?: {
		message: string;
		name: string;
		stack?: string;
	};
}

export default class ClientErrorCollector {
	private _remote: any;
	private _inited: boolean = false;

	constructor (remote: any) {
		this._remote = remote;
	}

	assertNoErrors(message?: string): Promise<undefined> {
		return this.finish()
			.then((results) => {
				if (results && results.length) {
					const result = results[0];
					let e: Error;
					if (result.error) {
					switch (result.error.name) {
						case 'TypeError':
							e = new TypeError(result.message);
							break;
						case 'SyntaxError':
							e = new SyntaxError(result.message);
							break;
						default:
							e = new Error(result.message);
						}
						e.stack = result.error.stack;
					}
					else {
						e = new Error(result.message);
					}
					(<any> e).fileName = result.source;
					(<any> e).lineNumber = result.lineno;
					(<any> e).columnNumber = result.colno;
					throw e;
				}
			});
	}

	finish(): Promise<ClientError[] | undefined> {
		if (!this._inited) {
			throw new Error('ClientErrorCollector not initialised.');
		}

		return this._remote
			.execute(() => (<any> window)['__intern_error_helper_finish']())
			.then((results: string | undefined) => {
				if (results) {
					return JSON.parse(results);
				}
			});
	}

	init(): Promise<void> {
	if (this._inited) {
		throw new Error('ClientErrorCollector already initialised.');
	}

	return this._remote
		.execute(() => {
			const CLIENT_ERROR_STACK_KEY = '__intern_error_stack';
			const CLIENT_OLD_ONERROR_KEY = '__intern_old_onerror';

			const errorStack: ClientError[] = (<any> window)[CLIENT_ERROR_STACK_KEY] = [];
			let oldonerror: any;
			if (window.onerror) {
				oldonerror = (<any> window)[CLIENT_OLD_ONERROR_KEY] = window.onerror;
			}
			window.onerror = function (message, source, lineno, colno, error) {
				const errorObj: ClientError = {
					message: message,
					source: source,
					lineno: lineno,
					colno: colno
				};

				if (error) {
					errorObj.error = {
						message: error.message,
						name: error.name,
						stack: error.stack
					};
				}

				errorStack.push(errorObj);

				if (oldonerror) {
					oldonerror.call(undefined, message, source, lineno, colno, error);
				}
			};
			(<any> window)['__intern_error_helper_finish'] = function () {
				if (typeof (<any> window)[CLIENT_OLD_ONERROR_KEY] !== 'undefined') {
					window.onerror = (<any> window)[CLIENT_OLD_ONERROR_KEY];
				}
				else {
					delete window.onerror;
				}
				const errorStack = (<any> window)[CLIENT_ERROR_STACK_KEY];
				delete (<any> window)[CLIENT_ERROR_STACK_KEY];
				return JSON.stringify(errorStack);
			};
		})
		.then(() => {
			this._inited = true;
		});
	}
}
