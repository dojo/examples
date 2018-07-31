import { Outlet } from '@dojo/framework/routing/Outlet';
import { MapParamsOptions } from '@dojo/framework/routing/interfaces';

const mapParams = ({ params }: MapParamsOptions) => {
	return {
		slug: params.slug
	};
};

export const ArticleOutlet = Outlet('article', 'article', { mapParams });
