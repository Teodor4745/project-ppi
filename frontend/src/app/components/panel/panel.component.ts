import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

export interface Category {
  id: number;
  title: string;
}

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  providers: [ProductService],
})
export class PanelComponent implements OnInit {
  productForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  categories: Category[] = [];

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+\.?\d*$/)]],
      product_category: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      image: [null]
    });
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Категориите не бяха заредени!', error);
      }
    });
  }

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.productForm.patchValue({ image: file });
    }
  }

  onSubmit() {
    this.successMessage = '';
    this.errorMessage = '';
    const formData = new FormData();
    Object.entries(this.productForm.controls).forEach(([key, control]) => {
      const value = control.value;
      if (value instanceof File) {
        formData.append(key, value, value.name);
      } else if (typeof value === 'string' || typeof value === 'number') {
        formData.append(key, value.toString());
      }
    });

    const id = this.productForm.get('id')?.value;

    if (id) {
      this.productService.updateProduct(id, formData).subscribe({
        next: (response) => {
          this.successMessage = 'Продуктът е обновен успешно!';
          this.productForm.reset();
        },
        error: (error) => {
          console.error('Error updating product:', error);
          this.successMessage = 'Грешка при обновяване на продукта!';
        }
      });
    } else {
      this.productService.createProduct(formData).subscribe({
        next: (response) => {
          this.successMessage = 'Продуктът е създаден успешно!';
          this.productForm.reset();
        },
        error: (error) => {
          this.errorMessage = 'Грешка при създаване на продукта!';
          console.error('Error creating product:', error);
        }
      });
    }
  }
}
