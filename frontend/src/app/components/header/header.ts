import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink], //Används för HTML
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  constructor(private router: Router) {} //Router (en service), styrd av kod/logik inte en länk som RouterLink

  /*trim tar bort mellanslag i startet o slutet av sökningen, men fångar även "bara mellanslag"
   (falsy), så vi inte navigerar på en tom sökning*/
  onSearch(searchTerm: string): void {
    if (searchTerm.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: searchTerm.trim() } });
    }
  }
}
