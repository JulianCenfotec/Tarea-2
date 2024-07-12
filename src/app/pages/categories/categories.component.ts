import {Component, inject, OnInit} from '@angular/core';
import {LoaderComponent} from "../../components/loader/loader.component";
import {ModalComponent} from "../../components/modal/modal.component";
import {CategoryListComponent} from "../../components/category/category-list/category-list.component";
import {CategoryFormComponent} from "../../components/category/category-form/category-form.component";
import {CategoryService} from "../../services/category.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    LoaderComponent,
    ModalComponent,
    CategoryListComponent,
    CategoryFormComponent
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
  public modalService: NgbModal = inject(NgbModal);
  public categoryService = inject(CategoryService);
  public route: ActivatedRoute = inject(ActivatedRoute);
  public authService: AuthService = inject(AuthService);
  public routeAuthorities: string[] = [];
  public areActionsAvailable: boolean = false;

  ngOnInit(): void {
    this.authService.getUserAuthorities();
    this.categoryService.getAll();
    this.route.data.subscribe( data => {
      this.routeAuthorities = data['authorities'] ? data['authorities'] : [];
      this.areActionsAvailable = this.authService.areActionsAvailable(this.routeAuthorities);
    });
  }

  onFormEventCalled(params: any) {
    this.categoryService.save(params);
    this.modalService.dismissAll();
  }

}
