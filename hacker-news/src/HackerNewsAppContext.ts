import { Evented, EventedOptions } from '@dojo/core/Evented';
import { Router } from '@dojo/routing/Router'
import { story_type, getStoriesForView, getNumberOfStoriesForView } from './hackerNewsStoriesService';
import { PAGE_SIZE } from "./main";

export interface Item {
	// Hacker News data
	id: string;
	deleted?: boolean;
	type?: string;
	by?: string;
	time?: number;
	text?: string;
	dead?: boolean;
	parent?: string;
	poll?: string;
	kids?: string[];
	url?: string;
	score?: number;
	title?: string;
	parts?: string[];
	descendants?: number;

	// Local data
	order: number;
	updated: number;
}

export class HackerNewsAppContext extends Evented {
	private _router: Router<any>;
	private _stories: Item[] = [];
	private _pages: number = 1;
	private _pageSize: number = PAGE_SIZE;

	constructor(options: EventedOptions & { pageSize?: number; router: Router<any> }) {
		super(options);
		this._router = options.router;
		this._pageSize = options.pageSize || this._pageSize;
	}

	public get stories(): Item[] {
		return this._stories.slice();
	}

	public get pages(): number {
		return this._pages;
	}

	public get pageSize(): number {
		return this._pageSize;
	}

	public showStories = (view: story_type = 'top', page: number = 1, pageSize: number = PAGE_SIZE) => {
		const storyCountPromise = getNumberOfStoriesForView(view);
		const storiesPromise = getStoriesForView(view, page, pageSize);
		storyCountPromise.then((storyCount) => {
			storiesPromise.then((stories) => {
				this._pages = Math.ceil(storyCount/pageSize);
				this._stories = stories;
				this._router.dispatch({}, `${view}/${page}`);
			})
		});
	};
}
