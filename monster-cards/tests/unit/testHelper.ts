export function getWidgetRegistry() {
	let widget: any;
	let idx = 0;

	const widgetRegistry = {
		stack: <any[]> [],
		get(id: any): Promise<any> {
			widgetRegistry.stack.push(id);
			return Promise.resolve(widget);
		},
		identify(value: any): any {
			return '';
		},
		create<T>(factory: any, options?: any): Promise<any> {
			const w = factory(options);
			widget = w;
			return Promise.resolve([options && options.id || `widget${idx++}`, w]);
		},
		has() {
			return Promise.resolve(true);
		}
	};

	return widgetRegistry;
}

export function getRegistryProvider(widgetRegistry: any) {
	const registryProvider: any = {
		get(type: string) {
			return type === 'widgets' ? widgetRegistry : null;
		}
	};

	return registryProvider;
}
