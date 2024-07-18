import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { Router } from '@angular/router';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavBarComponent, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./style/loginStyle.css'],
})
export class LoginComponent {
  constructor(private http: HttpClient, private router: Router) {}
  public errorMessage: string = '';

  setSessionData(value: string) {
    sessionStorage.setItem('UID', value);
  }

  getSessionData(key: string) {
    const sessionValue = sessionStorage.getItem(key);
    console.log(sessionValue);
  }

  public login(formData: any) {
    console.log(formData.email);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const data = {
      email: formData.email,
      password: formData.password,
    };
    this.http
      .post('http://localhost:3000/users/login', data, { headers })
      .pipe(
        catchError((error) => {
          this.handleError(error);
          return throwError(error);
        })
      )
      .subscribe((res: any) => {
        if (res.token) {
          console.log('Login successful', res.userId);
          this.setSessionData(res.userId);
          this.router.navigate(['/PostfixEvaluator']);
        }
      });
  }

  private handleError(error: any) {
    if (error.status === 401) {
      this.errorMessage = 'Invalid email or password.';
      console.log('error');
    } else if (error.status === 500) {
      this.errorMessage = 'Server error. Please try again later.';
      console.log('error');
    } else {
      this.errorMessage = 'An unknown error occurred. Please try again.';
      console.log('error');
    }
  }
}
