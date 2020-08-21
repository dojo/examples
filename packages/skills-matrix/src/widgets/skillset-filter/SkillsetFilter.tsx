import icache from '@dojo/framework/core/middleware/icache';
import { createMemoryResourceTemplate, createResourceMiddleware } from '@dojo/framework/core/middleware/resources';
import { create, tsx } from '@dojo/framework/core/vdom';
import Card from '@dojo/widgets/card';
import { ChipTypeahead } from '@dojo/widgets/chip-typeahead';

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

export const SkillsetFilter = factory(function ({ id, properties, middleware: { icache, resource } }) {
	const { skills, onChange } = properties();

	const header = <h1 classes={css.title}>Filter By Skillset</h1>;
	const content = (
		<div classes={css.controls}>
			<ChipTypeahead
				classes={{
					'@dojo/widgets/chip': {
						closeIconWrapper: [css.typeaheadChip]
					},
					'@dojo/widgets/list-item': { // TODO: has no effect
						selected: [css.typeaheadSelected]
					},
					'@dojo/widgets/typeahead': { // TODO: has no effect
						listItem: [css.listItem]
					}
				}}
				resource={resource({
					template: typeAheadResourceTemplate,
					initOptions: {
						data: skills.map(value => ({ value })),
						id
					}
				})}
				onValue={function (values) {
					onChange?.(values);
				}}
			>
				{{ label: '' }}
			</ChipTypeahead>
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
