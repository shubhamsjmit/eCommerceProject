import { JSONFormat, JSONModel } from './../Model/Product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { Product } from '../Model/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private _jsonURL = './app/Data/products.json';
  private _postURL = 'http://localhost:3000/postData';
  public jsonData: JSONFormat = {
    nextId: 0,
    products: [],
    base64Data: "",
    type: "",
    fileName: ""
  };
  public status: JSONModel = {
    loading: false,
    loaded: false,
    errors: false,
    products: []
  }
  public fetchInProgress$ = new BehaviorSubject<boolean>(false);
  public productData$ = new BehaviorSubject<Product>(null);

  constructor(private _http: HttpClient) {
  }

  addProduct(data: Product): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    data.id = this.jsonData.nextId;
    this.jsonData.fileName = data.id + this.jsonData.fileName;
    data.image = "/app/Images/" + this.jsonData.fileName;
    this.jsonData.products.push(data);
    this.jsonData.nextId++;
    return this._http.post(this._postURL, this.jsonData, options);
  }

  public getData(): Observable<Object> {
    this.status = { ...this.status, loading: true, loaded: false, errors: false };
    return this._http.get(this._jsonURL);
  }

  getProducts(): Product[] {
    return this.status.products;
  }

  fetchData() {
    this.getData().subscribe(data => {
      this.jsonData = data as JSONFormat;
      this.status = { ...this.status, loaded: true, products: this.jsonData.products };
      this.fetchInProgress$.next(true);
    }, error => {
      console.log("Error in fetching data from JSON");
      this.status = { ...this.status, errors: true };
      this.fetchInProgress$.next(false);
    });
  }

  getProductById(id: number) {
    if (!this.status.loading) {
      this.fetchData();
    }
    if (this.status.loaded || this.status.errors) {
      this.productData$.next(this.status.products.filter((data: Product) => data.id == id)[0]);
    } else {
      this.fetchInProgress$.subscribe(data => {
        if (data == true) {
          this.productData$.next(this.status.products.filter((data: Product) => data.id == id)[0]);
        } else if (this.status.loaded) {
          this.productData$.next(undefined);
        }
      });
    }
  }
}
