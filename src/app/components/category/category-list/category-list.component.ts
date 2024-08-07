import {Component, inject, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ModalComponent} from "../../modal/modal.component";
import {ProductFormComponent} from "../../product/product-form/product-form.component";
import {GamesFormComponent} from "../../game/games-form/games-form.component";
import {ICategory, IProduct} from "../../../interfaces";
import {ProductService} from "../../../services/product.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CategoryFormComponent} from "../category-form/category-form.component";
import {CategoryService} from "../../../services/category.service";

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    ModalComponent,
    GamesFormComponent,
    CategoryFormComponent
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnChanges{
  @Input() itemList: ICategory[]= [];
  @Input() areActionsAvailable: boolean = false;
  public selectedItem: ICategory = {};
  private categoryService = inject(CategoryService);
  public modalService = inject(NgbModal);

  ngOnChanges(changes: SimpleChanges) {
    if(changes['areActionsAvailable']) {
      console.log('areActionsAvailable', this.areActionsAvailable);
    }
  }

  showDetailModal(item: ICategory, modal:any) {
    this.selectedItem= {...item};
    modal.show()
  }
  onFormEventCalled(params: ICategory) {
    this.categoryService.save(params);
    this.modalService.dismissAll();
  }
  deleteCategory(category: ICategory) {
    this.categoryService.delete(category);
  }

}
