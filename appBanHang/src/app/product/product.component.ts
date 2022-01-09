import { ProductService } from 'src/service/product.service';


import { NgxSpinnerService } from 'ngx-spinner';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/service/category.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { BaseCongif } from '../BaseConfig';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  form: any;
  Item:any= {
    id:'',
    name: '', //tên sản phẩm
    categoryId: '', //tên danh mục sản phẩm phẩm
    quantity:'', //số lượng
    price:'', //số tiền
    promotionalPrice:'', //giá khuyến mãi
    description:'', //mô tả
    content:'',
    star:0,
    namephysicRemove:'',
    isActive:false
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
  files: any[]=[]; //ảnh
  lstCategory:any;
  constructor(private toastr: ToastrService,private formBuilder: FormBuilder,private spinner: NgxSpinnerService,
    private productService:ProductService,private categoryService:CategoryService) { }

  ngOnInit() {
    this.spinner.show();
    this.form = this.formBuilder.group({
      name: [this.Item.name, Validators.compose([Validators.required])],
      categoryId: [this.Item.categoryId,[this.ValidCategory]],
      quantity: [this.Item.quantity,[Validators.required,this.ValidNumber]],
      price: [this.Item.price,[this.ValidNumber]],
      promotionalPrice: [this.Item.promotionalPrice,[this.ValidNumber]],
      description: [this.Item.description],
      content:[this.Item.description],
      star:[this.Item.star,[this.validStar]],
      isActive: [this.Item.isActive],
      id: [this.Item.id]
    });
    this.Search();
    this.getAllCategory();
    this.spinner.hide();
  }
  ValidCategory: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {

    return group.value!='' && typeof(group.value)=='string'?null:{ required: true };
  }
  //
  ValidNumber: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    if(group.value=='' || group.value==undefined){
      return null;
    }
    return /^\d+$/.test(group.value) ? null : { validNumber: true }
  }
  validStar: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    return null;
    if(group.value==''|| group.value==undefined){

    }
    if(/^\d+$/.test(group.value))
    {
      //hợp lệ
      let value=parseInt(group.value)
      if(value<0 || value>5){
        return { validRangeNumber: true };
      }
      return null;
    }
    else{
      return { validNumber: true };
    }
  }

  onSelectFile(event:any){

    this.files.push(...event.addedFiles);
  }

  onRemoveFile(event:any){
    if(event.id!=undefined){
      this.Item.namephysicRemove+=event.id+',';
    }
    this.files.splice(this.files.indexOf(event), 1);
  }

  Search(){

    this.spinner.show();
    this.productService.Search(this.Request).then((rs:any)=>{
      if(rs.status==0){
        this.Data=rs.data;
        this.total=rs.total;
        this.genArray();
      }

      this.spinner.hide();
    })
  }

  getAllCategory(){
    this.categoryService.GetAll().then((rs:any)=>{
      this.lstCategory=rs.data;
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
    this.productService.DeleteItem(this.ItemDelete).then((rs:any)=>{
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
    this.Item.name= ''; //tên sản phẩm
    this.Item.categoryId= ''; //tên danh mục sản phẩm phẩm
    this.Item.quantity=''; //số lượng
    this.Item.price=''; //số tiền
    this.Item.promotionalPrice=''; //giá khuyến mãi
    this.Item.description=''; //mô tả
    this.Item.content='';
    this.Item.star=0;
    this.Item.namephysicRemove='';
    this.Item.isActive=false
    this.files=[];
    this.form.touched=false;
  }

  Save(){
    let formData=new FormData();

    if(this.Item.id){

      for ( let i = 0; i < this.files.length; i++ ) {
        if(this.files[i].id){
          //xóa
          this.files.splice(i, 1);
        }
      }
    }
    for ( let i = 0; i < this.files.length; i++ ) {
      let file=this.files[i];
      formData.append( "files", file, file.name );
    }

    Object.entries(this.Item).forEach(
      ([key, value]) => {
        if(this.Item[key]==''){
          delete this.Item[key];
        }
      }
    );
    formData.append("product",JSON.stringify(this.Item));
    this.spinner.show();

    this.productService.AddOrUpdate(formData).then((rs:any)=>{
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

    this.spinner.show();
    this.productService.GetById(id).then(async (rs:any)=>{
    this.Item.id=rs.data.id;
    this.Item.name= rs.data.name; //tên sản phẩm
    this.Item.categoryId= rs.data.categoryId; //tên danh mục sản phẩm phẩm
    this.Item.quantity=rs.data.quantity; //số lượng
    this.Item.price=rs.data.price; //số tiền
    this.Item.promotionalPrice=rs.data.promotionalPrice; //giá khuyến mãi
    this.Item.description=rs.data.description; //mô tả
    this.Item.content=rs.data.content;
    this.Item.star=rs.data.star;
    this.Item.isActive=rs.data.isActive;

      for(let i=0;i<rs.data.productImage.length;i++){
        let item=rs.data.productImage[i];
        let url='/'+item.urlFile.replace('\\','/');
        let fullPathUrl=BaseCongif.UrlBaseAuthend+url;
        let response = await fetch(fullPathUrl);
        let data = await response.blob();
        let metadata = {
          type: item.contentType
        };
        let file = new File([data], item.name,metadata );
        Object.defineProperty(file, 'id', {
          value: item.id,
          writable: false
        });
        this.files.push(file);
      }
      document.getElementById('btnOpenModal')?.click();
      this.spinner.hide();
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

  ItemActive:string='';
  NotActive(event:any){
    this.ItemActive=event;
    document.getElementById('modalActive')?.click();
  }
  NotActiveUser(){
    this.productService.SetActive(this.ItemActive,false).then((rs:any)=>{
      if(rs.status==0){
        this.toastr.success(rs.message);
        this.Search();
        document.getElementById('btnCloseModalNotActive')?.click();
      }
      else{
        this.toastr.error(rs.message);
      }
    })
  }
  Active(event:any){
    this.ItemActive=event;
    document.getElementById('modalNotActive')?.click();
  }
  ActiveProduct()
  {
    this.productService.SetActive(this.ItemActive,true).then((rs:any)=>{
      if(rs.status==0){
        this.toastr.success(rs.message);
        this.Search();
        document.getElementById('btnCloseModalActive')?.click();
      }
      else{
        this.toastr.error(rs.message);
      }
    })
  }


  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '300px',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Vui lòng nhập mô tả...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadWithCredentials: false,
    sanitize: false,
    toolbarPosition: 'top',

};
}
