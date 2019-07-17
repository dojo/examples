import { create, tsx } from '@dojo/framework/core/vdom';
import * as css from './styles/loading.m.css';

const factory = create();

export default factory(function Loading() {
	return <div classes={[css.spinner]}></div>;
});
