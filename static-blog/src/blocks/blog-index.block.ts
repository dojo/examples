import { join, parse } from 'path';
import { readFileSync } from 'fs';
import * as glob from 'glob';
const unified = require('unified');
const markdown = require('remark-parse');
const frontmatter = require('remark-frontmatter');
const parseFrontmatter = require('remark-parse-yaml');

function getMetaData(content: string) {
	const pipeline = unified().use(markdown, { commonmark: true }).use(frontmatter, 'yaml').use(parseFrontmatter);

	const nodes = pipeline.parse(content);
	const result = pipeline.runSync(nodes);
	const node = result.children.find((child: any) => Boolean(child.type === 'yaml'));
	return node ? node.data.parsedValue : {};
}

export default async function () {
	const files = glob.sync(join(__dirname, '..', '..', 'content', '*.md'));
	const blogs: any[] = [];
	for (const file of files) {
		const content = readFileSync(file, 'utf8');
		const meta = getMetaData(content);
		blogs.push({
			sortDate: new Date(`${meta.date}`),
			file: parse(file).name,
			meta
		});
	}

	return blogs.sort((a, b) => b.sortDate.getTime() - a.sortDate.getTime());
}
