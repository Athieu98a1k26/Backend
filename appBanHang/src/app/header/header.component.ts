import { HeaderService } from 'src/service/header.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BaseCongif } from '../BaseConfig';
import { BaseLocalStorage } from '../BaseLocalStorage';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  Item : any={
    userName:"",
    email:""
  }
  constructor(private headerService:HeaderService,private router: Router) { }

  ngOnInit() {
    this.headerService.GetInfo().then((rs:any)=>{
      if(rs.status==0){
        this.Item.userName=rs.data.userName;
        this.Item.email=rs.data.email;
      }

    })
  }
  Logout(){
    this.headerService.Logout().then((rs)=>{
      document.getElementById('BtnCancel')?.click();
      if(rs.status==0){
        let refreshToken= BaseLocalStorage.GetrefreshToken();
        let token=BaseLocalStorage.GetToken();
        if(refreshToken!=null){
          BaseLocalStorage.RemoverefreshToken();
        }
        if(token!=null){
          BaseLocalStorage.RemoveToken();
        }
        BaseLocalStorage.RemoveExpire();
        this.router.navigate(['/login']);
      }
    })
  }

}
