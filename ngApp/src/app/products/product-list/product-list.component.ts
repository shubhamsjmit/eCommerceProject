import { Product } from './../../Model/Product';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private _productService: ProductsService) { }

  products: Product[] = [];

  ngOnInit(): void {
    if(!this._productService.status.loading) {
      this._productService.fetchData();
    }
    if(this._productService.status.loaded || this._productService.status.errors) {
      this.products = this._productService.status.products;
    } else {
      this._productService.fetchInProgress$.subscribe(data=> {
        if(data) {
          this.products = this._productService.status.products;
        }
      });
    }
  }

  pDescription(description: string): string {
    if(description.length > 120) {
      return description.slice(0,120);
    } else {
      return description;
    }
  }

  displayMoreDescription(description: string): boolean {
    if(description.length > 120) {
      return true;
    } else {
      return false;
    }
  }
  public getJSON() {
    this._productService.getData().subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
}

