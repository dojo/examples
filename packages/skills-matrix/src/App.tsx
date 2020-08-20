import theme from '@dojo/framework/core/middleware/theme';
import { create, tsx } from '@dojo/framework/core/vdom';
import Outlet from '@dojo/framework/routing/Outlet';

import * as css from './App.m.css';
import router from './middleware/router';
import { store } from './middleware/store';
import { loadAssessment, newAssessment } from './processes/assessment.processes';
import { loadAssessments } from './processes/assessments.processes';
import { OutletName, RouteName } from './routes';
import matrixTheme from './themes/matrix';
import { isSkillHash } from './util/skills';
import { Compare } from './widgets/compare/Compare';
import Header from './widgets/header/Header';
import { Home } from './widgets/home/Home';
import { Skills } from './widgets/skills/Skills';

const factory = create({ store, router, theme });

export default factory(function App({
	middleware: {
		store: { get, path, executor },
		router,
		theme
	}
}) {
	if (!get(path('matrix'))) {
		return null;
	}

	if (!theme.get()) {
		theme.set(matrixTheme);
	}

	return (
		<virtual>
			<Header />
			<div classes={css.container}>
				<div classes={css.content}>
					<Outlet id={OutletName.Main}>
						{{
							[RouteName.Home]: <Home />,
							[RouteName.Skills]: <Skills />,
							[RouteName.EditSkills]: ({ params: { hash } }) => {
								const value = decodeURIComponent(hash);
								const result = isSkillHash(value)
									? executor(loadAssessment)({ hash: value })
									: executor(newAssessment)({ name: value });
								Promise.resolve<any>(result).then(() => {
									router().go(RouteName.Skills, {});
								});
								return null;
							},
							[RouteName.Compare]: <Compare />,
							[RouteName.MultiCompare]: ({ params: { hashList } }) => {
								const rawHashList = decodeURIComponent(hashList).split(',');
								const filteredHashList = rawHashList.filter((hash) => isSkillHash(hash));
								const result = executor(loadAssessments)({ hashes: filteredHashList });
								Promise.resolve<any>(result).then(() => {
									router().go(RouteName.Compare, {});
								});
								return null;
							}
						}}
					</Outlet>
				</div>
			</div>
		</virtual>
	);
});
