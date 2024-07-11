import {Component, Input, input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ModalComponent} from "../../modal/modal.component";
import {UserFormComponent} from "../../user/user-from/user-form.component";
import {ICategory, IProduct} from "../../../interfaces";
import {ProductFormComponent} from "../product-form/product-form.component";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    ProductFormComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  @Input() itemList: IProduct[]= [];
  public selectedItem: IProduct = {};
  public selectedItemCat: ICategory | undefined = {};

  showDetailModal(item: IProduct, modal:any) {
    this.selectedItemCat = this.selectedItem.category;
    this.selectedItem= {...item};
    modal.show()
  }
}
