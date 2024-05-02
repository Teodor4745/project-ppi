import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { PanelComponent } from './components/panel/panel.component';
import { OrdersComponent } from './components/orders/orders.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'login', component: LoginComponent},
    { path: 'panel', component: PanelComponent},
    { path: 'orders', component: OrdersComponent},
    { path : '**', component: HomeComponent},
];
