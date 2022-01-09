import { BaseService } from 'src/service/base.service';
import { Injectable } from '@angular/core';
import { BaseCongif } from 'src/app/BaseConfig';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService extends BaseService {

  private apiUrl=BaseCongif.UrlBase+"/Province/";
  async SearchNotpagination(data:any){
    return await this.HttpPost(this.apiUrl+'SearchNotpagination',data)
  }

}
