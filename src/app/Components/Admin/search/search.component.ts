import { Component } from '@angular/core';
import { GetProductByNameService } from '../../../Services/Product/get-product-by-name.service';
import { GetProductByPriceService } from '../../../Services/Product/get-product-by-price.service';
import { Product } from '../../../Models/product';
import { FormBuilder } from '@angular/forms';
import { SearchService } from '../../../Services/Product/search.service';
import { ToastrService } from 'ngx-toastr';
import { GetAllService } from '../../../Services/Product/get-all.service';
import { response } from 'express';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'], // Corrected the styleUrl to styleUrls
})
export class SearchComponent {
  searchValue = ''; // Added a property to store the search text
  products: Product[] = [];
  searchForm = this.fb.nonNullable.group({
    searchValue: '',
  });
  constructor(
    private filterbynameservice: GetProductByNameService,
    private filterbypriceservice: GetProductByPriceService,
    private fb: FormBuilder,
    private searchservice: SearchService,
    private toast: ToastrService,
    private getallproductservice: GetAllService
  ) {}
  FilterProductByName() {
    if (this.searchValue !== '') {
      this.filterbynameservice.getproductbyname(this.searchValue).subscribe({
        next: (response) => {
          if (response.isPass) {
            this.products = response.data;
            this.searchservice.updateSearchValue(this.products);
          } else {
            this.toast.error(response.data);
            this.searchservice.updateSearchValue(null);
          }
        },
      });
    } else this.GetAllProduct();
  }
  FilterProductByPrice() {
    if (this.searchValue !== '') {
      this.filterbypriceservice
        .getproductbyprice(Number(this.searchValue))
        .subscribe({
          next: (response) => {
            if (response.isPass) {
              this.products = response.data;
              this.searchservice.updateSearchValue(this.products);
            } else {
              this.toast.error(response.data);
              this.searchservice.updateSearchValue(null);
            }
          },
        });
    } else this.GetAllProduct();
  }
  OnSearchinput(): void {
    if (Number(this.searchValue)) this.FilterProductByPrice();
    else this.FilterProductByName();
  }
  GetAllProduct() {
    this.getallproductservice.getallproducts().subscribe({
      next: (response) => {
        this.products = response.data;
        this.searchservice.updateSearchValue(this.products);
        console.log(this.products);
      },
    });
  }
}
