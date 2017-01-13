export function bind<T extends Function>(fn: T, instance: any): T {
	return fn.bind(instance);
};
