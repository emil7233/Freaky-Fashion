import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { SearchResults } from './pages/search-results/search-results';
import { ProductDetail } from './pages/product-detail/product-detail';
import { AdminProductList } from './pages/admin-product-list/admin-product-list';
import { AdminProductNew } from './pages/admin-product-new/admin-product-new';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'search', component: SearchResults },
  { path: 'products/:slug', component: ProductDetail },
  { path: 'admin/products', component: AdminProductList },
  { path: 'admin/products/new', component: AdminProductNew },
];
