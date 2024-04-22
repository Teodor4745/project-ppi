import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; 
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService, Router],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup('');
  loginFailed: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(event: any) {
    event.preventDefault();
    if (this.loginForm?.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.authService.setToken(response.token);
          this.loginFailed = false;
          this.router.navigateByUrl('/');
        },
        error: (error) => {
          console.error('Login failed', error);
          this.loginFailed = true;
        }
      });
    }
    else {
      this.loginFailed = true;
    }
  }
}
