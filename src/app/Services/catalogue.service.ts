import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  public host = 'http://localhost:8080';

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) { }

  public getAllCtategories() {
    return this.httpClient.get(this.host + '/categories');
  }
  
  public getAllProduits() {
    return this.httpClient.get(this.host + '/products');
  }
  public getRessource(url) {
    return this.httpClient.get(url);
  }
  public deleteRessource(url) {
    let headers = new HttpHeaders({ 'authorization': 'Bearer' + this.authService.jwt });
    return this.httpClient.delete(url, { headers: headers });
  }

  public postRessource(url, data) {
    let headers = new HttpHeaders({ 'authorization': 'Bearer' + this.authService.jwt });
    return this.httpClient.post(url, data, { headers: headers });
  }

  public putRessource(url, data) {
    let headers = new HttpHeaders({ 'authorization': 'Bearer' + this.authService.jwt });
    return this.httpClient.put(url, data, { headers: headers });
  }

  public pathRessource(url, data) {
    let headers = new HttpHeaders({ 'authorization': 'Bearer' + this.authService.jwt });
    return this.httpClient.patch(url, data, { headers: headers });
  }
}
