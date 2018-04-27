import WidgetBase from '@dojo/widget-core/WidgetBase';
import { v, w } from '@dojo/widget-core/d';
import Calendar from './Calendar';
import Card from './Card';
import ResizableSection from './ResizableSection';
import Article from './Article';
import Column from './Column';
import Button from '@dojo/widgets/Button';
import * as css from './styles/app.m.css';
import Resize, { ContentRect } from '@dojo/widget-core/meta/Resize';

export class App extends WidgetBase {

	private _offset = 0;
	private _columns = [2, 2, 2, 2];

	private _rotate() {
		this._offset = (this._offset + 1) % 4;
		this.invalidate();
	}

	private _increment(value: number, increment: number) {
	  return Math.min(value + increment, 8);
  }

  private _decrement(value: number, increment: number) {
	  return Math.max(value - increment, 0);
  }

	private _resize(column: number, expand: boolean, isMedium: boolean) {
	  const columns = this._columns.slice();
	  const increment = isMedium ? 2 : 1;

    if (expand && columns[column] !== 8) {
      for (let i = column + 1; i < 4; i ++) {
        if (columns[i] > 0) {
          columns[i] = this._decrement(columns[i], increment);
          columns[column] = this._increment(columns[column], increment);
          return columns;
        }
      }

      for (let i = column - 1; i >= 0; i--) {
        if (columns[i] > 0) {
          columns[i] = this._decrement(columns[i], increment);
          columns[column] = this._increment(columns[column], increment);
          return columns;
        }
      }
    } else if (!expand && columns[column] !== 0) {
      for (let i = column + 1; i < 4; i ++) {
        if (columns[i] === 0) {
          columns[i] = this._increment(columns[i], increment);
          columns[column] = this._decrement(columns[column], increment);
          return columns;
        }
      }

      for (let i = column - 1; i >= 0; i--) {
        if (columns[i] === 0) {
          columns[i] = this._increment(columns[i], increment);
          columns[column] = this._decrement(columns[column], increment);
          return columns;
        }
      }

      if (columns[column + 1]) {
        columns[column + 1] = this._increment(columns[column + 1], increment);
        columns[column] = this._decrement(columns[column], increment);
      } else if (columns[column - 1]) {
        columns[column - 1] = this._increment(columns[column - 1], increment);
        columns[column] = this._decrement(columns[column], increment);
      }
    }

    return columns;
  }

	private _createResizer(column: number, expand: boolean, isMedium: boolean) {
	  return () => {
      this._columns = this._resize(column, expand, isMedium);
      this.invalidate();
    };
  }

  protected _smallPredicate(contentRect: ContentRect) {
    return contentRect.width < 600;
  }

  protected _mediumPredicate(contentRect: ContentRect) {
	  return contentRect.width < 1000;
  }

	protected render() {
    const { isSmall, isMedium } = this.meta(Resize).get('root', {
      isSmall: this._smallPredicate,
      isMedium: this._mediumPredicate
    });

	  const widgets = [
      w(Article, {}),
      v('div', {}, [
        v('h3', {}, [ 'Nested Components' ]),
        w(Column, {}, [ w(Card, { labelOnLeft: true }), w(Card, { labelOnLeft: true }) ])
      ]),
      w(Calendar, {}),
      w(Card, {})
    ];

	  return v('div', { classes: css.root }, [
      isSmall ? v('div', { key: 'controls', classes: css.controls }, [
        w(Button, { onClick: () => this._rotate() }, [
          'Switch Demo Positions'
        ])
      ]) : null,
      v('div', { key: 'root' }, [
        v('div', { classes: css.parentContainer }, this._columns.map((columns, index) => {
            const expand = this._createResizer(index, true, isMedium);
            const shrink = this._createResizer(index, false, isMedium);

            return (!isSmall || index === this._offset) ? w(
              ResizableSection,
              { key: index, expand, shrink, columns, isSmall, isMedium },
              [ widgets[index] ]
            ) : null;
          })
        ),
      ])
    ]);
	}
}

export default App;
