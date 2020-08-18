import icache from '@dojo/framework/core/middleware/icache';
import { createMemoryResourceTemplate, createResourceMiddleware } from '@dojo/framework/core/middleware/resources';
import { create, tsx } from '@dojo/framework/core/vdom';
import Card from '@dojo/widgets/card';
import Chip from '@dojo/widgets/chip';
import { Typeahead } from '@dojo/widgets/typeahead';

import { SkillName } from '../../interfaces';
import * as css from './SkillsetFilter.m.css';

export interface SkillsetFilterProperties {
	skills: SkillName[];
	initialSelected?: SkillName[];
	onChange?(selected: string[]): void;
}

const resource = createResourceMiddleware();
const factory = create({ icache, resource }).properties<SkillsetFilterProperties>();
const typeAheadResourceTemplate = createMemoryResourceTemplate<{ value: string }>();

/*
function createTypeaheadResource(skills: string[]) {
	const template: DataTemplate<{ value: string }> = {
		read({ query, offset = 0, size }, _set, get) {
			const allValues = get();
			const searchValues = query
				? query.filter(({ keys, value }) => value && keys.indexOf('value') >= 0).map(({ value }) => value!)
				: [];
			const filtered =
				query &&
				allValues.filter(({ value }) =>
					searchValues.some((search) => value.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
				);
			const result = filtered || allValues;
			return { data: result.slice(offset, size && offset + size), total: result.length };
		}
	};
	const resource = createResource(template);
	return {
		resource: () => resource,
		data: skills.map((skill) => ({ value: skill }))
	};
}
*/

export const SkillsetFilter = factory(function ({ properties, middleware: { icache } }) {
	const { /* skills, */ onChange, initialSelected = [] } = properties();

	const items = [];
//	const resource = createTypeaheadResource(skills);
	const selected = icache.getOrSet<string[]>('selected', initialSelected);

	for (let skill of selected) {
		items.push(
			<Chip
				key={skill}
				onClose={() => {
					const values = selected.filter((item) => item !== skill);
					icache.set('selected', values);
					onChange?.(values);
				}}
				classes={{
					'@dojo/widgets/chip': {
						root: [css.chip],
						closeIconWrapper: [css.chipIcon]
					}
				}}
			>
				{{ label: skill }}
			</Chip>
		);
	}

	const header = <h1 classes={css.title}>Filter By Skillset</h1>;
	const content = (
		<div classes={css.controls}>
			<Typeahead
				classes={{
					'@dojo/widgets/text-input': {
						input: [css.input]
					},
					'@dojo/widgets/typeahead': {
						menuWrapper: [css.menu]
					}
				}}
				resource={{
					template: {
						template: typeAheadResourceTemplate,
						id: 'skillsetFilter',
						initOptions: {
							// data: skills.map(value => ({ value })),
							id: 'skills'
						}
					}
				}}
				onValue={(value) => {
					if (!selected.includes(value)) {
						const values = [...selected, value];
						icache.set('selected', values);
						onChange?.(values);
					}
				}}
			></Typeahead>
			<div classes={css.items}>{items}</div>
		</div>
	);
	return (
		<Card>
			{{
				header,
				content
			}}
		</Card>
	);
});
