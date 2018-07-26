import { ProjectorMixin } from '@dojo/framework/widget-core/mixins/Projector';
import App from './widgets/App';
import '@dojo/framework/shim/browser';

const Projector = ProjectorMixin(App);
const projector = new Projector();

projector.append();
