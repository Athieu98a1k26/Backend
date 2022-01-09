import { ProductComponent } from './product/product.component';

import { CategoryComponent } from './category/category.component';
import { UsermanagerComponent } from './usermanager/usermanager.component';

import { RoleComponent } from './role/role.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenumangerComponent } from './menumanger/menumanger.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgotPassword/forgotPassword.component';
import { AuthGuardService as AuthGuard } from 'src/Auth/AuthGuard.service';
import { PermissionsComponent } from './permissions/permissions.component';
import { RolepermissionComponent } from './rolepermission/rolepermission.component';
import { BannerComponent } from './banner/banner.component';
import { ConfigComponent } from './config/config.component';
import { UnAuthComponent } from './unAuth/unAuth.component';
import { PaymentComponent } from './payment/payment.component';
import { CustommerComponent } from './custommer/custommer.component';
import { AboutComponent } from './about/about.component';
const routes: Routes = [
  { path: 'main', redirectTo: '/main/dashboard', pathMatch: 'full' },
  {
    path     : 'main',
    component: MainComponent,
    children:[

      {
        path     : 'dashboard',
        component: DashboardComponent,
      },
      {
        path     : 'menumanager',
        component: MenumangerComponent,
      },
      {
        path     : 'role',
        component: RoleComponent,
      },
      {
        path     : 'permissions',
        component: PermissionsComponent,
      }
      ,
      {
        path     : 'rolepermission',
        component: RolepermissionComponent,
      }
      ,
      {
        path     : 'usermanager',
        component: UsermanagerComponent,
      }
      ,
      {
        path     : 'category',
        component: CategoryComponent,
      }
      ,
      {
        path     : 'product',
        component: ProductComponent,
      }
      ,
      {
        path     : 'banner',
        component: BannerComponent,
      }
      ,
      {
        path     : 'config',
        component: ConfigComponent,
      }
      ,
      {
        path:'payment',
        component:PaymentComponent
      }
      ,
      {
        path:'customer',
        component:CustommerComponent
      }
      ,
      {
        path:'about',
        component:AboutComponent
      }
      //rolepermission
    ]
    ,canActivateChild:[AuthGuard]
  }
  ,
  {
    path     : 'login',
    component: LoginComponent,
  }
  ,
  {
    path     : 'register',
    component: RegisterComponent,
  },
  {
    path     : 'forgorPassword',
    component: ForgotPasswordComponent,
  },
  {
    path     : 'unAuth',
    component: UnAuthComponent,
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
