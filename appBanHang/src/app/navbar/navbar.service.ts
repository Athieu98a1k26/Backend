import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { BaseCongif } from '../BaseConfig';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private apiUrl=BaseCongif.UrlBase+"/Users/";

  constructor(private http: HttpClient,private cookieService: CookieService) {

  }


}
