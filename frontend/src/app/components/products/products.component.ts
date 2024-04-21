import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { Dialog, DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, DialogModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductService],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  animals: any[] = [];
  foods: any[] = [];
  accessories: any[] = [];
  animalCategories: string[] = []; 

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadAnimalCategories(); 
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
    console.log(category);
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
}
