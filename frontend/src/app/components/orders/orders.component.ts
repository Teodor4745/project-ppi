import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  providers: [ProductService],
})
export class OrdersComponent {
  orders: any = [];
  user: any;
  loading: boolean = false;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
  ){

  }

  ngOnInit(): void {
    this.getUser();
  }

  getOrders(): void {
    if(this.user) {
      this.loading = true;
      const action = this.productService.getOrders().subscribe({
        next: (data) => {
          this.loading = false;
          this.orders = data.orders;
        },
        error: (error) => {
          this.loading = false;
        }
      });
    }
  }

  getUser(): void {
    this.authService.getUser()?.subscribe(user => {
      this.user = user;
      this.getOrders();
    });
  }

  calculatePrice(products: any[]) {
    return products.reduce((total, product) => {
      return total + (product.price * (product.pivot.quantity || 1));
    }, 0);
  }
}
