import { Injectable } from '@angular/core';
import { Product } from '../../app/interfaces/product';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable, map, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

class ReponseProduct{
  constructor(public pk: number, public quantity: number) {}
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = 'http://127.0.0.1:8000/warehouse/products/'
  private sendProductUrl = 'http://127.0.0.1:8000/warehouse/order/send/'

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) { }

  private data: Product[] = []
  private responses: ReponseProduct[] = []

  getProducts() : Observable<Product[]>{
    return this.http.get<Product[]>(this.productUrl) 
  }

  sendProductsToOrder(products: Product[], quantities: { [key: number]: number }, pkClient: number){
    for(var p of products){
      let quantity = quantities[p.pk]
      if(quantity != null && quantity > 0) this.responses.push(new ReponseProduct(p.pk, quantity))
    }

    if(this.responses.length > 0){
      const products = JSON.stringify(this.responses)
      this.http.post(this.sendProductUrl, { products, pkClient }).subscribe(
        response => console.log('Data sent successfully:', response)
      )
      this.snackBar.open('Order created successfully', 'Close', {
        duration: 2000,
      })
      this.router.navigate(['/orders'])
    } else {
      this.snackBar.open('No products were selected', 'Close', {
        duration: 2000,
      })
    }

    this.responses = []
  }

}
