import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [AuthService, Router],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  links = [
    { label: 'Начало', url: '/' },
    { label: 'За нас', url: '/about' },
    { label: 'Продукти', url: '/products' },
    { label: 'Контакти', url: '/contact' },
  ];

  constructor(
    private authService: AuthService, 
    private router: Router) {}

  ngOnInit(): void {
    this.getUser();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.getUser();
    });
  }

  getUser(): void { 
    this.authService.getUser()?.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
        if(user.role_name === 'Admin') {
          this.isAdmin = true;
        }
      }
      else {
        this.isLoggedIn = false;
        this.isAdmin = false;
      } 
    });
  }

  logOut(): void {
    if (confirm('Сигурни ли сте че искате да се отпишете?')) {
      this.authService.logout();
    }
    this.router.navigateByUrl('/');
    this.getUser();
  }
}
