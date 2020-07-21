import { create, tsx } from '@dojo/framework/core/vdom';

const factory = create();

export const Banner = factory(function Banner() {
	return (
		<div classes={['banner']}>
			<div classes={['container']}>
				<h1 classes={['logo-font']}>conduit</h1>
				<p>A place to share your knowledge.</p>
			</div>
		</div>
	);
});

export default Banner;
