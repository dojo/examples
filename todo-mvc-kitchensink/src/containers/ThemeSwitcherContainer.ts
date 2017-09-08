import { Container } from '@dojo/widget-core/Container';

import { TodoAppContext } from './../TodoAppContext';
import { ThemeSwitcher } from './../widgets/ThemeSwitcher';

function getProperties(todoAppContext: TodoAppContext, properties: any) {
	return {
		changeTheme: todoAppContext.changeTheme.bind(todoAppContext)
	};
}

export const ThemeSwitcherContainer = Container(ThemeSwitcher, 'state', { getProperties });
