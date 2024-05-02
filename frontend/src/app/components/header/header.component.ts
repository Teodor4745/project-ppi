import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { filter } from 'rxjs';
import { NgZone } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [AuthService, Router],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  cartCount = 0;

  links = [
    { label: 'Начало', url: '/' },
    { label: 'За нас', url: '/about' },
    { label: 'Продукти', url: '/products' },
    { label: 'Контакти', url: '/contact' },
  ];

  constructor(
    private authService: AuthService, 
    private router: Router,
    private zone: NgZone) {}

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

  navigate(url: string): void {
    this.zone.run(() => {
      this.router.navigateByUrl(url);
    });
  }
}
