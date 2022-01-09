import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  @Output() onDelete = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onDelteItem()
  {
    this.onDelete.emit();
  }

}
