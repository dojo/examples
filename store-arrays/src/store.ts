import createStoreMiddleware from '@dojo/framework/core/middleware/store';
import { initialStateProcess } from './appProcesses';

export interface Company {
	name: string;
	people: string[];
}

export interface State {
	companies: Company[];
}

export default createStoreMiddleware<State>((store) => {
	initialStateProcess(store)({});
});
