import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import WidgetBase from '@dojo/widget-core/WidgetBase';

const Projector = ProjectorMixin(WidgetBase);
const projector = new Projector();

projector.append();
