import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  constructor(private router: Router) {}

  onSearch(searchTerm: string): void {
    if (searchTerm.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: searchTerm.trim() } });
    }
  }
}
