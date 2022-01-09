import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BaseCongif } from 'src/app/BaseConfig';
import { BaseLocalStorage } from 'src/app/BaseLocalStorage';


@Injectable({
  providedIn: 'root'
})
export class BaseService {
  constructor(public http: HttpClient,public router: Router,private spinner: NgxSpinnerService) {

  }
  private Base:string =BaseCongif.UrlBaseAuthend;
  protected GetHeader(token:string,refreshToken:string){
    //lấy token

    let headers = {
      //'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${token}`,
      'RefreshToken': refreshToken
    }
    //gửi xuống server để kiểm tra token
    return headers;
  }
  protected async HttpGet(url:string):Promise<any>{

      let refreshToken= BaseLocalStorage.GetrefreshToken();
      let token=BaseLocalStorage.GetToken();
      if(token==null){
        this.spinner.hide();
        return {
          status:401,
          message:'Không có quyền đăng nhập'
        };
      }

      let strExpire=BaseLocalStorage.GetExpire();
      let dateExpire=new Date(strExpire||'');
      let dateNow=new Date();
      if(dateExpire>dateNow){
        //vẫn còn hạn thì lấy token kia
      }
      else{
        //refresh token
        let rs=await this.http.get(this.Base+'/Auth/CheckAuthenticated',{headers:this.GetHeader(token||'',refreshToken||'')}).toPromise().then((rs:any)=>{
          return rs;
        });
        if(rs.data!=null){
          if(rs.data.status==2){
            token=rs.data.token;
            refreshToken=rs.data.refreshToken;
            BaseLocalStorage.SetToken(token||'');
            BaseLocalStorage.SetrefreshToken(refreshToken||'');
            BaseLocalStorage.SetExpire(rs.data.expire||'');
          }
          else if(rs.data.status==1){
            this.router.navigate(['/dang-nhap']);
            return {
              status:-1,
              message:'Không có quyền đăng nhập'
            };
          }
        }
      }



      return this.http.get(url,{headers:this.GetHeader(token||'','')}).toPromise().catch((rs:any)=>{
        this.spinner.hide();
        this.router.navigate(['/dang-nhap']);
        return {
          status:401,
          message:'Không có quyền đăng nhập'
        };
      });

  }



  protected async HttpPost(url:string,data:any):Promise<any>{

    let refreshToken= BaseLocalStorage.GetrefreshToken();
      let token=BaseLocalStorage.GetToken();
      if(token==null){
        this.spinner.hide();
        return {
          status:-1,
          message:'Không có quyền đăng nhập'
        };
      }

      let strExpire=BaseLocalStorage.GetExpire();
      let dateExpire=new Date(strExpire||'');
      let dateNow=new Date();
      if(dateExpire>dateNow){
        //vẫn còn hạn thì lấy token kia
      }
      else{
        //refresh token
        let rs=await this.http.get(this.Base+'/Auth/CheckAuthenticated',{headers:this.GetHeader(token||'',refreshToken||'')}).toPromise().then((rs:any)=>{
          return rs;
        });
        console.log(rs);
        if(rs.data!=null){
          if(rs.data.status==2){
            token=rs.data.token;
            refreshToken=rs.data.refreshToken;
            BaseLocalStorage.SetToken(token||'');
            BaseLocalStorage.SetrefreshToken(refreshToken||'');
            BaseLocalStorage.SetExpire(rs.data.expire||'');
          }
          else if(rs.data.status==1){
            this.router.navigate(['/dang-nhap']);
            return {
              status:401,
              message:'Không có quyền đăng nhập'
            };
          }
        }
      }


      return this.http.post(url,data,{headers:this.GetHeader(token||'','')}).toPromise().catch((rs:any)=>{
        this.spinner.hide();
        this.router.navigate(['/dang-nhap']);
        return {
          status:401,
          message:'Không có quyền đăng nhập'
        };
      });

  }
}
