import {Component, inject, Input, input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ModalComponent} from "../../modal/modal.component";
import {UserFormComponent} from "../../user/user-from/user-form.component";
import {ICategory, IProduct} from "../../../interfaces";
import {ProductFormComponent} from "../product-form/product-form.component";
import {ProductService} from "../../../services/product.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {GamesFormComponent} from "../../game/games-form/games-form.component";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    ProductFormComponent,
    GamesFormComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  @Input() itemList: IProduct[]= [];
  public selectedItem: IProduct = {};
  public selectedItemCat: ICategory = {};
  private productService = inject(ProductService);
  public modalService = inject(NgbModal);

  showDetailModal(item: IProduct, modal:any) {
    this.selectedItem= {...item};
    if (this.selectedItem.category) {
      this.selectedItemCat = this.selectedItem.category;
    }
    console.log(this.selectedItemCat);
    modal.show()
  }
  onFormEventCalled(params: IProduct) {
    this.productService.save(params);
    this.modalService.dismissAll();
  }
  deleteProduct(product: IProduct) {
    this.productService.delete(product);
  }
}
