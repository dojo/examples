import { join } from 'path';
import { readFileSync } from 'fs';
import { v } from '@dojo/framework/core/vdom';

const unified = require('unified');
const markdown = require('remark-parse');
const remark2rehype = require('remark-rehype');
const toH = require('hast-to-hyperscript');
const frontmatter = require('remark-frontmatter');
const rehypePrism = require('@mapbox/rehype-prism');
const rehypeSlug = require('rehype-slug');
const parseFrontmatter = require('remark-parse-yaml');
const remarkExternalLinks = require('remark-external-links');

function getMetaData(content: string) {
	const pipeline = unified().use(markdown, { commonmark: true }).use(frontmatter, 'yaml').use(parseFrontmatter);

	const nodes = pipeline.parse(content);
	const result = pipeline.runSync(nodes);
	const node = result.children.find((child: any) => Boolean(child.type === 'yaml'));
	return node ? node.data.parsedValue : {};
}

const toVNodes = (content: string) => {
	let counter = 0;
	const pipeline = unified()
		.use(markdown as any, { commonmark: true })
		.use(frontmatter, 'yaml')
		.use(remarkExternalLinks, { target: '_blank', rel: ['nofollow'] })
		.use(remark2rehype)
		.use(rehypePrism)
		.use(rehypeSlug);

	const nodes = pipeline.parse(content);
	const result = pipeline.runSync(nodes);
	return toH((tag: string, props: any, children: any[]) => v(tag, { ...props, key: counter++ }, children), result);
};

export default function ({ path }: { path: string }) {
	const contentPath = join(__dirname, '..', '..', 'content', path);
	const file = readFileSync(contentPath, 'utf8');
	const content = toVNodes(file);
	const meta = getMetaData(file);
	return { content, meta };
}
