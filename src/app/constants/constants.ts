export const tooltips = {
  optionsInfo:
    'Cambiar estado: debe seleccionar (con el checkbox) las ordenes a las que desea cambiar el estado. Generar reporte: genera un archivo .xlsx (Excel) que contiene toda la información presentada en la tabla.',

  mainFilterInfo:
    'La fecha final no puede ser anterior a la inicial. Todos los campos son obligatorios.',

  tableFilterInfo:
    'El valor indicado se utilizará como filtro en toda la información de la tabla.',

  checkBoxInfo:
    "Seleccione para habilitar la opción 'Cambio de Estado', puede seleccionar/deseleccionar todos con este check principal o sleccionar/deseleccionar cada orden de compra por separado",

  tableFooterClick:
    'Haga clic sobre el número de orden para mostrar los detalles. ',

  tableFooterDblclick:
    'Haga DOBLE clic sobre cualquier otra parte de la fila para mostrar más información sobre la orden.'
};
export const matFormFieldText = {};
export const errorMessagesText = {
  noPrivileges: 'Usted no tiene privilegios.',
  error0: 'Error de conexión.',
  error401: 'Error: no autorizado.',
  error404: 'Error: el elemento seleccionado no existe.',
  error500: 'Error interno del servidor.',
  errorUnknown: 'Error desconocido.',
  startEndDateError: 'Fecha fin no puede ser anterior a la fecha de inicio.',
  queryError: 'La solicitud no pudo ejecutarse.',
  mustSelectAnOrder: 'Debe seleccionar al menos una orden de compra.',
  noObservations: 'Sin observaciones.',
  noData: 'Sin datos',
  statesError: 'Error al obtener los estados.',
  providersError: 'Error al obtener los proveedores.'
};
export const successMessagesText = {
  querySuccess: 'La solicitud se ejecutó de forma exitosa.'
};
export const paginator = {
  of: 'de',
  itemsPerPageLabel: 'Elementos por página',
  nextPageLabel: 'Página siguiente',
  previousPageLabel: 'Página anterior',
  firstPageLabel: 'Primera página',
  lastPageLabel: 'Última página'
};
export const strings = {
  provider: 'Proveedor',
  states: 'Estados',
  state: 'Estado',
  requiredField: 'Campo requerido.',
  creationDate: 'Fecha creación',
  changeDate: 'Fecha del cambio',
  changeTime: 'Hora del cambio',
  deliverDate: 'Fecha entrega',
  deliverType: 'Tipo de entrega',
  realDeliverDate: 'Fecha real de entrega',
  startDate: 'Fecha incio',
  endDate: 'Fecha fin',
  editDate: 'Fecha modificación',
  consult: 'Consultar',
  options: 'Opciones',
  changeState: 'Cambiar estado',
  stateChange: 'Cambio de estado',
  generateReport: 'Generar reporte',
  filter: 'Filtro',
  order: 'Orden',
  orderState: 'Estado orden',
  dispatchDate: 'Fecha despacho',
  deliverStore: 'Almacen a entregar',
  value: 'Valor',
  orderNote: 'Nota pedido',
  orderNoteNumber: 'Consecutivo nota pedido',
  orderNoteState: 'Estado nota pedido',
  operator: 'Operador',
  conveyor: 'transportadora',
  integrationState: 'Estado de integración',
  integrationDate: 'Fecha de integración',
  purchaseOrderToEdit: 'Ordenes de compra a modificar',
  windowWillClose: 'Esta ventana se cerrará.',
  details: 'Detalles',
  clientData: 'Datos del Ciente',
  clientID: 'Cédula',
  client: 'Cliente',
  phone: 'Teléfono',
  address: 'Dirección',
  originAddress: 'Dirección origen',
  destinyAddress: 'Dirección destino',
  city: 'Ciudad',
  cities: 'Ciudades',
  deliveryData: 'Datos de entrega',
  deliveryAddress: 'Dirección de entrega',
  deliveryCity: 'Ciudad a entregar',
  guide: 'Guía',
  accomplished: 'Cumplido',
  orderData: 'Datos de la orden',
  orderNumber: 'Número de orden',
  sticker: 'Sticker',
  observations: 'Observaciones',
  skuList: 'Lista de SKU',
  sku: 'Sku',
  next: 'Siguiente',
  packConfig: 'Configuracion de Bultos',
  back: 'Volver',
  origin: 'Origen',
  originDeliverAddress: 'Direccion de Origen/Entrega',
  confirmGuideGeneration: 'Confirmar Generacion de Guia',
  generateGuide: 'Generar Guia',
  barCode: 'Código de barras',
  description: 'Descripción',
  family: 'Familia',
  store: 'Almacen',
  locality: 'Localidad',
  cancelationDate: 'Fecha de cancelación',
  spectedDeliverDate: 'Fecha esperada de recibo',
  cost: 'Costo',
  quantity: 'Cantidad',
  creationUser: 'Usuario creación',
  editUser: 'Usuario modificación',
  stateID: 'Estado ID',
  unities: 'Unidades',
  generatePackages: 'Generar Bultos',
  weight: 'Peso',
  volumne: 'Volumen',
  declared: 'Declarado',
  actions: 'Acciones',
  dateGuideGeneration: 'Fecha generación guía',
};

export const detailsTable = {
  FECHA_CREACION: strings.creationDate,
  NAME_FAMILIA: strings.family,
  ORG_NAME_FULL: strings.locality,
  ORIGEN_DESC: strings.origin,
  PMG_CANCEL_DATE: strings.cancelationDate,
  PMG_EXP_RCT_DATE: strings.spectedDeliverDate,
  PMG_SELL_COST: strings.cost,
  PMG_SELL_QTY: strings.quantity,
  PMG_STAT_NAME: strings.orderState,
  USR_CREACION: strings.creationUser,
  PRD_NAME_FULL: strings.description,
  FECHA_MODIFICACION: strings.editDate,
  USR_MODIFICACION: strings.editUser,
  PRD_LVL_NUMBER: strings.sku,
  PRD_UPC: strings.barCode,
  ESTADO: strings.state,
  PMG_SHIP_DATE: strings.dispatchDate,
  PMG_SHIP_DATE1: strings.deliverDate,
  FECHA_GENERAION_GUIA: strings.dateGuideGeneration,
  URL_GUIA: strings.guide,
  PMG_TOT_DTL_COST: null,
  ID_ESTADO: null,
  PMG_RETAIL: null,
  PMG_PAY_DATE: null,
  PMG_PACK_COST: null,
  PMG_PACK_QTY: null,
  PMG_STATUS: null,
  PMG_DTL_TYPE: null,
  ORG_LVL_CHILD: null,
  PMG_PO_NUMBER: null,
  PMG_SEQ_NUM: null,
  PMG_DTL_TECH_KEY: null
};

export const longMessages = {
  generateOrderGuideAlert:
    'Al continuar con el proceso de generación de guía, usted estará afectando los skus internos que conforman esta orden de compra.',
  generateOrderGuideTitle: 'Generación de guía para orden de compra',
  orderDetailTitle: 'Detalles de la orden de compra',
};
