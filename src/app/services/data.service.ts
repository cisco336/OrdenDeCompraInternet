import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DataService {
  // API Local
  // API = "http://localhost/Abastecimiento/Servicios/OrdenCompra/api";

  // API INTERNA
  // DEV
  // API = "http://10.23.14.95:8996/Servicios/HUB_OC_2.0.0/";

  // QA
  API = "http://10.23.14.94:8996/Servicios/HUB_OC_2.0.0/";

  // PROD
  // API = "http://10.23.14.164:8996/Servicios/HUB_OC_2.0.0/";

  // API Externa Azure
  // API = "https://apim-dev-proxy.sodhc.co/inventario/api";
  // API = "https://apim-qa-proxy.sodhc.co/inventario/api"
  // API = "https://apim-prod-proxy.sodhc.co/inventario/api";

  // AUTH = "https://apim-dev-proxy.sodhc.co/logisticaSeguridadAutenticacion/authenticated";
  // AUTH = "https://apim-qa-proxy.sodhc.co/logisticaSeguridadAutenticacion/authenticated";
  AUTH =
    "https://apim-prod-proxy.sodhc.co/logisticaSeguridadAutenticacion/authenticated";

  // Subscription keys
  // DEV
  // subscriptionKey = "dfeb9e69860f45258647cc7ba45fb040";
  // QA
  subscriptionKey = "442c55ae313642028c9eb69dc4220dad";
  // PROD
  // subscriptionKey = "209fa70e5b0c4b5c8bddaf0aa54b8e19";

  token = new BehaviorSubject<string>("");

  // Calls
  getDatosProveedorCall = "/Configuracion/GetDatosProveedor";
  getProveedoresCall = "/Configuracion/GetProveedores";
  getEstadosCall = "/Configuracion/GetEstados";
  postTablaPrincipalOCCall = "/Configuracion/GetOc";

  constructor(private http: HttpClient) {}

  protected generateBasicHeadersJWT(): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": this.subscriptionKey,
      Authorization: "Bearer " + this.token.value
    });
  }

  getDatosProveedor(data) {
    return this.http.get(this.API + this.getDatosProveedorCall + "/" + data, {
      headers: this.generateBasicHeadersJWT()
    });
  }

  getProveedores() {
    return this.http.get(this.API + this.getProveedoresCall, {
      headers: this.generateBasicHeadersJWT()
    });
  }

  getEstados() {
    return this.http.get(this.API + this.getEstadosCall, {
      headers: this.generateBasicHeadersJWT()
    });
  }

  postTablaPrincipalOC(data) {
    return this.http.post(this.API + this.postTablaPrincipalOCCall, data, {
      headers: this.generateBasicHeadersJWT()
    });
  }

  setToken(data) {
    this.token.next(data);
  }
}
