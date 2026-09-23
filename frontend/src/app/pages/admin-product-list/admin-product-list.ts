import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product';
@Component({
  imports: [RouterLink],
  selector: 'app-admin-product-list',
  styleUrl: './admin-product-list.css',
  templateUrl: './admin-product-list.html',
})
export class AdminProductList implements OnInit {
  products = signal<Product[]>([]);
  /* Signal: reaktiv state, håller en array av produkter. 
  Uppdateras via .set(), läses i HTML som products(). 
  allt som använder den uppdateras automatiskt */

  constructor(private productService: ProductService) {}

  // Hämtar ALLA produkter (samma metod som Home använder), visas i tabellen
  ngOnInit(): void {
    this.productService.getAll().subscribe((data) => {
      this.products.set(data);
    });
  }
}
