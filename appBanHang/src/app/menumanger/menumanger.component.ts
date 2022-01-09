import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { MenumanagerService } from './../../service/menumanager.service';
import {Component, OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
@Component({
  selector: 'app-menumanger',
  templateUrl: './menumanger.component.html',
  styleUrls: ['./menumanger.component.css']
})
export class MenumangerComponent implements OnInit {
  form: any;
  Item:any= {
    id:'',
    name: '',
    url:'',
    indexMenu:0
  };
  Data:any;
  total:number=0;
  HtmlPagination:string='';
  Request:any={
    keyword:'',
    page:1,
    take:5

  }
  totalArray:Array<number>=[];
  pageLast:number=0;
  ItemDelete:string='';
  constructor(private toastr: ToastrService,private formBuilder: FormBuilder,private spinner: NgxSpinnerService
    ,private menumanagerService:MenumanagerService) { }

  ngOnInit() {
    this.spinner.show();
    this.form = this.formBuilder.group({
      name: [this.Item.name, Validators.compose([Validators.required])],
      url: [this.Item.url],
      indexMenu: [this.Item.indexMenu,[this.ValidNumber]],
      id: [this.Item.id]
    });
    this.Search();
    this.spinner.hide();
  }
  ValidNumber: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    if(group.value==''){

      return null;
    }
    return /^\d$/.test(group.value) ? null : { Errornumber: true }
  }
  Search(){

    this.spinner.show();
    this.menumanagerService.Search(this.Request).then((rs:any)=>{
      if(rs.status==0){
        this.Data=rs.data;
        this.total=rs.total;
        this.genArray();
      }

      this.spinner.hide();
    })
  }

  onKeyUpSearch(event:any){
    this.Request.keyword=event.target.value;
  }
  OpenModalDelete(id:string)
  {
    this.ItemDelete=id;
    document.getElementById('modalDelete')?.click();
  }
  onDeleteItem()
  {
    this.spinner.show();
    document.getElementById('btnCloseModalDelete')?.click();
    this.menumanagerService.DeleteItem(this.ItemDelete).then((rs:any)=>{
      if(rs.status==0){
        this.toastr.success(rs.message);
        this.Search();
      }
      else{
        this.toastr.error(rs.message);
      }
      this.spinner.hide();
    })
  }

  resetControl(){
    this.Item.id='';
    this.Item.name='';
    this.Item.url='';
    this.Item.indexMenu=0;
    this.form.touched=false;
  }

  Save(){
    if(this.Item.indexMenu==''){
      this.Item.indexMenu=0;
    }
    this.spinner.show();
    this.menumanagerService.AddOrUpdate(this.Item).then((rs:any)=>{
      if(rs.status==0){
        this.toastr.success(rs.message);
        document.getElementById('btnClose')?.click();
        this.resetControl();
        this.Search();

      }
      else{
        this.toastr.error(rs.message);
      }
      this.spinner.hide();
    })
  }

  Edit(id:string){
    this.menumanagerService.GetByIdItem(id).then((rs:any)=>{
      this.Item.id=rs.data.id;
      this.Item.name=rs.data.name;
      this.Item.url=rs.data.url;
      this.Item.indexMenu=rs.data.indexMenu;
      document.getElementById('btnOpenModal')?.click();
    })
  }

  genArray()
  {
    this.pageLast=Math.ceil(this.total / this.Request.take);
    this.totalArray=[];
    let maxPageRender:number=this.Request.page + 2 > Math.ceil(this.total / this.Request.take) ? Math.ceil(this.total / this.Request.take) : this.Request.page + 2;
    let minPageRender:number=this.Request.page - 2 < 1 ? 1 : this.Request.page - 2;
    for(let i=minPageRender;i<=maxPageRender;i++){
      this.totalArray.push(i);
    }
  }

  onPaginationChange(page:number){
    this.Request.page=page;
    this.Search();
  }
}
