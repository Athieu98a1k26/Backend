import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgotPassword',
  templateUrl: './forgotPassword.component.html',
  styleUrls: ['./forgotPassword.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //thêm class body
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('bg-gradient-primary');
  }

}
