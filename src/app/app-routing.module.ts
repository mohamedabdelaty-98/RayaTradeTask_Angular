import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/Admin/home/home.component';
import { ProductDetailsComponent } from './Components/Admin/product-details/product-details.component';
import { AddProductComponent } from './Components/Admin/add-product/add-product.component';
import { ReportComponent } from './Components/Admin/report/report.component';
import { UpdateProductComponent } from './Components/Admin/update-product/update-product.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Add', component: AddProductComponent },
  { path: 'Report', component: ReportComponent },
  { path: 'productdetails/:id', component: ProductDetailsComponent },
  { path: 'ProductUpdate/:id', component: UpdateProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
