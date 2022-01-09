import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseCongif } from '../BaseConfig';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl=BaseCongif.UrlBase+"/Auth/";

  constructor(private http: HttpClient) {

  }
  Register(data: any): Observable<any> {
      return this.http.post(this.apiUrl+"Register", data);
  }

}
