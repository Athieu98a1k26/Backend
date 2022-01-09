import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BannerService } from 'src/service/banner.service';
import { BaseCongif } from '../BaseConfig';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  form: any;
  Item:any= {
    id:'',
    url: '',
    position:''
  };
  Data:any;
  total:number=0;
  HtmlPagination:string='';
  Request:any={
    keyword:'',
    page:1,
    take:5

  };
  files:File[]=[];
  totalArray:Array<number>=[];
  pageLast:number=0;
  ItemDelete:string='';
  constructor(private toastr: ToastrService,private formBuilder: FormBuilder,private spinner: NgxSpinnerService,
    private bannerService:BannerService) { }

  ngOnInit() {
    this.spinner.show();
    this.form = this.formBuilder.group({
      url: [this.Item.url, Validators.compose([Validators.required])],
      id: [this.Item.id],
      position: [this.Item.position]
    });
    this.Search();
    this.spinner.hide();
  }

  onSelectFile(event:any){
    this.files=[];
    this.files.push(...event.addedFiles);
  }

  onRemoveFile(event:any){

    this.files=[];
  }
  Search(){

    this.spinner.show();
    this.bannerService.Search(this.Request).then((rs:any)=>{
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
    this.bannerService.DeleteItem(this.ItemDelete).then((rs:any)=>{
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
    this.Item.url='';
    this.Item.position='';
    this.files=[];
    this.form.touched=false;
  }

  Save(){
    if(this.files.length==0){
      this.toastr.error("Vui lòng chọn ảnh banner");
      return;
    }
    let formData=new FormData();
    for ( let i = 0; i < this.files.length; i++ ) {
      let file=this.files[i];
      formData.append( "file", file, file.name );
    }
    Object.entries(this.Item).forEach(
      ([key, value]) => {
        if(this.Item[key]==''){
          delete this.Item[key];
        }
      }
    );
    formData.append("banner",JSON.stringify(this.Item));

    this.spinner.show();
    this.bannerService.AddOrUpdate(formData).then((rs:any)=>{
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
    this.bannerService.GetById(id).then(async (rs:any)=>{
      this.Item.id=rs.data.id;
      this.Item.url=rs.data.url;
      this.Item.position=rs.data.position;
      let item=rs.data;
        let url='/'+item.urlFile.replace('\\','/');
        let fullPathUrl=BaseCongif.UrlBaseAuthend+url;
        let response = await fetch(fullPathUrl,{mode: 'cors'});
        let data = await response.blob();
        let metadata = {
          type: item.contentType
        };
        let file = new File([data], item.name,metadata );
        this.files.push(file);
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
