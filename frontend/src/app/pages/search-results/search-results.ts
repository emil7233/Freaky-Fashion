import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCard } from '../../components/product-card/product-card';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product';

@Component({
  imports: [ProductCard],
  selector: 'app-search-results',
  styleUrl: './search-results.css',
  templateUrl: './search-results.html',
})
export class SearchResults implements OnInit {
  // Signal: håller listan av sökresultat, tom array innan något sökts/hämtats
  products = signal<Product[]>([]);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
  ) {}

  // route.queryParams.subscribe triggar om varje gång
  // söktermen ändras, t.ex. när man söker på nytt utan att lämna sidan.
  // Med bara snapshot (engångsvärde) hade en ny sökning inte uppdaterat resultaten
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const searchTerm = params['q'];

      this.productService.getAll(searchTerm).subscribe((data) => {
        this.products.set(data);
      });
    });
  }
}
