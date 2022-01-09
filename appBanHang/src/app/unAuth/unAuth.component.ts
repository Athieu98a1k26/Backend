import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-unAuth',
  templateUrl: './unAuth.component.html',
  styleUrls: ['./unAuth.component.css']
})
export class UnAuthComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService){}

  ngOnInit() {
    this.spinner.hide();
  }

}
