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

  //route.params.subscribe (INTE snapshot!): triggar om varje gång
  //slug ändras, exempelvis när man klickar en liknande produkt och
  //navigerar mellan produkter utan att komponenten skapas om
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const slug = params['slug']; //Läser Route Paramtern

      //Två separata anrop. getBySlug och getRelated är oberoende av
      //varandra, men båda måste ligga inuti params.subscribe eftersom
      //slug bara existerar där
      this.productService.getBySlug(slug).subscribe((data) => {
        this.product.set(data);
      });

      this.productService.getRelated(slug).subscribe((data) => {
        this.relatedProducts.set(data);
      });
    });
  }
}
