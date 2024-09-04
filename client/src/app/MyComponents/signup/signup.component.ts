import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NavBarComponent, HttpClientModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./style/signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private http: HttpClient,private router:Router) {}

  ngOnInit(): void {
    // this.fetchData();
  }

  public fetchData() {
    this.http.get('http://localhost:3000/test').subscribe((res) => {
      console.log(res);
    });
  }

  setSessionData(value: string) {
    sessionStorage.setItem('UID', value);
  }

  getUserId(email: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .get('http://localhost:3000/users/getUserIdViaEmail/' + email, { headers })
      .subscribe((res:any) => {
        console.log('Signup response:', res);
        this.setSessionData(res.userId);
        this.router.navigate(['/PostfixEvaluator']);
      });
  }

  public signup(formData: any) {
    const data = {
      email: formData.email,
      password: formData.password,
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post('http://localhost:3000/users/register', data, { headers })
      .subscribe((res) => {
        console.log('Signup response:', res);
        this.getUserId(data.email);
      });
  }
}
