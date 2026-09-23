/*Injectable talar om för angular att den här klassen kan hanteras av Dependency Injection-systemet
HTTP-client är angulars inbyggda verktyg för http anrop
Observable är typen som RxJS använder för asykrona dataströmmar
Product är min egen interface som beskriver hur en product ska se ut. */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

/*providedIn: 'root',
  Detta betyder att det bara skapas en enda instans av servicen för hela appen, aka en singleton, som kan delas av alla komponenter som använder den*/

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products'; //apiURL så jag slipper skriva ut hela URL:en i varje metod

  constructor(private http: HttpClient) {} //DI: Angular skickar in en delad HttpClient-instans automatiskt

  getAll(query?: string): Observable<Product[]> {
    //query?: string gör paramtern valfri
    const url = query ? `${this.apiUrl}?q=${query}` : this.apiUrl; //som en kompakt if/else. Hämtar alla produkter, ?q= läggs till om en sökterm skickas med
    return this.http.get<Product[]>(url);
  }

  // Hämtar en enskild produkt via dess slug (detaljsidan)
  getBySlug(slug: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${slug}`);
  }

  // Hämtar liknande produkter (max 5, styrs av backend)
  getRelated(slug: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/${slug}/related`);
  }

  /*Skapar en ny produkt. Partial<Product> eftersom id/slug saknas
    tills backend genererat dem. product blir req.body på servern. */
  create(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }
}
