import createMemoryStore from 'dojo-stores/createMemoryStore';
import * as css from '../widgets/card-details/card-details.module.styl';

export default createMemoryStore<any>({
	data: [
		{
			id: 'navbar',
			sections: [
				{ text: 'the cards', href: '#cards' },
				{ text: 'gameplay', href: '#gameplay' },
				{ text: 'about', href: '#about' }
			]
		},
		{
			id: 'container',
			children: []
		},
		{
			id: 'cardDetails',
			enterAnimation: css.fadeInSlideDown,
			exitAnimation: css.fadeOutSlideUp
		},
		{
			id: 'cards',
			enterAnimation: 'fadeIn',
			exitAnimation: 'fadeOut'
		},
		{
			id: 'home',
			enterAnimation: 'fadeIn',
			exitAnimation: 'fadeOut'
		},
		{
			id: 'about',
			enterAnimation: 'fadeIn',
			exitAnimation: 'fadeOut'
		},
		{
			id: 'gameplay',
			enterAnimation: 'fadeIn',
			exitAnimation: 'fadeOut'
		}
	]
});
