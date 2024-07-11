import {Component, inject, OnInit} from '@angular/core';
import {ModalComponent} from "../../components/modal/modal.component";
import {LoaderComponent} from "../../components/loader/loader.component";
import {ProductListComponent} from "../../components/product/product-list/product-list.component";
import {ProductService} from "../../services/product.service";
import {ProductFormComponent} from "../../components/product/product-form/product-form.component";
import {IProduct} from "../../interfaces";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../services/auth.service";

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
  public route: ActivatedRoute = inject(ActivatedRoute);
  public authService: AuthService = inject(AuthService);
  public routeAuthorities: string[] = [];
  public areActionsAvailable: boolean = false;

  ngOnInit(): void {
    this.authService.getUserAuthorities();
    this.productService.getAll();
    this.route.data.subscribe( data => {
      this.routeAuthorities = data['authorities'] ? data['authorities'] : [];
      this.areActionsAvailable = this.authService.areActionsAvailable(this.routeAuthorities);
    });
  }

  onFormEventCalled(params: IProduct) {
    this.productService.save(params);
    this.modalService.dismissAll();
  }
}
