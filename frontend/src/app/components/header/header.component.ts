import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  links = [
    { label: 'Начало', url: '/' },
    { label: 'За нас', url: '/about' },
    { label: 'Продукти', url: '/products' },
    { label: 'Контакти', url: '/contact' },
    { label: 'Вход', url: '/login' }
  ];
}
