import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./navbar/navbar.component";
import {AsideComponent} from "./aside/aside.component";
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, AsideComponent , DashboardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAsideOpen = false;

  toggleAside() {
    console.log('AppComponent: Toggling aside state'); // Debug log
    this.isAsideOpen = !this.isAsideOpen;
  }
}