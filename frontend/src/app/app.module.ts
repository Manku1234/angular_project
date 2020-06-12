import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ErrorComponent } from './admin/error/error.component';
import { WrapperComponent } from './admin/wrapper/wrapper.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginServiceService } from './login/service/login-service.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { AddcatagoryComponent } from './admin/addcatagory/addcatagory.component';
import { AddproductComponent } from './admin/addproduct/addproduct.component';
import { UpdatecatagoryComponent } from './admin/updatecatagory/updatecatagory.component';
import { UpdateproductComponent } from './admin/updateproduct/updateproduct.component';
import { ViewcatagoryComponent } from './admin/viewcatagory/viewcatagory.component';
import { ViewproductComponent } from './admin/viewproduct/viewproduct.component';
import { AdminService } from './shared/admin.service';
import { CatagoryService } from './shared/catagory.service';
import {ProductService} from './shared/product.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ErrorComponent,
    WrapperComponent,
    HeaderComponent,
    FooterComponent,
    AddcatagoryComponent,
    AddproductComponent,
    UpdatecatagoryComponent,
    UpdateproductComponent,
    ViewcatagoryComponent,
    ViewproductComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, AuthGuard, AdminService , CatagoryService, ProductService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
