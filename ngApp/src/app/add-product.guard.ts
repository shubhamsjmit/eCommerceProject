import { ProductsService } from './products/products.service';
import { AddProductsComponent } from './products/add-products/add-products.component';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate, Router, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from './Model/Product';

@Injectable({
  providedIn: 'root'
})
export class AddProductGuard implements CanDeactivate<AddProductsComponent> {
  canDeactivate(component: AddProductsComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(component.product.pristine) {
      return true;
    }
    return component.openPopup();
  }

}
