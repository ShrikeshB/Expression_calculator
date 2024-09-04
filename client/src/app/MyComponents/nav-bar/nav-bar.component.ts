import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  constructor(private router: Router) {}
  LoginBtn() {
    this.router.navigate(['/login']);
  }

  SignupBtn() {
    this.router.navigate(['/Signup']);
  }
}
