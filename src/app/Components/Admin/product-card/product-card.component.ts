import { Component, OnInit } from '@angular/core';
import { GetAllService } from '../../../Services/Product/get-all.service';
import { Product } from '../../../Models/product';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDeleteComponent as deletecomponent } from '../confirmation-delete/confirmation-delete.component';
import { DeleteService } from '../../../Services/Product/delete.service';
import { SearchService } from '../../../Services/Product/search.service';
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnInit {
  Products: Product[] = [];
  searchText: string = '';
  constructor(
    private getallservice: GetAllService,
    private dialog: MatDialog,
    private deleteservice: DeleteService,
    private searchservice: SearchService
  ) {}
  ngOnInit(): void {
    this.searchservice.searchValue$.subscribe({
      next: (response) => {
        console.log(response);
        this.Products = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.GetallProducts();
  }
  GetallProducts() {
    this.getallservice.getallproducts().subscribe({
      next: (response) => {
        this.Products = response.data;
        console.log(this.Products);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  DeleteProduct(id: number) {
    const dialog = this.dialog.open(deletecomponent);
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteservice.removeproduct(id).subscribe(
          (response) => {
            console.log(response.data);
            this.GetallProducts();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }
}
