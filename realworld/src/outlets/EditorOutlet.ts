import { Outlet } from '@dojo/routing/Outlet';
import { MapParamsOptions } from '@dojo/routing/interfaces';

const mapParams = ({ params }: MapParamsOptions) => {
	return {
		slug: params.slug
	};
};

export const EditorNewOutlet = Outlet({ index: 'editor' }, 'new-post', { mapParams });
export const EditorEditOutlet = Outlet('editor', 'edit-post', { mapParams });
