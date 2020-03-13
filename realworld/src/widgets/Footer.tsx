import { create, tsx } from '@dojo/framework/core/vdom';

const factory = create();

export const Footer = factory(function Footer() {
	return (
		<footer>
			<div classes={['container']}>
				<a href="/" classes={['logo-font']}>
					conduit
				</a>
				<span classes={['attribution']}>
					An interactive learning project from <a href="https://thinkster.io">Thinkster</a> Code & design
					licensed under MIT.
				</span>
			</div>
		</footer>
	);
});

export default Footer;
