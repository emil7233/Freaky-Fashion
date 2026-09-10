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
  products = signal<Product[]>([]);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    const searchTerm = this.route.snapshot.queryParams['q'];

    this.productService.getAll(searchTerm).subscribe((data) => {
      this.products.set(data);
    });
  }
}
