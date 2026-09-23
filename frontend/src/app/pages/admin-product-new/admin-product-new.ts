import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product';

@Component({
  imports: [FormsModule, RouterLink], //FormsModule krävs för ngModel, RouterLink för "Tillbaka"-länken
  selector: 'app-admin-product-new',
  styleUrl: './admin-product-new.css',
  templateUrl: './admin-product-new.html',
})
export class AdminProductNew {
  /* Partial<Product>: alla fält valfria, eftersom id/slug saknas
   (genereras av backend). Håller formulärets nuvarande värden,
   uppdateras automatiskt via [(ngModel)] i HTML */
  newProduct: Partial<Product> = {
    name: '',
    description: '',
    sku: '',
    brand: '',
    image: '',
    price: undefined, //Tillfälligt startvärde, kommer att uppdateras i HTML. 0 är inget startvärde, utan  det är ett giltigt number
  };

  constructor(
    private productService: ProductService,
    private router: Router,
  ) {}

  /*Skickar newProduct till backend (POST), navigerar till produktlistan
    efter att den nya produkten sparats*/
  onSubmit(): void {
    this.productService.create(this.newProduct).subscribe(() => {
      this.router.navigate(['/admin/products']);
    });
  }
}
