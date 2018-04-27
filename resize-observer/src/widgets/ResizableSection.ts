import WidgetBase from '@dojo/widget-core/WidgetBase';
import { v } from '@dojo/widget-core/d';
import * as css from './styles/resizableSection.m.css';

export class ResizableSection extends WidgetBase<ResizableSectionProperties> {
  private _columnClasses: { [ index: number ]: string } = {
    0: css.zeroColumns,
    1: css.oneColumn,
    2: css.twoColumns,
    3: css.threeColumns,
    4: css.fourColumns,
    5: css.fiveColumns,
    6: css.sixColumns,
    7: css.sevenColumns,
    8: css.eightColumns
  };

  protected render() {
    const { small, columns, expand, shrink } = this.properties;

    return v(
      'div',
      { key: 'root', classes: [ css.root, small ? css.eightColumns : this._columnClasses[columns] ] },
      [
        small ? null : v('div', {}, [
          v('button', { disabled: columns <= 1, onclick: shrink }, [ 'Shrink Component' ]),
          v('button', { disabled: columns === 8, onclick: expand }, [ 'Expand Component' ])
        ]),
        ...this.children
      ]
    );
  }
}

export type ColumnCount = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface ResizableSectionProperties {
  columns: ColumnCount;
  small?: boolean;
  expand: () => void;
  shrink: () => void;
}

export default ResizableSection;
