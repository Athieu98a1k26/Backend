import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenumangerComponent } from './menumanger/menumanger.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgotPassword/forgotPassword.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { RoleComponent } from './role/role.component';
import { DeleteComponent } from './delete/delete.component';
import { PaginationComponent } from './pagination/pagination.component';
import { RolepermissionComponent } from './rolepermission/rolepermission.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { UsermanagerComponent } from './usermanager/usermanager.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { BannerComponent } from './banner/banner.component';
import { ConfigComponent } from './config/config.component';
import { UnAuthComponent } from './unAuth/unAuth.component';
import { NotFoundComponent } from './notFound/notFound.component';
import { PaymentComponent } from './payment/payment.component';
import { CustommerComponent } from './custommer/custommer.component';
import { AboutComponent } from './about/about.component';
import { InfoCheckoutComponent } from './InfoCheckout/InfoCheckout.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CouterComponent } from './Couter/Couter.component';
@NgModule({
  declarations: [	
    AppComponent,
      NavbarComponent,
      FooterComponent,
      HeaderComponent,
      DashboardComponent,
      MenumangerComponent,
      MainComponent,
      LoginComponent,
      PermissionsComponent,
      RegisterComponent,
      ForgotPasswordComponent,
      RoleComponent,
      DeleteComponent,
      PaginationComponent,
      RolepermissionComponent,
      UsermanagerComponent,
      CategoryComponent,
      ProductComponent,
      BannerComponent,
      ConfigComponent,
      UnAuthComponent,
      NotFoundComponent,
      PaymentComponent,
      CustommerComponent,
      AboutComponent,
      InfoCheckoutComponent,
      CouterComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgSelectModule,
    HttpClientModule,
    AngularEditorModule,
    NgxDropzoneModule,
    SweetAlert2Module.forRoot(),
    ToastrModule.forRoot({

      positionClass: 'toast-bottom-right'
   }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
