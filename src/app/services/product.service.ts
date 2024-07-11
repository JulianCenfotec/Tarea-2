import {Injectable, signal} from '@angular/core';
import {BaseService} from "./base-service";
import {IProduct} from "../interfaces";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<IProduct>{
  protected override source: string = 'products';

  private itemListSignal = signal<IProduct[]>([]);

  get items$() {
    return this.itemListSignal
  }

  public getAll() {
    this.findAll().subscribe({
      next: (response: any) => {
        this.itemListSignal.set(response);
    }, error: (error: any) => {
        console.log('error', error);
      }
    });
  }

  public save(item: IProduct) {
   this.add(item).subscribe({
     next: (response: any) => {
       this.itemListSignal.update((products: IProduct[]) => [response, ...products]);
     }, error: (error: any) => {
       console.log('error', error);
     }
   })
  }
}
