import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-notFound',
  templateUrl: './notFound.component.html',
  styleUrls: ['./notFound.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService){}

  ngOnInit() {
    this.spinner.hide();
  }

}
