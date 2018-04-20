import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import App from './widgets/App';

const Projector = ProjectorMixin(App);
const projector = new Projector();

projector.append();
