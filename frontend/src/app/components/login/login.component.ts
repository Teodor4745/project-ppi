import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; 
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService, Router],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup('');
  loginFailed: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private zone: NgZone) {
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
          this.authService.setToken(response.token);
          this.loginFailed = false;
          this.zone.run(() => {
            this.router.navigate(['/']);
          });
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
