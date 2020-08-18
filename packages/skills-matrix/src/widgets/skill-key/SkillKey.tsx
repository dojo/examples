import { create, tsx } from '@dojo/framework/core/vdom';

import { Level } from '../../interfaces';
import { LevelIcon } from '../level-icon/LevelIcon';
import * as css from './SkillKey.m.css';

const factory = create();

export const SkillKey = factory(function () {
	return (
		<div>
			<h1 classes={css.title}>Key</h1>
			<div classes={css.skillRow}>
				<div classes={css.level}>
					<LevelIcon level={Level.Basic} small />
					<span classes={[css.entry, css.level2]}>Basic</span>
				</div>
				<div classes={css.level}>
					<LevelIcon level={Level.Proficient} small />
					<span classes={[css.entry, css.level3]}>Proficient</span>
				</div>
				<div classes={css.level}>
					<LevelIcon level={Level.Expert} small />
					<span classes={[css.entry, css.level4]}>Expert</span>
				</div>
			</div>
		</div>
	);
});
