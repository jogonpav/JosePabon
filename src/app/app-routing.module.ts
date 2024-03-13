import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Create2Component } from './products/create2/create2.component';
import { EditComponent } from './products/edit/edit.component';
import { ProductListComponent } from './products/product-list/product-list.component';

const routes: Routes = [
  { path: 'list-products', component: ProductListComponent },
  { path: 'create-product', component: Create2Component },
  { path: 'edit-product', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
