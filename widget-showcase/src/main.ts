import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import App from './App';
import dojoTheme from '@dojo/widgets/themes/dojo/theme';

const Projector = ProjectorMixin(App);
const projector = new Projector();

projector.append();
