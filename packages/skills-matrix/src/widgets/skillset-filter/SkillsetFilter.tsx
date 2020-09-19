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
const factory = create({ resource }).properties<SkillsetFilterProperties>();
const typeAheadResourceTemplate = createMemoryResourceTemplate<{ value: string }>();

export const SkillsetFilter = factory(function ({ id, properties, middleware: { resource } }) {
	const { initialSelected, skills, onChange } = properties();

	const header = <h1 classes={css.title}>Filter By Skillset</h1>;
	const content = (
		<div classes={css.controls}>
			<ChipTypeahead
				classes={{
					'@dojo/widgets/chip': {
						closeIconWrapper: [css.typeaheadChip]
					}
				}}
				initialValue={initialSelected}
				placement="bottom"
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
