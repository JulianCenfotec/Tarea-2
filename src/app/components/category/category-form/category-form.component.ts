import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ICategory, IProduct} from "../../../interfaces";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {
  @Input() title: string = '';
  @Input() toUpdateCategory: ICategory  = {};
  @Output() callParentEvent: EventEmitter<ICategory> = new EventEmitter<ICategory>();

  addEdit() {
    console.log(this.toUpdateCategory)
    this.callParentEvent.emit(this.toUpdateCategory);
  }
}
