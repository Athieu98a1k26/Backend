import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseCongif } from 'src/app/BaseConfig';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService extends BaseService{

  private apiUrl=BaseCongif.UrlBase+"/Users/";
  private apiUrlAuth=BaseCongif.UrlBaseAuthend+"/Auth/";
  GetInfo() :Promise<any>{
      let url=this.apiUrl+"GetInfo";
      return this.HttpGet(url)
  }
  Logout():Promise<any>{
    let refreshToken= localStorage.getItem('refreshToken');

    if(refreshToken==null){
      this.router.navigate(['/login']);
    }
    let url=this.apiUrlAuth+"Logout";
    return this.HttpPost(url,{"Token":refreshToken});
}
}
