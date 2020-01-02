import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public host: string = "http://localhost:8086";
  public jwt: string;
  private username: string;
  private roles: Array<string>;
  constructor(private httpClient: HttpClient) {

  }

  public login(data) {
    return this.httpClient.post(this.host + "/login", data, { observe: 'response' });
  }

  public saveToken(jwt) {
    localStorage.setItem('token', jwt);
    this.jwt = jwt;
    this.parseJWT();
  }

  parseJWT() {
    let jwtHelper = new JwtHelperService();
    let objJwt = jwtHelper.decodeToken(this.jwt);
    this.username = objJwt.obj;
    this.roles = objJwt.roles;
  }

  isAdmin() {
    return this.roles.indexOf('ADMIN') >= 0;
  }

  isUser() {
    return this.roles.indexOf('USER') >= 0;
  }

  isAuthentificated() {
    return this.roles != undefined;
  }

  loadToken() {
    this.jwt = localStorage.getItem('token');
    this.parseJWT();
  }
  logOut() {
    localStorage.removeItem('token');
    this.initParams();
  }

  initParams() {
    this.jwt = undefined;
    this.username = undefined;
    this.roles = undefined;
  }

  getAllUsers() {
    let headers = new HttpHeaders({ 'authorization': 'Bearer' + this.jwt });
    return this.httpClient.get(this.host + '/appUsers', { headers: headers });
  }
  getAllRoles() {
    let headers = new HttpHeaders({ 'authorization': 'Bearer' + this.jwt });
    return this.httpClient.get(this.host + '/appRoles', { headers: headers });
  }

  public getRessource(url) {
    let headers = new HttpHeaders({ 'authorization': 'Bearer' + this.jwt });
    return this.httpClient.get(url, { headers: headers });
  }
  public postRessource(url, data) {
    let headers = new HttpHeaders({ 'authorization': 'Bearer' + this.jwt });
    return this.httpClient.post(url, data, { headers: headers });
  }

  public deleteRessource(url) {
    let headers = new HttpHeaders({ 'authorization': 'Bearer' + this.jwt });
    return this.httpClient.delete(url, { headers: headers });
  }


}
