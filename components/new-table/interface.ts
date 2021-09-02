/**
 * ColumnType which applied in antd: https://ant.design/components/table-cn/#Column
 * - defaultSortOrder
 * - filterDropdown
 * - filterDropdownVisible
 * - filtered
 * - filteredValue
 * - filterIcon
 * - filterMultiple
 * - filters
 * - sorter
 * - sortOrder
 * - sortDirections
 * - onFilter
 * - onFilterDropdownVisibleChange
 */

import type { CSSProperties, DefineComponent, FunctionalComponent, HTMLAttributes, Ref } from 'vue';

export type Key = number | string;

export type FixedType = 'left' | 'right' | boolean;

export type DefaultRecordType = Record<string, any>;

export type TableLayout = 'auto' | 'fixed';

// ==================== Row =====================
export type RowClassName<RecordType> = (
  record: RecordType,
  index: number,
  indent: number,
) => string;

// =================== Column ===================
export interface CellType<RecordType = DefaultRecordType> {
  key?: Key;
  class?: string;
  className?: string;
  style?: CSSProperties;
  children?: any;
  column?: ColumnsType<RecordType>[number];
  colSpan?: number;
  rowSpan?: number;

  /** Only used for table header */
  hasSubColumns?: boolean;
  colStart?: number;
  colEnd?: number;
}

export interface RenderedCell<RecordType> {
  props?: CellType<RecordType>;
  children?: any;
}

export type DataIndex = string | number | readonly (string | number)[];

export type CellEllipsisType = { showTitle?: boolean } | boolean;

interface ColumnSharedType<RecordType> {
  title?: any;
  key?: Key;
  class?: string;
  className?: string;
  fixed?: FixedType;
  onHeaderCell?: GetComponentProps<ColumnsType<RecordType>[number]>;
  ellipsis?: CellEllipsisType;
  align?: AlignType;
}

export interface ColumnGroupType<RecordType> extends ColumnSharedType<RecordType> {
  children: ColumnsType<RecordType>;
}

export type AlignType = 'left' | 'center' | 'right';

export interface ColumnType<RecordType> extends ColumnSharedType<RecordType> {
  colSpan?: number;
  dataIndex?: DataIndex;
  customRender?: (opt: {
    value: any;
    text: any; // 兼容 V2
    record: RecordType;
    index: number;
    column: ColumnType<RecordType>;
  }) => any | RenderedCell<RecordType>;
  rowSpan?: number;
  width?: number | string;
  onCell?: GetComponentProps<RecordType>;
  /** @deprecated Please use `onCell` instead */
  onCellClick?: (record: RecordType, e: MouseEvent) => void;
}

export type ColumnsType<RecordType = unknown> = readonly (
  | ColumnGroupType<RecordType>
  | ColumnType<RecordType>
)[];

export type GetRowKey<RecordType> = (record: RecordType, index?: number) => Key;

// ================= Fix Column =================
export interface StickyOffsets {
  left: readonly number[];
  right: readonly number[];
  isSticky?: boolean;
}

// ================= Customized =================
export type GetComponentProps<DataType> = (
  data: DataType,
  index?: number,
) => Omit<HTMLAttributes, 'style'> & { style?: CSSProperties };

type Component<P> = DefineComponent<P> | FunctionalComponent<P> | string;

export type CustomizeComponent = Component<any>;

export type CustomizeScrollBody<RecordType> = (
  data: readonly RecordType[],
  info: {
    scrollbarSize: number;
    ref: Ref<{ scrollLeft: number }>;
    onScroll: (info: { currentTarget?: HTMLElement; scrollLeft?: number }) => void;
  },
) => any;

export interface TableComponents<RecordType> {
  table?: CustomizeComponent;
  header?: {
    wrapper?: CustomizeComponent;
    row?: CustomizeComponent;
    cell?: CustomizeComponent;
  };
  body?:
    | CustomizeScrollBody<RecordType>
    | {
        wrapper?: CustomizeComponent;
        row?: CustomizeComponent;
        cell?: CustomizeComponent;
      };
}

export type GetComponent = (
  path: readonly string[],
  defaultComponent?: CustomizeComponent,
) => CustomizeComponent;

// =================== Expand ===================
export type ExpandableType = false | 'row' | 'nest';

export interface LegacyExpandableProps<RecordType> {
  /** @deprecated Use `expandable.expandedRowKeys` instead */
  expandedRowKeys?: Key[];
  /** @deprecated Use `expandable.defaultExpandedRowKeys` instead */
  defaultExpandedRowKeys?: Key[];
  /** @deprecated Use `expandable.expandedRowRender` instead */
  expandedRowRender?: ExpandedRowRender<RecordType>;
  /** @deprecated Use `expandable.expandRowByClick` instead */
  expandRowByClick?: boolean;
  /** @deprecated Use `expandable.expandIcon` instead */
  expandIcon?: RenderExpandIcon<RecordType>;
  /** @deprecated Use `expandable.onExpand` instead */
  onExpand?: (expanded: boolean, record: RecordType) => void;
  /** @deprecated Use `expandable.onExpandedRowsChange` instead */
  onExpandedRowsChange?: (expandedKeys: Key[]) => void;
  /** @deprecated Use `expandable.defaultExpandAllRows` instead */
  defaultExpandAllRows?: boolean;
  /** @deprecated Use `expandable.indentSize` instead */
  indentSize?: number;
  /** @deprecated Use `expandable.expandIconColumnIndex` instead */
  expandIconColumnIndex?: number;
  /** @deprecated Use `expandable.expandedRowClassName` instead */
  expandedRowClassName?: RowClassName<RecordType>;
  /** @deprecated Use `expandable.childrenColumnName` instead */
  childrenColumnName?: string;
}

export type ExpandedRowRender<ValueType> = (
  record: ValueType,
  index: number,
  indent: number,
  expanded: boolean,
) => any;

export interface RenderExpandIconProps<RecordType> {
  prefixCls: string;
  expanded: boolean;
  record: RecordType;
  expandable: boolean;
  onExpand: TriggerEventHandler<RecordType>;
}

export type RenderExpandIcon<RecordType> = (props: RenderExpandIconProps<RecordType>) => any;

export interface ExpandableConfig<RecordType> {
  expandedRowKeys?: readonly Key[];
  defaultExpandedRowKeys?: readonly Key[];
  expandedRowRender?: ExpandedRowRender<RecordType>;
  expandRowByClick?: boolean;
  expandIcon?: RenderExpandIcon<RecordType>;
  onExpand?: (expanded: boolean, record: RecordType) => void;
  onExpandedRowsChange?: (expandedKeys: readonly Key[]) => void;
  defaultExpandAllRows?: boolean;
  indentSize?: number;
  expandIconColumnIndex?: number;
  expandedRowClassName?: RowClassName<RecordType>;
  childrenColumnName?: string;
  rowExpandable?: (record: RecordType) => boolean;
  columnWidth?: number | string;
  fixed?: FixedType;
}

// =================== Render ===================
export type PanelRender<RecordType> = (data: readonly RecordType[]) => any;

// =================== Events ===================
export type TriggerEventHandler<RecordType> = (record: RecordType, event: MouseEvent) => void;

// =================== Sticky ===================
export interface TableSticky {
  offsetHeader?: number;
  offsetSummary?: number;
  offsetScroll?: number;
  getContainer?: () => Window | HTMLElement;
}
