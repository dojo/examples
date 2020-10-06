import { icache } from '@dojo/framework/core/middleware/icache';
import { create, tsx } from '@dojo/framework/core/vdom';
import { Button } from '@dojo/widgets/button';
import Icon from '@dojo/widgets/icon';
import TextArea from '@dojo/widgets/text-area';
import { TextInput } from '@dojo/widgets/text-input';
import { CachedSkill } from '../../interfaces';

import router from '../../middleware/router';
import { store } from '../../middleware/store';
import { loadAssessment, newAssessment } from '../../processes/assessment.processes';
import { loadAssessments } from '../../processes/assessments.processes';
import { RouteName } from '../../routes';
import { cleanCopyUrl } from '../../util/clipboard';
import { resumeHash } from '../../util/persistence';
import { createAssessment, createHash, DELIMITER, getAssessment, isSkillHash } from '../../util/skills';
import * as css from './Home.m.css';

const factory = create({ icache, router, store });

export const Home = factory(function ({
	middleware: {
		icache,
		router,
		store: { get, path, executor }
	}
}) {
	const currentVersion = get(path('matrixVersion'));
	const person = icache.getOrSet('person', () => {
		const storeValue = get(path('skills', 'hash'));
		const persistedValue = resumeHash();
		return storeValue || persistedValue;
	});
	const hashes = icache.getOrSet(
		'hashes',
		get(path('compare', 'assessments'))
			.map((assessment) => createHash(assessment, get(path('matrixVersion'))))
			.join('\n')
	);
	const isPersonHash = isSkillHash(person);

	const convertHash = async (hash: string, fromVersion: string, toVersion: string) => {
		const oldMatrix = get(path('matrixHistory'))[fromVersion];
		const matrix = get(path('matrix'));

		const oldAssessment = await getAssessment(hash, oldMatrix);
		const assessment = createAssessment(matrix, { name: oldAssessment.name });

		// TODO: Mark added and removed category / skills
		const newSkills: CachedSkill[] = [];
		for (const category in assessment.skills) {
			for (const skill in assessment.skills[category]) {
				if (oldAssessment.skills[category] && oldAssessment.skills[category][skill] !== undefined) {
					const oldSkillValue = oldAssessment.skills[category][skill];
					assessment.skills[category][skill] = oldSkillValue;
				} else {
					newSkills.push({ category, skill });
				}
			}
		}

		return { hash: createHash(assessment, toVersion), newSkills };
	};

	const editProfile = async () => {
		let value = icache.get<string>('person') || '';
		let newSkills: CachedSkill[] = [];

		// Convert old hashes to new hashes
		if (isSkillHash(value)) {
			const hashVersion = value.split(DELIMITER)[1];
			if (hashVersion !== currentVersion) {
				const result = await convertHash(value, hashVersion, currentVersion);
				value = result.hash;
				newSkills = result.newSkills;
			}
		}

		const cleanValue = cleanCopyUrl(value);
		const { error } = isSkillHash(value)
			? await executor(loadAssessment)({ hash: cleanValue, newSkills })
			: await executor(newAssessment)({ name: cleanValue });

		if (error) {
			console.error(error);
		} else {
			router().go(RouteName.Skills, {});
		}
	};

	const leading = (
		<div classes={css.column}>
			<h1 classes={css.heading}>
				<Icon
					classes={{
						'@dojo/widgets/icon': {
							icon: [css.icon]
						}
					}}
					type="plusIcon"
				/>
				Create New / Edit Existing
			</h1>
			<div classes={css.textInput}>
				<TextInput
					onValue={(value) => icache.set('person', value)}
					onKeyUp={(code) => {
						code === 13 && editProfile();
					}}
					placeholder="Enter name or hash..."
					initialValue={person}
				>
					{{ label: 'Full name or existing hash' }}
				</TextInput>
			</div>
			<Button onClick={() => editProfile()} disabled={!person}>
				{isPersonHash ? 'Edit Hash' : 'Create New'}
			</Button>
		</div>
	);

	const trailing = (
		<div classes={css.column}>
			<h1 classes={css.heading}>
				<Icon
					classes={{
						'@dojo/widgets/icon': {
							icon: [css.icon]
						}
					}}
					type="searchIcon"
				/>
				Compare Profiles
			</h1>
			<TextArea
				initialValue={hashes}
				onValue={(value) => icache.set('hashes', value)}
				placeholder="Enter multiple hashes separated by commas or new lines…"
			></TextArea>
			<Button
				disabled={!hashes}
				onClick={async () => {
					const value = icache.get<string>('hashes') || '';
					const hashes = value
						.replace(/(\n+|\,+|\s+)/g, '\n')
						.split('\n')
						.filter((value) => value.length > 0)
						.map((value) => cleanCopyUrl(value).trim());

					const outdatedHashes = hashes.filter((hash) => {
						const hashVersion = hash.split(DELIMITER)[1];
						if (hashVersion !== currentVersion) {
							return true;
						}
					});

					const { error } = await executor(loadAssessments)({ hashes, outdatedHashes });
					!error && router().go(RouteName.Compare, {});
				}}
			>
				Compare
			</Button>
		</div>
	);

	return (
		<div classes={css.root}>
			{leading}

			<div classes={css.divider}>
				<div classes={css.dividerLine}></div>
				<div classes={css.dividerBadge}>OR</div>
			</div>

			{trailing}
		</div>
	);
});
