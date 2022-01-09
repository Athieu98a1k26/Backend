import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseCongif } from 'src/app/BaseConfig';
import { BaseLocalStorage } from 'src/app/BaseLocalStorage';
import { BaseService } from 'src/service/base.service';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService extends BaseService{
  private apiUrl=BaseCongif.UrlBaseAuthend+"/Auth/";


  CheckAuthenticated(){
    let refreshToken= BaseLocalStorage.GetrefreshToken();
    let token=BaseLocalStorage.GetToken();
    return this.http.get(this.apiUrl+'CheckAuthenticated',{headers:this.GetHeader(token||'',refreshToken||'')}).toPromise();
  }

  isLoggedIn()
  {
    let refreshToken= localStorage.getItem('refreshToken');
    let token=localStorage.getItem('token');
    if(token==null){
      //token là rỗng
      //chuyển về trang login

      return false;
    }
    if(refreshToken==null){
      refreshToken='';
    }
    return this.CheckAuthenticated().then((rs:any)=>{
      if(rs.status==0){
        return true;
      }
      return false;
    });

  }
}
