import { Observable, Subject, observable, of } from 'rxjs';
import { Product, productCategory } from './../../Model/Product';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder, private _productService: ProductsService, private _modalService: NgbModal, private _route: ActivatedRoute, private _router: Router) { }

  product: FormGroup;
  productCategories: Array<string>;
  detailsSubject = new Subject<boolean>();
  submitted: boolean = false;
  selectedProductId: number = -1;
  productData: Product;
  imageUrl: string;


  ngOnInit(): void {
    this.product = this._formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(new RegExp('^([a-zA-Z]([ ]{0,1}[a-zA-Z])*){1,50}$'))]],
      category: ['', [Validators.required]],
      description: [null, [Validators.required]],
      quantity: [null, [Validators.required, Validators.min(1), Validators.max(100), Validators.pattern(new RegExp('^[0-9]{1,3}$'))]],
      cost: [null, [Validators.required, Validators.min(.01), Validators.pattern(new RegExp("^[0-9]*([.]{0,1}[0-9]{0,2}){0,1}$"))]],
      currency: [null, [Validators.required, Validators.pattern(new RegExp("^[A-Za-z]{3}$"))]],
      image: [null, [Validators.required, Validators.pattern(new RegExp('^.*\.([jJ][pP][eE]?[gG]|[pP][nN][gG])$'))]]
    });
    this.productCategories = Object.values(productCategory);
    if (!this._productService.status.loading) {
      this._productService.fetchData();
    }

    if (this._route.snapshot.params.id) {
      this.selectedProductId = this._route.snapshot.params.id;
      this._route.paramMap.subscribe(params => {
        this.selectedProductId = +params.get('id');
        this._productService.getProductById(this.selectedProductId);
      });

      this._productService.productData$.subscribe(data => {
        if (data) {
          this.productData = data;
          this.imageUrl = this.productData.image;
          this.product.patchValue({...this.productData, image:""});
        } else if (this._productService.status.loaded) {
          this._router.navigate(['/productList']);
        }
      });
    }
  }

  get p() {
    return this.product.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.product.valid) {
      this._productService.addProduct(this.product.value).subscribe(data => {
        this._productService.status = { ...this._productService.status, products: data.products };
      }, error => {
        console.log("Error in saving data");
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.product.reset();
  }

  openPopup(): Observable<boolean> {
    const modalRef = this._modalService.open(ModalComponent);
    return modalRef.componentInstance.confirmDeactivation;
  }

  fileChanged(event) {
    let file: File = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this._productService.jsonData = { ...this._productService.jsonData, fileName: file.name, type: file.type, base64Data: fileReader.result.toString() }
    }
    fileReader.readAsDataURL(file);
  }
}
