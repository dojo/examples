import Evented from '@dojo/core/Evented';

/**
 * Interface that represents the action argument for a reducer
 */
export interface Action {
	type: string;
	payload?: any;
}

/**
 * State reducer function
 */
export interface StateReducer<S extends object> {
	<P>(state: S, payload: Action): S;
}

export class Store<S extends object> extends Evented {

	private _state: S;

	private _reducers: StateReducer<S>[] = [];

	constructor(initialState: S = <S> {}) {
		super({});
		this._state = initialState;
	}

	/**
	 * Register a reducer that will be executed when an action is dispatched.
	 * If a target is passed, the reducer will be executed against the specified
	 * section of the state.
	 */
	public registerReducers(reducer: StateReducer<S>, target?: string) {
		if (target) {
			this._reducers.push((newState: any, action: Action) => {
				const newStateSection = reducer(newState[target], action);
				return {
					...newState,
					[ target ]: newStateSection
				};
			});
		}
		else {
			this._reducers.push(reducer);
		}
	}

	public dispatch(action: Action) {
		this._state = this._reducers.reduce((newState, reducer) => reducer(newState, action), this._state);
		this.emit({ type: 'invalidate' });
	}

	public getState(): Readonly<S> {
		return this._state;
	}
}

export function createStore<S extends object>(initialState?: S): Store<S> {
	return new Store<S>(initialState);
}

export default createStore;
