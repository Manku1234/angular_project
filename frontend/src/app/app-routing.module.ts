import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ErrorComponent } from './admin/error/error.component';
import { WrapperComponent } from './admin/wrapper/wrapper.component';
import { AddcatagoryComponent } from './admin/addcatagory/addcatagory.component';
import { AddproductComponent } from './admin/addproduct/addproduct.component';
import { UpdatecatagoryComponent } from './admin/updatecatagory/updatecatagory.component';
import { UpdateproductComponent } from './admin/updateproduct/updateproduct.component';
import { ViewcatagoryComponent } from './admin/viewcatagory/viewcatagory.component';
import { ViewproductComponent } from './admin/viewproduct/viewproduct.component';
import { AuthGuard } from './auth/auth.guard';
const routes: Routes = [

  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent },
  { path: 'wrapper',
        component: WrapperComponent,
        children:[
            {path: '',redirectTo:'dashboard', pathMatch: 'full'},
            { path: 'dashboard', component: DashboardComponent},
            { path: 'AddCategory', component:  AddcatagoryComponent,},
            { path: 'ViewCategory', component: ViewcatagoryComponent},
            { path: 'EditCategory/:id', component : UpdatecatagoryComponent},
            { path: 'AddCatagory', component: AddproductComponent},
            { path: 'ViewCatagory', component: ViewproductComponent},
            { path: 'EditCatagory/:id', component: UpdateproductComponent },
        ]
    },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }