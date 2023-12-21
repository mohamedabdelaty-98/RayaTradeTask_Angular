import { Component, OnInit } from '@angular/core';
import { Product } from '../../../Models/product';
import { GetAllService } from '../../../Services/Product/get-all.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.css',
})
export class ReportComponent implements OnInit {
  products: Product[] = [];
  constructor(private getallproductservice: GetAllService) {}
  ngOnInit(): void {
    this.GetAllProducts();
  }
  GetAllProducts() {
    this.getallproductservice.getallproducts().subscribe({
      next: (response) => {
        this.products = response.data;
        console.log(this.products);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  getInStockProductCount(): number {
    return this.products.filter((product) => product.quantity > 0).length;
  }
  getOutStockProductCount(): number {
    return this.products.filter((product) => product.quantity === 0).length;
  }
}
