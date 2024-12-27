import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss'
})
export class AsideComponent {
  @Input() isOpen: boolean = false;

  constructor(private readonly router: Router) {}

  closeAside() {
    this.isOpen = false; // Close the aside menu
  }

  navigateTo(route: string): void {
    this.router.navigate([route])
      .then(() => this.closeAside())
      .catch((err) => console.error('Navigation error:', err));
  }
}