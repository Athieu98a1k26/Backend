import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() page:number=0;
  @Input() take:number=0;
  @Input() total:number=0;
  @Input() totalArray:any= [];
  @Input() pageLast:number=0;
  @Output() onPaginationChange = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  getDataPage(page:number){
    this.onPaginationChange.emit(page);
  }
}
