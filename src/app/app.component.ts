import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAsideOpen = false;

  toggleAside() {
    console.log('AppComponent: Toggling aside state'); 
    this.isAsideOpen = !this.isAsideOpen;
  }
}