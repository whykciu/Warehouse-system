import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductService } from '../../../services/product-service/product.service';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  standalone: true,
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  imports: [ CommonModule, FormsModule ],
})

export class OrderComponent implements OnInit{

  products: Product[] = []
  response: { [key: number]: number } = {}
  quantities: { [key: number]: number } = {}

  constructor(private productService: ProductService){}
  
  ngOnInit(){
    this.productService.getProducts().subscribe(
      (response) => this.products = response
    )

  }
  
  toggleProduct(index: number){
    this.products[index].isSelected = !this.products[index].isSelected
  }

  order(){
    const selected = this.products.filter(product => product.isSelected === true)
    this.productService.sendProductsToOrder(selected, this.quantities)
  }


}
