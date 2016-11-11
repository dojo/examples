import createWidget from 'dojo-widgets/createWidget';
import createI18nMixin from 'dojo-widgets/mixins/createI18nMixin';
import bundle from '../nls/main';

const createTextWidget = createWidget
	.mixin({
		mixin: createI18nMixin,
		initialize(instance) {
			instance.registerBundle(bundle);
		}
	});

export default createTextWidget;
