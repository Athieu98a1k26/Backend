import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserPhoneFeedbackService } from 'src/service/UserPhoneFeedback.service';

@Component({
  selector: 'app-custommer',
  templateUrl: './custommer.component.html',
  styleUrls: ['./custommer.component.css']
})
export class CustommerComponent implements OnInit {

  form: any;
  Item:any= {
    Id:'',
    name: '',
    description: ''
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
  constructor(private toastr: ToastrService,private formBuilder: FormBuilder,private spinner: NgxSpinnerService,
    private userPhoneFeedbackService:UserPhoneFeedbackService) { }

  ngOnInit() {
    this.spinner.show();
    this.form = this.formBuilder.group({
      name: [this.Item.name, Validators.compose([Validators.required])],
      description: [this.Item.description],
      Id: [this.Item.Id]
    });
    this.Search();
    this.spinner.hide();
  }

  Search(){

    this.spinner.show();
    this.userPhoneFeedbackService.Search(this.Request).then((rs:any)=>{
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
    this.userPhoneFeedbackService.DeleteItem(this.ItemDelete).then((rs:any)=>{
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
    this.Item.Id='';
    this.Item.name='';
    this.Item.description='';
    this.form.touched=false;
  }

  Save(){
    this.spinner.show();
    this.userPhoneFeedbackService.AddOrUpdate(this.Item).then((rs:any)=>{
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
    this.userPhoneFeedbackService.GetByIdItem(id).then((rs:any)=>{
      this.Item.Id=rs.data.id;
      this.Item.name=rs.data.name;
      this.Item.description=rs.data.description;
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
