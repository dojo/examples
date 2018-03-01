import { Outlet } from '@dojo/routing/Outlet';
import { MapParamsOptions } from '@dojo/routing/interfaces';

const mapParams = ({ params }: MapParamsOptions) => {
	return {
		slug: params.slug
	};
};

export const ArticleOutlet = Outlet('article', 'article', { mapParams });
