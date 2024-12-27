import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Output() toggleAside = new EventEmitter<void>();

  onToggleAside() {
    console.log('Toggle aside button clicked');
    this.toggleAside.emit();
  }
}