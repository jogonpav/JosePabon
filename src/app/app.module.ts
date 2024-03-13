import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ReleaseDateValidator } from './shared/validators/product.validators';
import { ModalComponent } from './shared/modal/modal.component';
import { HeaderComponent } from './shared/header/header.component';
import { EditComponent } from './products/edit/edit.component';
import { CreateComponent } from './products/create2/create.component';
import { FormProductComponent } from './products/form-product/form-product.component';
import { DatashareService } from './products/services/datasshare/datashare.service';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ModalComponent,
    EditComponent,
    FormProductComponent,
    CreateComponent,
    HeaderComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: 'ReleaseDateValidator', useValue: ReleaseDateValidator }, 
    DatePipe],
    bootstrap: [AppComponent]
})
export class AppModule { }
