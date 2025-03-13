import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  providers: [HttpClient],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  currPage: 'signup' | 'login' = 'login';

  signupData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  loginData = {
    username: '',
    password: '',
  };

  constructor(private router: Router) {}

  setCurrPage(page: 'signup' | 'login') {
    this.currPage = page;
  }

  signup() {
    console.log('object');
    if (this.signupData.password !== this.signupData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    console.log(this.signupData);

    fetch('http://localhost:3000/signup', {
      method: 'POST',
      body: JSON.stringify(this.signupData),
    })
      .then((res) => {
        if (res.ok) {
          alert('Signup successful! Please log in.');
          this.setCurrPage('login');
        } else {
          throw new Error('Error');
        }
      })
      .catch((err) => {
        alert('Signup failed. Please try again.');
      });
  }

  login() {
    fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify(this.loginData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Error');
      })
      .then((data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('isAdmin', data.isAdmin);
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials.');
      });
  }
}
