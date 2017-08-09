import { Evented, EventedOptions } from '@dojo/core/Evented';
import { Router } from '@dojo/routing/Router'
import { PAGE_SIZE } from "./main";
import { Item, story_type } from "./interfaces";
import { getNumberOfStoriesForView, getStoriesForView } from "./hackerNewsStoriesService";


export class HackerNewsAppContext extends Evented {
	private _view: story_type;
	private _page: number;
	private _router: Router<any>;
	private _stories: Item[] = [];
	private _pages: number = 1;

	private _pageSize: number = PAGE_SIZE;

	constructor(options: EventedOptions & { pageSize?: number; router: Router<any> }) {
		super(options);
		this._router = options.router;
		this._pageSize = options.pageSize || this._pageSize;
	}

	public get page(): number {
		return this._page;
	}

	public get pageSize(): number {
		return this._pageSize;
	}

	public get view(): story_type {
		return this._view;
	}

	public fetchStories(view: story_type = 'top', page: number = 1, pageSize: number = PAGE_SIZE) {
		const storyCountPromise = getNumberOfStoriesForView(view);
		const storiesPromise = getStoriesForView(view, page, pageSize);
		storyCountPromise.then((storyCount) => {
			storiesPromise.then((stories) => {
				this._view = view;
				this._page = page;
				this._pages = Math.ceil(storyCount/pageSize);
				this._stories = stories;
				this.emit({ type: 'invalidate' });
			})
		});
	};

	public getPageCount(view: story_type): number {
		if (this.view === view) {
			return this._pages;
		}
		else {
			return 1;
		}
	}

	public getStories(view: story_type, page: number): Item[] {
		if (this.view === view && this.page === page) {
			return this._stories.slice();
		}
		else {
			return [];
		}
	}
}
