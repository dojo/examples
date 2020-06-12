import { createStoreMiddleware } from '@dojo/framework/core/middleware/store';

export interface Todo {
	id: string;
	label: string;
	completed?: boolean;
}

export interface State {
	todos?: Todo[];
	current?: string;
	completedCount?: number;
	editingId?: string;
	editingLabel?: string;
	search?: string;
}

export default createStoreMiddleware<State>();
