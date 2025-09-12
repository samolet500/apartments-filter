export interface ITableColumn {
  label: string;
  prop: string;
  width?: string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  visible?: boolean
}