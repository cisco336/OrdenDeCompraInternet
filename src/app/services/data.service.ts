import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // API Externa Azure
  API = "https://apim-dev-proxy.sodhc.co/inventario/api";
  // API = "https://apim-qa-proxy.sodhc.co/inventario/api"
  // API = "https://apim-prod-proxy.sodhc.co/inventario/api";

  // AUTH = "https://apim-dev-proxy.sodhc.co/logisticaSeguridadAutenticacion/authenticated";
  // AUTH = "https://apim-qa-proxy.sodhc.co/logisticaSeguridadAutenticacion/authenticated";
  AUTH = "https://apim-prod-proxy.sodhc.co/logisticaSeguridadAutenticacion/authenticated";

  // Subscription keys
  // DEV
  subscriptionKey = "dfeb9e69860f45258647cc7ba45fb040";
  // QA
  // subscriptionKey = "442c55ae313642028c9eb69dc4220dad";
  // PROD
  // subscriptionKey = "209fa70e5b0c4b5c8bddaf0aa54b8e19";

  token = new BehaviorSubject<string>("");

  // Calls
  getDatosProveedorCall = "/Configuracion/GetDatosProveedor"; 

  constructor(private http: HttpClient) { }

  protected generateBasicHeadersJWT(): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": this.subscriptionKey,
      "Authorization": "Bearer " + this.token.value,
    });
  }

  getDatosProveedor(data) {
    return this.http.get(this.API + this.getDatosProveedorCall + '/' + data, {
      headers: this.generateBasicHeadersJWT()
    })
  }

  setToken(data) {
    this.token.next(data);
  }
}
