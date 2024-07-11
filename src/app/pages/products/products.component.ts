import {Component, inject, OnInit} from '@angular/core';
import {ModalComponent} from "../../components/modal/modal.component";
import {LoaderComponent} from "../../components/loader/loader.component";
import {ProductListComponent} from "../../components/product/product-list/product-list.component";
import {ProductService} from "../../services/product.service";
import {UserFormComponent} from "../../components/user/user-from/user-form.component";
import {ProductFormComponent} from "../../components/product/product-form/product-form.component";
import {IProduct} from "../../interfaces";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ModalComponent,
    LoaderComponent,
    ProductListComponent,
    ProductFormComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  public modalService: NgbModal = inject(NgbModal);
  public productService = inject(ProductService);

  constructor() {
    this.productService.getAll();
  }
  onFormEventCalled(params: IProduct) {
    this.productService.save(params);
    this.modalService.dismissAll();
  }
}
