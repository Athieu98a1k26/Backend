import { ProvinceService } from './../../service/Province.service';
import { UsermanagerService } from './../../service/usermanager.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from 'src/service/role.service';

@Component({
  selector: 'app-usermanager',
  templateUrl: './usermanager.component.html',
  styleUrls: ['./usermanager.component.css']
})
export class UsermanagerComponent implements OnInit {

  form: any;
  formRole: any;
  //item của user
  Item:any= {
    id:'',
    userName:'',
    passWord: '',
    phoneNumber: '',
    email:'',
    provinceId:'',
    districtId:'',
    address:'',
    sex:1,
    isActive:false,
  };

  ItemUserRole:any={
    id:'',
    userId:'',
    roleId:'',
  }

  Data:any;
  total:number=0;
  //data tỉnh
  lstProvinceId:any;
  //data huyện
  lstDistrictId:any;
  //danh sách chức vụ
  lstRole:any

  Request:any={
    keyword:'',
    page:1,
    take:5

  }
  totalArray:Array<number>=[];
  pageLast:number=0;
  ItemDelete:string='';
  constructor(private toastr: ToastrService,private formBuilder: FormBuilder,private spinner: NgxSpinnerService,
    private roleService:RoleService,private usermanagerService:UsermanagerService,private provinceService:ProvinceService) { }

  ngOnInit() {
    this.spinner.show();
    ///form của user
    this.form = this.formBuilder.group({
      id:[this.Item.id],
      userName: [this.Item.userName, Validators.compose([Validators.required])],
      passWord: [this.Item.passWord, Validators.compose([Validators.required])],
      phoneNumber: [this.Item.phoneNumber,[this.ValidNumberPhone]],
      email:[this.Item.email,[Validators.required,Validators.email]],
      provinceId:[this.Item.provinceId],
      districtId:[this.Item.districtId],
      address:[this.Item.address],
      sex:[this.Item.address],
      isActive:[this.Item.isActive]
    });

    this.formRole = this.formBuilder.group({
      id:[this.ItemUserRole.id],
      userId: [this.ItemUserRole.userId],
      roleId: [this.ItemUserRole.roleId, Validators.compose([Validators.required])],
    });


    this.Search();
    this.GetDataProvinceId();
    this.spinner.hide();
  }
  ValidNumberPhone: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    if(group.value==''){
      return null;
    }
    return /(0[3|5|7|8|9])+([0-9]{8})\b/.test(group.value) ? null : { PhoneError: true }
  }
  //lấy danh sách thành phố
  GetDataProvinceId(){
    let data={
      "depth": 0
    }
    this.provinceService.SearchNotpagination(data).then((rs:any)=>{
      this.lstProvinceId=rs.data;
    })
  }
  //lấy quận huyện
  getDistrictByProvince(event:any){
    let data={
      "parentId": event.id,
      "depth": 1
    }
    this.provinceService.SearchNotpagination(data).then((rs:any)=>{
      this.lstDistrictId=rs.data;
    })
  }
  //lấy xã phường
  // getCommuneByDistrict(event:any){
  //   let data={
  //     "parentId": event.id,
  //     "depth": 2
  //   }
  //   this.provinceService.SearchNotpagination(data).then((rs:any)=>{
  //     this.lstCommuneId=rs.data;
  //   })
  // }

  //tìm kiếm
  Search(){
    this.spinner.show();
    this.usermanagerService.Search(this.Request).then((rs:any)=>{
      if(rs.status==0){
        this.Data=rs.data;
        this.total=rs.total;
        this.genArray();
      }

      this.spinner.hide();
    })
  }


  //lấy danh sách role
  SetRole(userId:string){
    document.getElementById('modalRoleUser')?.click();

    this.roleService.GetAll().then((rs:any)=>{
      this.lstRole=rs.data;
    })
  }

  resetControlRoleUser(){
    this.ItemUserRole.id='';
    this.ItemUserRole.userId='';
    this.ItemUserRole.roleId='';
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
    this.usermanagerService.DeleteItem(this.ItemDelete).then((rs:any)=>{
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
    this.Item.userName='';
    this.Item.phoneNumber='';
    this.Item.email='';
    this.Item.provinceId='';
    this.Item.districtId='';
    this.Item.pommuneId='';
    this.Item.passWord='';
    this.Item.sex=1;
    this.Item.isActive=false;
    this.form.touched=false;

  }

  Save(){
    this.spinner.show();
    this.usermanagerService.AddOrUpdate(this.Item).then((rs:any)=>{
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

  ItemActive:string='';
  NotActive(event:any){
    this.ItemActive=event;
    document.getElementById('modalActive')?.click();
  }
  NotActiveUser(){
    this.usermanagerService.SetActive(this.ItemActive,false).then((rs:any)=>{
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
  ActiveUser()
  {
    this.usermanagerService.SetActive(this.ItemActive,true).then((rs:any)=>{
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
  Edit(id:string){
    this.form.touched=false;
    this.usermanagerService.GetByIdItem(id).then((rs:any)=>{
      this.Item.id=rs.data.id;
      this.Item.userName=rs.data.userName;
      this.Item.phoneNumber=rs.data.phoneNumber;
      this.Item.email=rs.data.email;
      this.Item.provinceId=rs.data.provinceId;
      this.Item.districtId=rs.data.districtId;
      this.Item.sex=rs.data.sex;
      this.Item.isActive=rs.data.isActive;
      this.getDistrictByProvince(rs.data.provinceId);
      document.getElementById('btnOpenModal')?.click();
    })
  }

  SetSex(sex:number){
    this.Item.sex=sex;
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
