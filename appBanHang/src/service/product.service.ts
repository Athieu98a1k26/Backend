import { BaseService } from 'src/service/base.service';
import { Injectable } from '@angular/core';
import { BaseCongif } from 'src/app/BaseConfig';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService{

  private apiUrl=BaseCongif.UrlBase+"/Product/";
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

  async GetById(id:string){
    return await this.HttpGet(this.apiUrl+'GetById?id='+id)
  }

  async SetActive(id:string,isActive:boolean){
    return await this.HttpGet(this.apiUrl+'SetActive?id='+id+'&isActive='+isActive);
  }
}

