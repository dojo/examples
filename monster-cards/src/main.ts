import createApp from 'dojo-app/createApp';
import createMemoryStore from 'dojo-stores/createMemoryStore';
import createCssTransition from 'dojo-widgets/mixins/createCssTransitionMixin';
import createWidget from 'dojo-widgets/createWidget';

import createContainer from './widgets/common/createContainer';
import createImage from './widgets/common/createImage';

import createNavbar from './widgets/navbar/createNavbar';

let text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis dolor euismod, consequat nisl in, condimentum odio. Vivamus sit amet ipsum volutpat, auctor risus sit amet, consequat libero. Etiam quis suscipit ipsum, sit amet porta lectus. In sollicitudin orci quis tempus bibendum. Nam non ex in est cursus elementum. Praesent imperdiet ante eget leo varius porta. Quisque mollis ipsum eu augue efficitur dignissim. Sed a fermentum metus. In pretium nisi odio, eu aliquam purus interdum eget. Nulla ut mi at felis facilisis porttitor facilisis quis massa. Integer egestas neque sem, non ultrices ex blandit sit amet. Sed eu lectus urna.';

for (let i = 0; i < 5; i++) {
	text += text;
}

const widgetStore = createMemoryStore({
	data: [
		{
			id: 'navbar',
			classes: [ 'navbar' ]
		},
		{
			id: 'container',
			classes: [ 'content' ],
			children: [ 'jumbotron' ]
		},
		{
			id: 'jumbotron',
			classes: [ 'jumbotron' ],
			children: [ 'home-page-title-container' ]
		},
		{
			id: 'home-page-title-container',
			classes: [ 'jumbotron-layout', 'animated' ],
			children: [ 'home-page-img', 'home-page-title' ],
			enterAnimation: 'fadeInRightBig'
		},
		{
			id: 'cards-title-container',
			classes: [ 'jumbotron-layout', 'animated' ],
			children: [ 'cards-img' ],
			enterAnimation: 'fadeInRightBig'
		},
		{
			id: 'home-page-img',
			classes: [ 'jumbotron-image' ],
			src: './images/application-logo.png'
		},
		{
			id: 'home-page-title',
			classes: [ 'jumbotron-title' ],
			label: 'Will your project suck or succeed?'
		},
		{
			id: 'cards-img',
			classes: [ 'jumbotron-image' ],
			src: './images/dojo_logo.png'
		}
	]
});

const app = createApp({ defaultWidgetStore: widgetStore });

app.loadDefinition({
	widgets: [
		{
			id: 'navbar',
			factory: createNavbar
		},
		{
			id: 'container',
			factory: createContainer
		},
		{
			id: 'jumbotron',
			factory: createContainer
		},
		{
			id: 'home-page-title-container',
			factory: createContainer.mixin(createCssTransition)
		},
		{
			id: 'cards-title-container',
			factory: createContainer.mixin(createCssTransition)
		},
		{
			id: 'home-page-img',
			factory: createImage
		},
		{
			id: 'home-page-title',
			factory: createWidget
		},
		{
			id: 'cards-img',
			factory: createImage
		}
	]
});

app.realize(document.body)
	.then(() => {
		let switchFlag = true;
		setInterval(function() {
			const patchObject: any = { id: 'jumbotron', children: [] };
			if (switchFlag) {
				patchObject.children.push('cards-title-container');
			}
			else {
				patchObject.children.push('home-page-title-container');
			}
			switchFlag = !switchFlag;
			widgetStore.patch(patchObject);
		}, 1000);
	})
	.catch((err) => {
		/* Report any realization errors */
		console.error(err);
	});
