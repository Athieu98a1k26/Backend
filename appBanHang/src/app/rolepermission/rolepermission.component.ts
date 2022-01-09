import { RolepermissionService } from './../../service/rolepermission.service';

import { PermissionsService } from './../../service/permissions.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from 'src/service/role.service';
@Component({
  selector: 'app-rolepermission',
  templateUrl: './rolepermission.component.html',
  styleUrls: ['./rolepermission.component.css']
})
export class RolepermissionComponent implements OnInit {
  form: any;
  Item:any= {
    Id:'',
    RoleId:{},
    PermissionId:{},

  };
    //list chức vụ
    lstRole:any;
    lstPermission:any;
    //danh sách selected
  Data:any;
  total:number=0;
  Request:any={
    keyword:'',
    page:1,
    take:5
  }
  totalArray:Array<number>=[];
  pageLast:number=0;
  ItemDelete:string='';



  constructor(private toastr: ToastrService,private formBuilder: FormBuilder,private spinner: NgxSpinnerService,
    private roleService:RoleService,private permissionsService:PermissionsService,private rolepermissionService:RolepermissionService) { }

  ngOnInit() {
    this.spinner.show();
    this.getAllRole();
    this.getAllPermission();
    this.form = this.formBuilder.group({
      RoleId: [this.Item.RoleId, Validators.compose([this.ValidRole])],
      PermissionId: [this.Item.PermissionId, Validators.compose([this.ValidPermission])],
      Id: [this.Item.Id],
    });

    this.Search();

    this.spinner.hide();
  }
  ValidRole: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    return group.value!='' && typeof(group.value)=='string'?null:{ required: true };
  }
  ValidPermission: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    return group.value.length>0?null:{ required: true };
  }
  getAllRole()
  {
    this.roleService.GetAll().then((rs:any)=>{
      if(rs.status==0){
        this.lstRole=rs.data;
      }

    })

  }
  getAllPermission()
  {
    this.permissionsService.GetAll().then((rs:any)=>{
      if(rs.status==0){
        this.lstPermission=rs.data;
      }

    })

  }


  Search(){
    this.spinner.show();
    this.rolepermissionService.Search(this.Request).then((rs:any)=>{
      if(rs.status==0){
        this.Data=rs.data;
        this.total=rs.total;
        this.genArray();
      }

      this.spinner.hide();
    })
  }

  //lấy danh sách các quyền



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
    this.rolepermissionService.DeleteItem(this.ItemDelete).then((rs:any)=>{
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
    this.Item.RoleId={};
    this.Item.PermissionId={};
    this.form.touched=false;
  }


  Save(){
    this.Item.PermissionId=this.Item.PermissionId.toString();
    this.spinner.show();
    this.rolepermissionService.AddOrUpdate(this.Item).then((rs:any)=>{
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
    this.rolepermissionService.GetByIdItem(id).then((rs:any)=>{
      this.Item.Id=rs.data.id;
      this.Item.RoleId=rs.data.roleId;
      this.Item.PermissionId=rs.data.permissionId.split(',');

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
