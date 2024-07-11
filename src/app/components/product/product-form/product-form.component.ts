import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ICategory, IGame, IProduct} from "../../../interfaces";

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  @Input() title: string = '';
  @Input() categoryId: number = 0;
  @Input() toUpdateProduct: IProduct  = {};
  @Input() toUpdateCategory: ICategory  = {};
  @Output() callParentEvent: EventEmitter<IProduct> = new EventEmitter<IProduct>();

  addEdit() {
    this.toUpdateProduct.category = this.toUpdateCategory;
    console.log(this.toUpdateProduct)
    this.callParentEvent.emit(this.toUpdateProduct);
  }

}
