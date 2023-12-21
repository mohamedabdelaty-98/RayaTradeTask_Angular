import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UpdateService } from '../../../Services/Product/update.service';
import { GetByIdService } from '../../../Services/Product/get-by-id.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../Models/product';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  updateProductForm!: FormGroup;
  Id: any;
  product!: Product;
  apiError: any;

  constructor(
    private _FormBuilder: FormBuilder,
    private updateservice: UpdateService,
    private getbyidservice: GetByIdService,
    private toast: ToastrService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.updateProductForm = this._FormBuilder.group({
      name: [null, [Validators.required, Validators.pattern(/^[^0-9].*$/)]],
      description: [null, [Validators.required, this.validDescriptionPattern]],
      quantity: [
        null,
        [Validators.required, Validators.min(0), this.isInteger],
      ],
      price: [null, [Validators.required, Validators.min(1), this.notZero]],
    });
    this.router.paramMap.subscribe({
      next: (params) => {
        this.Id = params.get('id');
      },
    });
    this.GetProductById(this.Id);
  }

  GetProductById(id: number) {
    this.getbyidservice.getproductbyid(id).subscribe({
      next: (response) => {
        this.product = response.data;
        this.initializeForm();
      },
    });
  }

  initializeForm() {
    this.updateProductForm = this._FormBuilder.group({
      name: [
        this.product.name,
        [Validators.required, Validators.pattern(/^[^0-9].*$/)],
      ],
      description: [
        this.product.description,
        [Validators.required, this.validDescriptionPattern],
      ],
      quantity: [
        this.product.quantity,
        [Validators.required, Validators.min(0), this.isInteger],
      ],
      price: [
        this.product.price,
        [Validators.required, Validators.min(1), this.notZero],
      ],
    });
  }

  updateProduct(formData: FormGroup) {
    formData.value.id = this.Id;
    this.updateservice.updateproduct(formData.value).subscribe({
      next: (response) => {
        if (response.isPass) this.toast.success(response.data);
        else this.toast.error(response.data);
        console.log(response);
      },
      error: (error) => {
        this.apiError = error;
      },
    });
    console.log(formData.value);
  }

  get name() {
    return this.updateProductForm.get('name');
  }

  get description() {
    return this.updateProductForm.get('description');
  }

  get quantity() {
    return this.updateProductForm.get('quantity');
  }

  get price() {
    return this.updateProductForm.get('price');
  }

  // Custom validator function for description
  validDescriptionPattern(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const value = control.value;
    if (value && (/^\d/.test(value) || !/\w/.test(value))) {
      return { invalidDescriptionPattern: true };
    }
    return null;
  }
  // Custom validator function for quantity to check if it's an integer
  isInteger(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (value % 1 !== 0) {
      return { notInteger: true };
    }
    return null;
  }
  // Custom validator function for price to check if it's not zero
  notZero(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (value === 0) {
      return { isZero: true };
    }
    return null;
  }
}
