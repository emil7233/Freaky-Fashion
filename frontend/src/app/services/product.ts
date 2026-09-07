import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

/*Injectable talar om för angular att den här klassen kan hanteras av Dependency Injection-systemet
HTTP-client är angulars inbyggda verktyg för http anrop
Observable är typen som RxJS använnder för asykrona dataströmmar
Product är min egen interface som beskriver hur en product ska se ut. */

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products'; //apiURL så jag slipper skriva ut hela URL:en varje gång

  constructor(private http: HttpClient) {}

  getAll(query?: string): Observable<Product[]> {
    const url = query ? `${this.apiUrl}?q=${query}` : this.apiUrl;
    return this.http.get<Product[]>(url);
  }

  getBySlug(slug: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${slug}`);
  }

  getRelated(slug: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/${slug}/related`);
  }

  create(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  delete(slug: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${slug}`);
  }
}

/* @Injectable({
  providedIn: 'root',
  Detta betyder att det bara skapas en enda instans av servicen för hela appen, aka en singleton, som kan delas av alla komponenter som använder den*/
