import loadCldrData from '@dojo/i18n/cldr/load';
import { systemLocale, switchLocale, invalidate } from '@dojo/i18n/i18n';
import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import registerCustomElement from '@dojo/widget-core/registerCustomElement';
import { App } from './App';
import likelySubtags from './nls/likelySubtags';
import router from './routes';
import createGithubIssuesElement from './widgets/custom/createGithubIssuesElement';

registerCustomElement(createGithubIssuesElement);

Promise.all([
	loadCldrData({
		main: {
			[systemLocale]: {}
		}
	}),
	loadCldrData(likelySubtags)
]).then(() => {
	switchLocale(systemLocale);
	invalidate();

	const appProjector = ProjectorMixin(App);
	const projector = new appProjector();

	projector.root = document.getElementsByTagName('my-app')[ 0 ];

	if (projector.root) {
		projector
			.append()
			.then(() => router.start());
	}
});
