export type story_type = 'top' | 'new' | 'best' | 'ask' | 'show' | 'jobs';

export interface TypeCount {
	type: story_type;
	count: number;
}

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
}
