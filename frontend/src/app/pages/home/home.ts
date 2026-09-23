import { Component, OnInit, signal } from '@angular/core';
import { ProductCard } from '../../components/product-card/product-card';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product';
import { Spot as SpotModel } from '../../models/spot'; //Kallar den för SpotModel för att undvika namnkrock med Spot-komponenten nedan
import { Hero } from '../../components/hero/hero';
import { Spot } from '../../components/spot/spot';

@Component({
  selector: 'app-home',
  imports: [ProductCard, Hero, Spot],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  products = signal<Product[]>([]);

  //Hero/Spots: statisk, hårdkodad data. Ingen signal behövs
  //Finns redan tillgänglig direkt, inget att vänta på (till skillnad från products)
  heroTitle = 'Lorem Ipsum dolor';
  heroDescription =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';
  heroImage = 'https://placehold.co/900x560/16151a/f2f0ea?text=Freaky+Fashion';

  spots: SpotModel[] = [
    {
      image: 'https://placehold.co/600x400/16151a/f2f0ea?text=Vinterkollektionen',
      text: 'Vinterkollektionen 2026',
      link: '#',
    },
    {
      image: 'https://placehold.co/600x400/ff3e7f/16151a?text=Rea',
      text: 'Upp till 50% rea',
      link: '#',
    },
    {
      image: 'https://placehold.co/600x400/d4ff3d/16151a?text=Nyheter',
      text: 'Nya släpp varje vecka',
      link: '#',
    },
  ];

  constructor(private productService: ProductService) {}

  //Produkter hämtas via HTTP asynkront, därför ngOnInit + subscribe
  ngOnInit(): void {
    this.productService.getAll().subscribe((data) => {
      this.products.set(data);
    });
  }
}
