import { Injectable } from '@angular/core';
import { BaseCongif } from 'src/app/BaseConfig';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UsermanagerService extends BaseService{

  private apiUrl=BaseCongif.UrlBase+"/Users/";
  async AddOrUpdate(data:any){
    return await this.HttpPost(this.apiUrl+'AddOrUpdate',data)
  }
  async Search(data:any){
    return await this.HttpPost(this.apiUrl+'Search',data)
  }
  async DeleteItem(id:string){
    return await this.HttpGet(this.apiUrl+'DeleteItem?id='+id)
  }

  async GetByIdItem(id:string){
    return await this.HttpGet(this.apiUrl+'GetByIdItem?id='+id)
  }
  async GetAll(){
    return await this.HttpGet(this.apiUrl+'GetAll');
  }
  async SetActive(id:string,isActive:boolean){
    return await this.HttpGet(this.apiUrl+'SetActive?id='+id+'&isActive='+isActive);
  }
}
