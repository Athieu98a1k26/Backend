import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { AuthServiceService } from './AuthService.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivateChild  {

constructor(private authServiceService:AuthServiceService,private router: Router,private spinner: NgxSpinnerService) { }
  async canActivateChild (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let rs= await this.authServiceService.isLoggedIn();
    this.spinner.hide();
    if(!rs){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
