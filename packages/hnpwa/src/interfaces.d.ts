export interface CommentItem {
	user: string | null;
	content: string;
	time_ago: string;
	comments: CommentItem[];
}

export interface ArticleItem {
	id: number;
	title: string;
	user: string | null;
	url: string;
	points: string | null;
	time_ago: string;
	comments_count: number;
	loading: boolean;
	comments: CommentItem[];
}
