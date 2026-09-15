import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product';

@Component({
  imports: [FormsModule],
  selector: 'app-admin-product-new',
  styleUrl: './admin-product-new.css',
  templateUrl: './admin-product-new.html',
})
export class AdminProductNew {
  newProduct: Partial<Product> = {
    name: '',
    description: '',
    sku: '',
    brand: '',
    image: '',
    price: undefined,
  };

  constructor(
    private productService: ProductService,
    private router: Router,
  ) {}

  onSubmit(): void {
    this.productService.create(this.newProduct).subscribe(() => {
      this.router.navigate(['/admin/products']);
    });
  }
}
