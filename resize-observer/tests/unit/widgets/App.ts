const { describe, it } = intern.getInterface('bdd');
import harness from '@dojo/framework/testing/harness';

import { v, w } from '@dojo/framework/widget-core/d';

import App from '../../../src/widgets/App';
import Calendar from '../../../src/widgets/Calendar';
import Card from '../../../src/widgets/Card';
import ResizableSection from '../../../src/widgets/ResizableSection';
import Article from '../../../src/widgets/Article';
import Column from '../../../src/widgets/Column';
import Button from '@dojo/widgets/button'
import * as css from '../../../src/widgets/styles/app.m.css';

let resizeGetStub: any;

class TestWidget extends App {
  constructor() {
    super();

    this.meta = (() => {
      return {
        get: resizeGetStub
      };
    }) as any;
  }
}
describe('App', () => {
	it('should render without a switch button if not small', () => {
	  resizeGetStub = () => ({ isSmall: false, isMedium: false });
		const h = harness(() => w(TestWidget, {}));
		h.expect(() =>
			v('div', { classes: css.root }, [
        null,
        v('div', { key: 'root' }, [
          v('div', { classes: css.parentContainer }, [
            w(ResizableSection, {
              key: 0,
              isSmall: false,
              isMedium: false,
              expand: () => {},
              shrink: () => {},
              columns: 2
            }, [ w(Article, {}) ]),
            w(ResizableSection, {
              key: 1,
              isSmall: false,
              isMedium: false,
              expand: () => {},
              shrink: () => {},
              columns: 2
            }, [ v('div', {}, [
              v('h3', {}, [ 'Nested Components' ]),
              w(Column, {}, [
                w(Card, { labelOnLeft: true }),
                w(Card, { labelOnLeft: true })
              ])
            ]) ]),
            w(ResizableSection, {
              key: 2,
              isSmall: false,
              isMedium: false,
              expand: () => {},
              shrink: () => {},
              columns: 2
            }, [ w(Calendar, {}) ]),
            w(ResizableSection, {
              key: 3,
              isSmall: false,
              isMedium: false,
              expand: () => {},
              shrink: () => {},
              columns: 2
            }, [ w(Card, {}) ])
          ])
        ])
			])
		);
	});

	it('should render with a control div and only one widget if small', () => {
    resizeGetStub = () => ({ isSmall: true, isMedium: false });
    const h = harness(() => w(TestWidget, {}));
    h.expect(() =>
      v('div', { classes: css.root }, [
        v('div', { key: 'controls', classes: css.controls }, [
          w(Button, {
            onClick: () => {
            }
          }, [
            'Switch Demo Positions'
          ])
        ]),
        v('div', { key: 'root' }, [
          v('div', { classes: css.parentContainer }, [
            w(ResizableSection, {
              key: 0,
              isSmall: true,
              isMedium: false,
              expand: () => {
              },
              shrink: () => {
              },
              columns: 2
            }, [ w(Article, {}) ])
          ])
        ])
      ])
    );
  })
});
