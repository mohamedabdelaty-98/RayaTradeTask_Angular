import { Component, OnInit } from '@angular/core';
import { GetByIdService } from '../../../Services/Product/get-by-id.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../Models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  Id: any;
  product!: Product;
  constructor(
    private getproductbyidservice: GetByIdService,
    private router: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.router.paramMap.subscribe({
      next: (params) => {
        this.Id = params.get('id');
      },
    });
    this.GetProductById(this.Id);
  }
  GetProductById(id: number) {
    this.getproductbyidservice.getproductbyid(id).subscribe({
      next: (response) => {
        console.log(response.data);
        this.product = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
