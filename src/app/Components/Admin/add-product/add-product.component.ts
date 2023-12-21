import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { InsertService } from '../../../Services/Product/insert.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  addProductForm: FormGroup;
  apiError: any = '';

  constructor(
    private _FormBuilder: FormBuilder,
    private insertservice: InsertService,
    private toast: ToastrService
  ) {
    this.addProductForm = _FormBuilder.group({
      name: [null, [Validators.required, Validators.pattern(/^[^0-9].*$/)]],
      description: [null, [Validators.required, this.validDescriptionPattern]],
      quantity: [
        null,
        [Validators.required, Validators.min(0), this.isInteger],
      ],
      price: [null, [Validators.required, Validators.min(0), this.notZero]],
    });
  }

  addProduct(formData: FormGroup) {
    this.insertservice.insertproduct(formData.value).subscribe({
      next: (response) => {
        if (response.isPass) this.toast.success(response.data);
        else this.toast.error(response.data);
        console.log(response);
      },
    });
    console.log(formData.value);
  }

  get name() {
    return this.addProductForm.get('name');
  }

  get description() {
    return this.addProductForm.get('description');
  }

  get quantity() {
    return this.addProductForm.get('quantity');
  }

  get price() {
    return this.addProductForm.get('price');
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

  // Custom validator function for price
  notZero(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (value === 0) {
      return { notZero: true };
    }
    return null;
  }

  // Custom validator function for quantity
  isInteger(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (!Number.isInteger(value)) {
      return { notInteger: true };
    }
    return null;
  }
}
