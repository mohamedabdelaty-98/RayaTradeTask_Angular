import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/Admin/home/home.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { SearchComponent } from './Components/Admin/search/search.component';
import { ProductCardComponent } from './Components/Admin/product-card/product-card.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailsComponent } from './Components/Admin/product-details/product-details.component';
import { AddProductComponent } from './Components/Admin/add-product/add-product.component';
import { ReportComponent } from './Components/Admin/report/report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { ConfirmationDeleteComponent } from './Components/Admin/confirmation-delete/confirmation-delete.component';
import { UpdateProductComponent } from './Components/Admin/update-product/update-product.component';
import { Ng2SearchPipe, Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    SearchComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    AddProductComponent,
    ReportComponent,
    ConfirmationDeleteComponent,
    UpdateProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
