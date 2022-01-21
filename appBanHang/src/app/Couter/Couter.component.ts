import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-Couter',
  templateUrl: './Couter.component.html',
  styleUrls: ['./Couter.component.css']
})
export class CouterComponent implements OnInit {

  @Input() countItem:number=1;
  @Input() quantity:number=1;
  @Input() identity:string='';
  @Output() OnChangeCouter = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  ADD() {
    if (this.countItem == this.quantity) {
      return;
    }
    this.countItem++;
    let dataEmit:any={
      countItem:this.countItem+'',
      identity:this.identity
    }
    this.OnChangeCouter.emit(dataEmit);
  }
  SetCountItem($event: any) {
    if (isNaN($event.target.value) || $event.target.value == '') {
      $event.target.value = this.countItem;
      return;
    }
    let number = parseInt($event.target.value);
    if (number >= this.quantity) {

      this.countItem = this.quantity;
      $event.target.value = this.countItem;
    }
    else {
      this.countItem = number;
    }

    let dataEmit:any={
      countItem:this.countItem+'',
      identity:this.identity
    }
    this.OnChangeCouter.emit(dataEmit);
  }
  MINUS() {
    if (this.countItem == 1) {
      return;
    }
    this.countItem--;
    let dataEmit:any={
      countItem:this.countItem+'',
      identity:this.identity
    }
    this.OnChangeCouter.emit(dataEmit);
  }

}
