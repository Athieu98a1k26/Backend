import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  form: any;
  Item:any= {
    id:'',
    name: '',
    categoryParentId:''
  };
  Data:any;
  total:number=0;
  HtmlPagination:string='';
  Request:any={
    keyword:'',
    page:1,
    take:5

  }
  lstCategory:any;
  totalArray:Array<number>=[];
  pageLast:number=0;
  ItemDelete:string='';
  constructor(private toastr: ToastrService,private formBuilder: FormBuilder,private spinner: NgxSpinnerService
    ,private categoryService:CategoryService) { }

  ngOnInit() {
    this.spinner.show();
    this.form = this.formBuilder.group({
      name: [this.Item.name, Validators.compose([Validators.required])],
      categoryParentId: [this.Item.categoryParentId],
      id: [this.Item.id]
    });
    this.Search();
    this.spinner.hide();
  }

  Search(){

    this.spinner.show();
    this.categoryService.Search(this.Request).then((rs:any)=>{
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
    this.categoryService.DeleteItem(this.ItemDelete).then((rs:any)=>{
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
    this.Item.categoryParentId='';
    this.form.touched=false;
  }
  OpenModal(){
    this.getAllCategory('');
  }
  getAllCategory(idRemove:string){
    this.lstCategory=[];
    this.categoryService.GetAll().then((rs:any)=>{
      this.lstCategory=rs.data;
      if(idRemove!=''){
        for(let i=0;i<this.lstCategory.length;i++){
          if (this.lstCategory[i].id==idRemove) {
            this.lstCategory.splice(i, 1);
            break;
          }
        }
      }

    })
  }

  Save(){
    Object.entries(this.Item).forEach(
      ([key, value]) => {
        if(this.Item[key]==''){
          delete this.Item[key];
        }
      }
    );
    this.spinner.show();
    this.categoryService.AddOrUpdate(this.Item).then((rs:any)=>{
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
    this.getAllCategory(id);
    this.categoryService.GetByIdItem(id).then((rs:any)=>{
      this.Item.id=rs.data.id;
      this.Item.name=rs.data.name;
      this.Item.categoryParentId=rs.data.categoryParentId;

      document.getElementById('btnOpenModalEdit')?.click();
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
