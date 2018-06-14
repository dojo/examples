import has from '@dojo/has/has';
import { ArticleItem } from './interfaces';

export class Context {
	private _invalidator: () => void;
	private _route: string;

	articles?: ArticleItem[];
	item?: ArticleItem;
	category: string;
	page: number;
	itemId: string;

	get route() {
		return this._route;
	}
	set route(route: string) {
		this._route = route;
		this._invalidator();
	}

	constructor(invalidator: () => void) {
		this._invalidator = invalidator;
	}

	public async fetchStories(category: string, page: number) {
		const catKey = category === 'top' ? 'news' : category === 'new' ? 'newest' : category;
		this.page = page;
		this.category = category;
		this.route = 'content';
		this.articles = undefined;
		this._invalidator();
		if (!has('build-time-render')) {
			this.articles = await fetch(`https://node-hnapi.herokuapp.com/${catKey}?page=${page}`).then(response =>
				response.json()
			);
		}
		this._invalidator();
	}

	public async fetchItem(id: string) {
		this.item = undefined;
		this.itemId = id;
		this.route = 'comments';
		this._invalidator();
		if (!has('build-time-render')) {
			this.item = await fetch(`https://node-hnapi.herokuapp.com/item/${id}`).then(response => response.json());
		}
		this._invalidator();
	}
}
