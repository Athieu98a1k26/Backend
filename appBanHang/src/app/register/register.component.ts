import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from './register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any;
  Item:any= {
    UserName: '',
    Email: '',
    PhoneNumber:'',
    PassWord: '',
    RePassWord: ''
  };
  IsSave:boolean=false;
  constructor(private toastr: ToastrService,private formBuilder: FormBuilder,private spinner: NgxSpinnerService,private router: Router,private registerService: RegisterService) { }

  ngOnInit() {
    this.IsSave=false;
    this.form = this.formBuilder.group({
      UserName: [this.Item.UserName, [Validators.required]],
      Email: [this.Item.Email, [Validators.required,Validators.email]],
      PhoneNumber: [this.Item.PhoneNumber, [Validators.required]],
      PassWord: [this.Item.PassWord, [Validators.required]],
      RePassWord: [this.Item.RePassWord,[Validators.required]],
    },{ validators: this.checkPasswords });

  }


checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {

  let pass = group.root.value.PassWord;
  let confirmPass = group.root.value.RePassWord;
  return pass === confirmPass ? null : { notSame: true }
}
  //hàm lưu
  Save(){
    this.IsSave=true;
    if (this.form.invalid) {
      return;
    }
    this.spinner.show();
    //gọi xuống server
    this.registerService.Register(this.Item).subscribe((rs:any)=>{
      console.log(rs);
      if(rs.status==0){
        this.toastr.success(rs.message);

        this.router.navigate(["/login"]);
      }
      else{
        this.toastr.error(rs.message);
      }
      this.spinner.hide();


    })


  }
}
