import { Container } from '@dojo/framework/widget-core/Container';
import { Context } from './../Context';
import { Menu, MenuProperties } from './../widgets/Menu';

function getProperties(context: Context, properties: MenuProperties): MenuProperties {
	return {
		currentCategory: context.category
	};
}

export const MenuContainer = Container(Menu, 'state', { getProperties });
