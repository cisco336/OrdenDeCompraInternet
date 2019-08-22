export interface PeriodicElement {
    Orden: number;
    "Fecha creación": string;
    "Fecha despacho": number;
    "Fecha entrega": string;
    "Estado orden": string;
    "Almacen a entregar": string;
    "Fecha real de entrega": string;
    Valor: number;
    "Consecutivo nota pedido": string;
    "Estado nota pedido": string;
    "Tipo de entrega": string;
    "Operador (transportadora)": string;
    "Estado de integración": string;
    "Fecha de integración": string;
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