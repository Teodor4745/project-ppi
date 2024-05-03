import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  providers: [AuthService],
})
export class ContactComponent implements OnInit{
  isLoggedIn = false;

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.getUser(); 
  }

  getUser(): void {
    this.authService.getUser()?.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
      }
    });
  }
}
