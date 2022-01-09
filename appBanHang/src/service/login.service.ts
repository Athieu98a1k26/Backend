import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseCongif } from 'src/app/BaseConfig';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl=BaseCongif.UrlBaseAuthend+"/Auth/";

  constructor(private http: HttpClient) {

  }
  Login(data: any): Promise<any> {
      return this.http.post(this.apiUrl+"Login", data).toPromise();
  }

}
