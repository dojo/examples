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

const factory = create().properties<SkillsetFilterProperties>();

export const SkillsetFilter = factory(function ({ id, properties }) {
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
				resource={{
					data: skills.map((value) => ({ label: value, value })),
					id,
					idKey: 'value'
				}}
				onValue={function (values) {
					onChange?.(values.map((option) => option.value));
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
