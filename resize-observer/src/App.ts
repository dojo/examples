import WidgetBase from '@dojo/widget-core/WidgetBase';
import { v, w } from '@dojo/widget-core/d';
import Calendar from './widgets/Calendar';
import Card from './widgets/Card';
import ResizableSection, { ColumnCount } from './widgets/ResizableSection';
import Article from './widgets/Article';
import Column from './widgets/Column';
import Button from '@dojo/widgets/Button';
import * as css from './styles/app.m.css';
import Resize, { ContentRect } from '@dojo/widget-core/meta/Resize';

export class App extends WidgetBase {

	private _offset = 0;
	private _columns: ColumnCount[] = [2, 2, 2, 2];

	private _rotate() {
		this._offset = (this._offset + 1) % 4;
		this.invalidate();
	}

	private _resize(column: number, expand?: boolean) {
	  const columns = this._columns.slice();

    if (expand && columns[column] !== 8) {
      for (let i = column + 1; i < 4; i ++) {
        if (columns[i] > 0) {
          columns[i] = columns[i] - 1 as ColumnCount;
          columns[column] = columns[column] + 1 as ColumnCount;
          return columns;
        }
      }

      for (let i = column - 1; i >= 0; i--) {
        if (columns[i] > 0) {
          columns[i] = columns[i] - 1 as ColumnCount;
          columns[column] = columns[column] + 1 as ColumnCount;
          return columns;
        }
      }
    } else if (!expand && columns[column] !== 0) {
      for (let i = column + 1; i < 4; i ++) {
        if (columns[i] === 0) {
          columns[i] = 1;
          columns[column] = columns[column] - 1 as ColumnCount;
          return columns;
        }
      }

      for (let i = column - 1; i >= 0; i--) {
        if (columns[i] === 0) {
          columns[i] = 1;
          columns[column] = columns[column] - 1 as ColumnCount;
          return columns;
        }
      }

      if (columns[column + 1]) {
        columns[column + 1] = columns[column + 1] + 1 as ColumnCount;
        columns[column] = columns[column] - 1 as ColumnCount;
      } else if (columns[column - 1]) {
        columns[column - 1] = columns[column - 1] + 1 as ColumnCount;
        columns[column] = columns[column] - 1 as ColumnCount;
      }
    }

    return columns;
  }

	private _createResizer(column: number, expand?: boolean) {
	  return () => {
      this._columns = this._resize(column, expand);
      this.invalidate();
    };
  }

  protected _smallPredicate(contentRect: ContentRect) {
    return contentRect.width < 600;
  }

	protected render() {
    const { isSmall } = this.meta(Resize).get('root', {
      isSmall: this._smallPredicate
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
      isSmall ? v('div', { key: 'controls', styles: { height: '25px' }}, [
        w(Button, { onClick: () => this._rotate() }, [
          'Switch Demo Positions'
        ])
      ]) : null,
      v('div', { key: 'root', styles: { height: 'calc(100% - 20px)' }}, [
        v(
          'div',
          { styles: { display: 'flex', border: '1px solid black' } },
          this._columns.map((columns, index) => {
            const expand = this._createResizer(index, true);
            const shrink = this._createResizer(index);

            return (!isSmall || index === 0) ? w(
              ResizableSection,
              { key: index, expand, shrink, columns, small: isSmall },
              [ widgets[(4 + index - this._offset) % 4] ]
            ) : null;
          })
        ),
      ])
    ]);
	}
}

export default App;
