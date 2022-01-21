import { Injectable } from '@angular/core';
import { BaseCongif } from 'src/app/BaseConfig';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends BaseService {

  private apiUrl=BaseCongif.UrlBase+"/Payment/";
  async AddOrUpdate(data:any){
    return await this.HttpPost(this.apiUrl+'AddOrUpdate',data)
  }
  async SearchPaymentSimpleInfo(data:any){
    return await this.HttpPost(this.apiUrl+'SearchPaymentSimpleInfo',data)
  }
  async DeleteItem(id:string){
    return await this.HttpGet(this.apiUrl+'DeleteItem?id='+id)
  }
  GetPaymentById(paymentId:string){
    return this.http.get(this.apiUrl + 'GetPaymentById?paymentId='+paymentId).toPromise();
  }
  async GetByIdItem(id:string){
    return await this.HttpGet(this.apiUrl+'GetByIdItem?id='+id)
  }
  async GetAll(){
    return await this.HttpGet(this.apiUrl+'GetAll');
  }
  async ChangeStatus(data:any){
    return await this.HttpPost(this.apiUrl+'ChangeStatus',data);
  }
  //
  async DeletePayment(Id:string){
    return await this.HttpPost(this.apiUrl+'DeletePayment',{Id});
  }
}
