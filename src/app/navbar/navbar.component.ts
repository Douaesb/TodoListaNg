import {Component} from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  
constructor(private readonly router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([route])
      .catch((err) => console.error('Navigation error:', err));
  } 
}