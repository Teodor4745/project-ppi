import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [AuthService, Router],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup('');
  registerFailed: boolean = false;

  constructor (
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) {}
  
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      telephone: [''],
      address: [''],
    });
  }

  onSubmit(event: any) {
    event.preventDefault();
    if (this.registerForm?.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          this.authService.setToken(response.token);
          this.registerFailed = false;
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Register failed', error);
          this.registerFailed = true;
        }
      });
    }
    else {
      this.registerFailed = true;
    }
  }
}
