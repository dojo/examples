const CLIENT_ERROR_STACK_KEY = '__intern_error_stack';
const CLIENT_OLD_ONERROR_KEY = '__intern_old_onerror';
const CLIENT_FINISH_FUNCTION_KEY = '__intern_error_helper_finish';

export interface ClientError {
	message: string;
	type: string;
	source: string;
	lineno: number;
	colno: number;
	error: {
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
					switch (result.type) {
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
					(<any> e).fileName = result.source;
					(<any> e).lineNumber = result.lineno;
					(<any> e).columnNumber = result.colno;
					throw e;
				}
			});
	}

	finish(): Promise<ClientError[] | undefined> {
		if (!this._inited) {
			throw new Error('ErrorHelper not initialised.');
		}

		return this._remote
			.execute(`return window.${CLIENT_FINISH_FUNCTION_KEY}();`)
			.then((results: string | undefined) => {
				if (results) {
					return JSON.parse(results);
				}
			});
	}

		init(): Promise<void> {
		if (this._inited) {
			throw new Error('ErrorHelper already initialised.');
		}

		return this._remote
			.execute(`
				var errorStack = window.${CLIENT_ERROR_STACK_KEY} = [];
				var oldonerror;
				if (window.onerror) {
					oldonerror = window.${CLIENT_OLD_ONERROR_KEY} = window.onerror;
				}
				window.onerror = function (message, source, lineno, colno, error) {
					var errorObj = {
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
						}
					}

					errorStack.push(errorObj);

					if (oldonerror) {
						oldonerror.call(this, messageOrEvent, source, lineno, colno, error);
					}
				}
				window.${CLIENT_FINISH_FUNCTION_KEY} = function () {
					if (typeof window.${CLIENT_OLD_ONERROR_KEY} !== 'undefined') {
						window.onerror = window.${CLIENT_OLD_ONERROR_KEY};
					}
					else {
						delete window.onerror;
					}
					var errorStack = window.${CLIENT_ERROR_STACK_KEY};
					delete window.${CLIENT_ERROR_STACK_KEY};
					return JSON.stringify(errorStack);
				};
			`)
			.then(() => {
				this._inited = true;
			});
	}
}
