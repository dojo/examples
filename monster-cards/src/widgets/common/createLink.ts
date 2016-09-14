import { ComposeFactory } from 'dojo-compose/compose';
import createWidget, { Widget, WidgetState, WidgetOptions } from 'dojo-widgets/createWidget';
import { VNodeProperties } from 'maquette';
import createCachedRenderMixin from 'dojo-widgets/mixins/createCachedRenderMixin';

export interface LinkState extends WidgetState {
	href?: string[];
}

export interface LinkOptions extends WidgetOptions<LinkState> { }

export type Link = Widget<LinkState>;

export interface LinkFactory extends ComposeFactory<Link, LinkOptions> { }

const createLink: LinkFactory = createWidget
	.mixin({
		mixin: createCachedRenderMixin,
		aspectAdvice: {
			before: {
				getNodeAttributes(this: Link, overrides: VNodeProperties = {}): VNodeProperties[] {
					if (this.state.href !== undefined) {
						overrides['href'] = this.state.href;
					}

					return [overrides];
				}
			}
		}
	})
	.extend({
		tagName: 'a'
	});

export default createLink;
