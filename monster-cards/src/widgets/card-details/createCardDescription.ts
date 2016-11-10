import { Widget, DNode } from 'dojo-interfaces/widgetBases';
import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import d from 'dojo-widgets/util/d';
import createCssTransitionMixin from 'dojo-widgets/mixins/createCssTransitionMixin';

export type MilestoneCardDetails = {
	name: string;
	tagline: string;
	description: string;
	imageClass: string;
	favouriteCount: number;
	cardId: string;
}

export type CardDescription = Widget<MilestoneCardDetails>;

const createCardDescription = createWidgetBase
	.mixin(createCssTransitionMixin)
	.extend({
		tagName: 'card-details-description',
		childNodeRenderers: [
			function(this: CardDescription): any[] {
				return [
					d(createWidgetBase, { state: { classes: [ 'cardImage', 'card-sprite-large', this.state.imageClass ] }}),
					d('article', {}, [
						d('h1', { innerHTML: this.state.name }),
						d('strong.tagline', { innerHTML: this.state.tagline }),
						d('p', { innerHTML: this.state.description }),
						d('span', { innerHTML: `Favourited: ` }),
						d('span.favouriteCount', { innerHTML: this.state.favouriteCount.toString() }),
						d('div.buttonHolder', {}, [
							d('a.button', {}, [
								d('i.fa.fa-heart-o'),
								d('span', { innerHTML: 'Add to favourites' })
							]),
							d('a.button', { href: 'http://www.twitter.com' }, [
								d('i.fa.fa-twitter')
							]),
							d('a.button', { href: 'https://facebook.com' }, [
								d('i.fa.fa-facebook')
							])
						])
					])
				];
			}
		]
	});

export default createCardDescription;
