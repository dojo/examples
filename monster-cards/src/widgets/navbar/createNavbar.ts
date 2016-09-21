import { ComposeFactory } from 'dojo-compose/compose';
import createWidget, { Widget, WidgetState, WidgetOptions } from 'dojo-widgets/createWidget';
import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createStatefulChildrenMixin, { StatefulChildrenState, StatefulChildrenOptions } from 'dojo-widgets/mixins/createStatefulChildrenMixin';
import { Child } from 'dojo-widgets/mixins/interfaces';

import createNavMenu from './createNavMenu';
import createNavActions from './createNavActions';

interface NavbarState extends WidgetState, StatefulChildrenState { }

export interface NavbarOptions extends WidgetOptions<NavbarState>, StatefulChildrenOptions<Child, NavbarState> { }

export type Navbar = Widget<WidgetState>;

export interface NavbarFactory extends ComposeFactory<Navbar, NavbarOptions> { }

const createNavbar: NavbarFactory = createWidget
	.mixin(createRenderableChildrenMixin)
	.mixin({
		mixin: createStatefulChildrenMixin,
		initialize(instance, options) {
			instance
				.createChildren({
					navMenu: {
						factory: createNavMenu,
						options: {
							state: {
								classes: [ 'inline-list' ]
							}
						}
					},
					navActions: {
						factory: createNavActions,
						options: {
							state: {
								classes: [ 'inline-list', 'pull-right' ]
							}
						}
					}
				})
				.then(() => {
					instance.invalidate();
				});
		}
	}).extend({
		tagName: 'header'
	});

export default createNavbar;
