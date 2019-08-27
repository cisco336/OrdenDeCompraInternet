export interface PeriodicElement {
  Orden: number;
  'Fecha creación': string;
  'Fecha despacho': number;
  'Fecha entrega': string;
  'Estado orden': string;
  'Almacen a entregar': string;
  'Fecha real de entrega': string;
  Valor: number;
  'Consecutivo nota pedido': string;
  'Estado nota pedido': string;
  'Tipo de entrega': string;
  'Operador (transportadora)': string;
  'Estado de integración': string;
  'Fecha de integración': string;
}

export interface OrdenDeCompra {
  CNTRY_NAME: string;
  ESTADO: string;
  FECHA_CREACION: string;
  FECHA_MODIFICACION: string;
  ORIGEN: string;
  PMG_ENTRY_DATE: string;
  PMG_EXP_RCT_DATE: string;
  PMG_PAY_DATE: string;
  PMG_PO_NUMBER: number;
  PMG_RELEASE_DATE: string;
  PMG_SHIP_DATE: string;
  PMG_SHIP_DATE1: string;
  PMG_STAT_CODE: number;
  PMG_STAT_NAME: string;
  PMG_TOT_CASE_QTY: number;
  PMG_TOT_PO_COST: number;
  PMG_TOT_SELL_QTY: number;
  PMG_USER: string;
  STICKER: string;
  USR_MODIFICACION: null;
  VENDOR_NAME: string;
  VENDOR_NUMBER: string;
  VPC_TECH_KEY: number;
  observaciones: string;
}
export interface DetalleOrdenDeCompra {
  ESTADO: string;
  FECHA_CREACION: string;
  FECHA_MODIFICACION: string;
  ID_ESTADO: number;
  NAME_FAMILIA: string;
  ORG_LVL_CHILD: number;
  ORG_NAME_FULL: string;
  ORIGEN_DESC: string;
  PMG_CANCEL_DATE: string;
  PMG_DTL_TECH_KEY: number;
  PMG_DTL_TYPE: number;
  PMG_EXP_RCT_DATE: string;
  PMG_PACK_COST: number;
  PMG_PACK_QTY: number;
  PMG_PAY_DATE: string;
  PMG_PO_NUMBER: number;
  PMG_RETAIL: number;
  PMG_SELL_COST: number;
  PMG_SELL_QTY: number;
  PMG_SEQ_NUM: number;
  PMG_SHIP_DATE: string;
  PMG_STATUS: number;
  PMG_STAT_NAME: string;
  PMG_TOT_DTL_COST: number;
  PRD_LVL_CHILD: number;
  PRD_LVL_NUMBER: string;
  PRD_NAME_FULL: string;
  PRD_UPC: number;
  USR_CREACION: string;
  USR_MODIFICACION: string;
  VPC_PRD_TECH_KEY: number;
  observaciones: string;
}
export interface Proveedor {
  ACTIVO: string;
  EMAIL: string;
  NOMBRE_PROVEEDOR: string;
  PROVEEDOR_ID: number;
}

export interface Estado {
  ID: number;
  DESCRIPCION: string;
}

export interface Proveedores {
  ID: number;
  DESCRIPCION: string;
}
