import { tsx, create } from '@dojo/framework/core/vdom';
import block from '@dojo/framework/core/middleware/block';
import getBlog from './blocks/blog.block';

import * as css from './Blog.m.css';

interface BlogProperties {
	name: string;
}

const factory = create({ block }).properties<BlogProperties>();

export default factory(function BlogList({ middleware: { block }, properties }) {
	const { name } = properties();
	const blog = block(getBlog)({ path: `${name}.md` });

	if (!blog) {
		return null;
	}

	return (
		<article>
			<header classes={[css.header]}>
				<div classes={[css.container]}>
					<time classes={[css.date]}>
						<small>{new Date(blog.meta.date).toDateString()}</small>
					</time>
					<h3 classes={[css.title]}>
						<span classes={[css.titleLabel]}>{blog.meta.title}</span>
					</h3>
					<h4 classes={[css.description]}>{blog.meta.description}</h4>
					<h5 classes={[css.author]}>{`By ${blog.meta.author}`}</h5>
				</div>
			</header>
			<div classes={[css.blog]}>{blog.content}</div>
		</article>
	);
});
