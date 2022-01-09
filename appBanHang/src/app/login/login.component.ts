
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/service/login.service';
import { BaseLocalStorage } from '../BaseLocalStorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any;
  Item: any = {
    email: '',
    password: '',
  };
  Url:string='';
  IsSave: boolean = false;
  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private router: Router,
    private loginService:LoginService
  ) {}

  ngOnInit() {
    this.spinner.hide();
    //thêm class body
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('bg-gradient-primary');
    //this.route.params.subscribe((params: Params) => this.Url = decodeURIComponent(params['url']));
    this.IsSave = false;
    this.form = this.formBuilder.group({
      email: [this.Item.email, [Validators.required]],
      password: [this.Item.password, [Validators.required]],
    });
    // let refreshToken= BaseLocalStorage.GetrefreshToken();
    // let token=BaseLocalStorage.GetToken();
    // let expire=BaseLocalStorage.GetExpire();
    // if(refreshToken!=null){
    //   BaseLocalStorage.RemoverefreshToken();
    // }
    // if(token!=null){
    //   BaseLocalStorage.RemoveToken();
    // }
    // if(expire!=null){
    //   BaseLocalStorage.RemoveExpire();
    // }
  }
  Save() {
    this.IsSave = true;
    if (this.form.invalid) {
      return;
    }
    this.spinner.show();
    this.loginService.Login(this.Item).then((rs:any)=>{
      if(rs.status==0)
      {
        this.toastr.success(rs.message);
        if(BaseLocalStorage.GetToken()!=null){
          BaseLocalStorage.RemoveToken();
        }
        if(BaseLocalStorage.GetrefreshToken()!=null){
          BaseLocalStorage.RemoverefreshToken()
        }
        if(BaseLocalStorage.GetExpire()!=null){
          BaseLocalStorage.RemoveExpire()
        }
        BaseLocalStorage.SetToken(rs.data.token);
        BaseLocalStorage.SetrefreshToken(rs.data.refreshToken);
        BaseLocalStorage.SetExpire(rs.data.expire);
        if(this.Url==''){
          this.router.navigate(['/main/dashboard']);
        }
        else{
          this.router.navigate([this.Url]);
        }
      }
      else{
        this.toastr.error(rs.message);
      }
      this.spinner.hide();
    });
  }

}
