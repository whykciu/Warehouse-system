import { Injectable } from '@angular/core';
import { Product } from '../../app/interfaces/product';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable, map, throwError } from 'rxjs';

class ReponseProduct{
  constructor(public pk: number, public quantity: number) {}
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = 'http://127.0.0.1:8000/warehouse/order/'
  private sendProductUrl = 'http://127.0.0.1:8000/warehouse/order/send/'

  constructor(private http: HttpClient) { }

  private data: Product[] = []
  private responses: ReponseProduct[] = []

  getProducts() : Observable<Product[]>{
    return this.http.get<Product[]>(this.productUrl) 
  }

  sendProductsToOrder(products: Product[], quantities: { [key: number]: number }){
    for(var p of products){
      let quantity = quantities[p.pk]
      if(quantity != null && quantity > 0) this.responses.push(new ReponseProduct(p.pk, quantity))
    }

    if(this.responses.length > 0){
      const jsonData = JSON.stringify(this.responses)
      this.http.post(this.sendProductUrl, jsonData).subscribe(
        response => {
          console.log('Data sent successfully:', response);
        },
        error => {
          console.error('Error sending data:', error);
        }
      );
    }

    this.responses = []
  }

}
