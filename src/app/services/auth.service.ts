import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthenticationRequest} from "../models/AuthenticationRequest";
import {AuthenticationRespons} from "../models/authentication-response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userPlayload:any;
  constructor(private http: HttpClient) {
    this.userPlayload=this.decodedToken();
    }
  private jwtHelper:JwtHelperService= new JwtHelperService();
  private baseUrl : string ='http://localhost:8082/api/auth/login'
  login(authRequest:AuthenticationRequest) {
    return this.http.post<AuthenticationRespons>(`${this.baseUrl}`,authRequest);
    }

  getToken() {
    return localStorage.getItem('token')
    }

  decodedToken() {
    const token= this.getToken()!;
    return this.jwtHelper.decodeToken(token);
    }

  createAuthorization() {
    let authHeader= new HttpHeaders();
    const token= this.getToken();
    if(token) {
      authHeader= authHeader.set('Authorization','Bearer'+token);
      }
    return authHeader;
    }

  getLoggedUser() {
    if (this.userPlayload) {
      return this.userPlayload
      }
    }

}
