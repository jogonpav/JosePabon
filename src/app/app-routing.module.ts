import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './products/create2/create.component';
import { EditComponent } from './products/edit/edit.component';
import { ProductListComponent } from './products/product-list/product-list.component';

const routes: Routes = [
  { path: 'list-products', component: ProductListComponent },
  { path: 'create-product', component: CreateComponent },
  { path: 'edit-product', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
