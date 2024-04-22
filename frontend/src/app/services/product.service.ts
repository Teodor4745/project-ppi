import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8000/api';
  private apiProductsUrl = 'http://localhost:8000/api/products';

  constructor(private http: HttpClient) { }

  getProducts(filters?: any): Observable<any[]> {
    return this.http.get<any[]>(this.apiProductsUrl, { params: filters });
  }

  getCategories(typeName?: string): Observable<any[]> {
    let params = new HttpParams();
    if (typeName) {
      params = params.set('type_name', typeName);
    }
    return this.http.get<any[]>(`${this.apiUrl}/categories`, { params });
  }

  createProduct(productData: FormData): Observable<any> {
    return this.http.post<any>(this.apiProductsUrl, productData);
  }

  updateProduct(id: number, productData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiProductsUrl}/${id}`, productData);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiProductsUrl}/${id}`);
  }
}
