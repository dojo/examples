import { Widget, DNode, WidgetState } from 'dojo-widgets/interfaces';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { v } from 'dojo-widgets/d';
import createCssTransitionMixin from 'dojo-widgets/mixins/createCssTransitionMixin';

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
	const icon = v(`i.fa.${iconClass}`);
	const buttonText = innerHTML ? v('span', { innerHTML }) : null;

	return v('a.button', { href }, [ icon, buttonText ]);
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
			classes: [ 'animated', 'cardDescription' ],
			getChildrenNodes: function(this: CardDescription): DNode[] {
				const { imageClass, name, tagline, description, favouriteCount } = this.state;

				const cardImage = v(`div.cardImage.card-sprite-large.${imageClass}`);
				const cardName = v('h1', { innerHTML: name });
				const cardTagline = v('strong.tagline', { innerHTML: tagline });
				const cardDescription = v('p', { innerHTML: description });
				const cardFavouriteCount = v('span', { innerHTML: `Favourited: ${favouriteCount}` });
				const shareButtons = v('div.buttonHolder', {}, shareButtonConfig.map(createButtonLink));

				return [
					cardImage,
					v('article', {}, [
						cardName,
						cardTagline,
						cardDescription,
						cardFavouriteCount,
						shareButtons
					])
				];
			}
		}
	});

export default createCardDescription;
