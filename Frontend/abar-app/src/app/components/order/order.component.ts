import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductService } from '../../../services/product-service/product.service';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth-service/auth.service';


@Component({
  standalone: true,
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  imports: [ CommonModule, FormsModule ],
})

export class OrderComponent implements OnInit {

  products: Product[] = []
  response: { [key: number]: number } = {}
  quantities: { [key: number]: number } = {}
  total: number = 0

  constructor(private productService: ProductService, private authService: AuthService){}
  
  ngOnInit(){
    this.productService.getProducts().subscribe(
      (response) => this.products = response
    )

  }
  
  toggleProduct(index: number){
    this.products[index].isSelected = !this.products[index].isSelected
    if(!this.products[index].isSelected){
      if(this.quantities[this.products[index].pk] !== undefined){
        this.total -= this.products[index].price * this.quantities[this.products[index].pk]
      }
    } else {
      if(this.quantities[this.products[index].pk] !== undefined){
        this.total += this.products[index].price * this.quantities[this.products[index].pk]
      }
    }
  }

  calculateSum(event: Event, index: number){
    const target = event.target as HTMLInputElement; 
    let inputValue = +target.value; 
    if(isNaN(inputValue) || inputValue < 0){ 
      inputValue = 0; 
    }

    this.quantities[index] = inputValue

    this.total =  this.products.filter(product => product.isSelected)
                          .reduce((sum, product) => sum + product.price * this.quantities[product.pk], 0);

  }

  order(){
    const selected = this.products.filter(product => product.isSelected === true)
    this.productService.sendProductsToOrder(selected, this.quantities, this.authService.getAccountId())
  }

}
