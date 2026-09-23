import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  // Obligatorisk input. Förälderkomponenten MÅSTE skicka in en produkt,
  // t.ex. <app-product-card [product]="produkt" />
  @Input({ required: true }) product!: Product;
}
