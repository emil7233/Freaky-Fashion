import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCard } from '../../components/product-card/product-card';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product';

@Component({
  imports: [ProductCard],
  selector: 'app-product-detail',
  styleUrl: './product-detail.css',
  templateUrl: './product-detail.html',
})
export class ProductDetail implements OnInit {
  product = signal<Product | null>(null); //produkt eller null
  relatedProducts = signal<Product[]>([]);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const slug = params['slug'];

      this.productService.getBySlug(slug).subscribe((data) => {
        this.product.set(data);
      });

      this.productService.getRelated(slug).subscribe((data) => {
        this.relatedProducts.set(data);
      });
    });
  }
}
