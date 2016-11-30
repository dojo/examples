import { Widget, DNode, WidgetState } from 'dojo-interfaces/widgetBases';
import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import d from 'dojo-widgets/util/d';
import createCssTransitionMixin from 'dojo-widgets/mixins/createCssTransitionMixin';
import * as css from './description.module.styl';
import * as generalCss from '../common/general.module.styl';

export type CardDescriptionState = WidgetState & {
	name: string;
	tagline: string;
	description: string;
	imageClass: string;
	favouriteCount: number;
	id: string;
}

export type CardDescription = Widget<CardDescriptionState>;

export type ShareButtonConfig = {
	iconClass: string;
	href?: string;
	text?: string;
}

function createButtonLink({ iconClass, href, text: innerHTML }: ShareButtonConfig): DNode {
	const icon = d(`i.fa.${ iconClass }`);
	const buttonText = innerHTML ? d('span', { innerHTML }) : null;

	return d(`a.${ generalCss.button }`, { href }, [ icon, buttonText ]);
}

const shareButtonConfig: ShareButtonConfig[] = [
	{ href: '', iconClass: 'fa-heart-o', text: 'Add to favourites' },
	{ href: 'http://www.twitter.com', iconClass: 'fa-twitter' },
	{ href: 'https://facebook.com', iconClass: 'fa-facebook' }
];

const createCardDescription = createWidgetBase
	.mixin(createCssTransitionMixin)
	.mixin({
		mixin: {
			classes: [ 'animated', css.cardDescription ],
			childNodeRenderers: [
				function(this: CardDescription): DNode[] {
					const { imageClass, name, tagline, description, favouriteCount } = this.state;

					const cardImage = d(`div.${ css.cardImage }.card-sprite-large.${imageClass}`);
					const cardName = d('h1', { innerHTML: name });
					const cardTagline = d('strong.tagline', { innerHTML: tagline });
					const cardDescription = d('p', { innerHTML: description });
					const cardFavouriteCount = d('span', { innerHTML: `Favourited: ${favouriteCount}` });
					const shareButtons = d(`div.${ css.buttonHolder }`, {}, shareButtonConfig.map(createButtonLink));

					return [
						cardImage,
						d('article', {}, [
							cardName,
							cardTagline,
							cardDescription,
							cardFavouriteCount,
							shareButtons
						])
					];
				}
			]
		}
	});

export default createCardDescription;
