import { Component, HostListener, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../models/product.model';
import { AuthService } from '../../services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, NavigationError, Router } from '@angular/router';
import {  MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, DialogModule, ReactiveFormsModule, FormsModule, MatTabsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductService, AuthService, Router,],
  encapsulation: ViewEncapsulation.None,
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: any[] = [];
  animals: any[] = [];
  foods: any[] = [];
  accessories: any[] = [];
  animalCategories: string[] = [];
  selectedProduct: Product|null = null;
  selectedProductImage: string|null = null;
  selectedProductType: string = '';
  isProductSelected: boolean = false;
  currentFilter: String = 'Всички';
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  order: any = {
    products:[],
  };
  showSuccessMessage: boolean = false;
  isCartDialogVisible: boolean = false;
  isRegistrationDialogVisible: boolean = false; 

  newUser: any = {
    username: '',
    password: '',
    email: '',
    first_name: '',
    lastname: '',
    address: '',
    telephone: '',
  };

  currentUser: any | null = null;

  shippingTypes: any | null = null;
  isOrderSuccessfull: boolean = false;
  showScrollToTopButton: boolean = false;

  selectedTabIndex: number = 0;

  constructor(private productService: ProductService, private authService: AuthService,private router: Router, private route: ActivatedRoute,) {}
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const lowerHeightLimit = 0; 
    const upperHeightLimit = 5000; 

    if (scrollPosition > lowerHeightLimit && scrollPosition < upperHeightLimit) {
      this.showScrollToTopButton = true;
    } else {
      this.showScrollToTopButton = false;
    }
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        this.selectedTabIndex = Number(params['tab']);
      }
    });

    this.getUser();
    this.loadAnimalCategories(); 
    this.getShippingTypes();
    this.loadProductsByType('Животно');
    this.loadProductsByType('Аксесоари');
    this.loadProductsByType('Храна');
  }

  loadProductsByType(typeName: string): void {
    this.productService.getProducts({type_name: typeName}).subscribe({
      next: (data) => {
        if (typeName === 'Животно') {
          this.animals = data;
        } else if (typeName === 'Храна') {
          this.foods = data;
        } else if (typeName === 'Аксесоари') {
          this.accessories = data;
        }
      },
      error: (error) => {
        console.error('Проблем при извличане на продуктите!', error);
      }
    });
  }

  filterByAnimalCategory(event: any, category: string): void {
    event.preventDefault();
    if (category === 'Всички') {
        this.loadProductsByType('Животно');
    } else {
        this.productService.getProducts({type_name: 'Животно', category_name: category}).subscribe({
          next: (data) => {
            this.animals = data;
          },
          error: (error) => {
            console.error('There was an error while filtering!', error);
          }
        });
    }
    this.currentFilter = category;
}


  loadAnimalCategories(): void {
    this.productService.getCategories('Животно').subscribe({
      next: (categories) => {
        this.animalCategories = categories.map(cat => cat.title);
        this.animalCategories.unshift('Всички');
      },
      error: (error) => {
        console.error('Категориите не бяха заредени!', error);
      }
    });
  }

  scrollTo(section: string): void {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  selectProduct(product: any): void {
    this.selectedProduct = product;
    this.selectedProductImage = `http://localhost:8000/${product.image}`;
    this.isProductSelected = true;
    this.selectedProductType = product.category.type.title === 'Животно' ? 'Животно' : 'Друго';
  }

  getUser(): void {
    this.authService.getUser()?.subscribe(user => {
      if (user) {
        this.currentUser = user;
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

  removeProduct(product: any): void {
    if(confirm('Желаете ли да изтриете този продукт?')){
      this.productService.deleteProduct(product.id).subscribe({
        next: response => {
            alert('Успешно изтрит продукт!');
            this.loadProductsByType('Животно');
            this.loadProductsByType('Аксесоари');
            this.loadProductsByType('Храна');
        },
        error: error => {
            alert('Грешка при изтриването на продукт!');
        }
      });
    }
  }

  addToCart(product: any): void {
    const existingProduct = this.order.products.find((p: { id: any; }) => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.order.products.push({...product, quantity: 1});
    }
    this.showSuccessMessage = true;
    setTimeout(() => this.showSuccessMessage = false, 2000);
    this.calculateTotalPrice();
    this.calculateTotalQuantity();
  }
  
  increaseQuantity(index: number): void {
    this.order.products[index].quantity = (this.order.products[index].quantity || 1) + 1;
    this.calculateTotalPrice();
    this.calculateTotalQuantity();
  }
  
  decreaseQuantity(index: number): void {
    if (this.order.products[index].quantity > 1) {
      this.order.products[index].quantity -= 1;
    } else {
      if(confirm('Сигурни ли сте че искате да премахнете този продукт от количката?')) {
        this.removeItemFromCart(index);
      }
    }

    this.calculateTotalPrice();
    this.calculateTotalQuantity();
  }
  
  removeItemFromCart(index: number): void {
    if(confirm('Сигурни ли сте че искате да премахнете този продукт от количката?')) {
      this.order.products.splice(index, 1);
    } 
    this.calculateTotalPrice();
    this.calculateTotalQuantity();
  }

  goToOrderBtn(): void {
    this.isCartDialogVisible = true;
  }

  openRegistrationDialog(): void {
    this.isRegistrationDialogVisible = true; 
  }

  registerUser(): void {
    this.authService.register(this.newUser).subscribe({
      next: (response: any) => {
        this.isLoggedIn = true;
        this.isRegistrationDialogVisible = false;
        this.isCartDialogVisible = true; 
        this.getUser();
      },
      error: (error: any) => {
        console.error('Registration failed', error);
      }
    });
  }

  makeOrder(): void {
    const orderData = {
      products: this.order.products.map((p: any) => ({ id: p.id, quantity: p.quantity })),
      user_id: this.currentUser.id,  
      shipping_type_id: this.order.shippingTypeId,
      office: this.order.office ?? 'няма',
    };
  
    this.productService.placeOrder(orderData).subscribe({
      next: (response) => {
        this.isOrderSuccessfull = true;
        setTimeout(() => {this.router.navigateByUrl('/orders');}, 2000);
      },
      error: (error) => {
        console.error('Order placement failed', error);
      }
    });
  }

  getShippingTypes(): void {
    this.productService.getShippingTypes().subscribe({
      next: (response) => {
        this.shippingTypes = response;
      },
      error: (error) => {
        console.error('Error when extracting shipping types');
      }
    })
  }

  calculateTotalPrice(): void {
    let total = 0;
    this.order.products.forEach((product: any) => {
      total += product.price * product.quantity;
    });
    this.order.totalPrice = total.toFixed(2);  
  }

  calculateTotalQuantity(): void {
    let total = 0;
    this.order.products.forEach((product: any) => {
      total += product.quantity;
    });
    this.order.totalQuantity = total;
  }

  onTabChange(event: any): void {
    const tabIndex = event.index;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: tabIndex },
      queryParamsHandling: 'merge', 
    });
  }
  
  
  
  ngOnDestroy(): void {
    
  }

}
