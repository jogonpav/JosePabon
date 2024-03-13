import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product.interface';
import { DatashareService } from '../services/datashare.service';
import { ProductsServices } from '../services/products-services.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  searchProduct = '';
  pageSizeOptions = [5, 10, 20];
  currentPage = 1;
  pageSize = 5;
  allProducts: Product[] = [];
  productsToShow: Product[] = [];

  modalOpen: boolean = false;
  deleteDataId: string = '';

  menuSytle: any = {
    'display:': 'none'
  }
  productRecord!: Product;
  activeDrodow = false;


/*   @ViewChild('iconEditDropDown') iconEditDropDown!: ElementRef;

  @ViewChild('dropdownMenutest') productSelect!: ElementRef; */

  constructor(
    private productsSevice: ProductsServices, 
    private renderer: Renderer2,
    private router: Router,
    private dataShareService: DatashareService
    ) {
    this.renderer.listen('window', 'click', (e: Event ) => {
      const element = e.target as HTMLDivElement
      const classes = element.classList
      console.log(classes)

      if(element.classList[0] !== 'icon-edit' && this.activeDrodow){
        console.log('es diferente')
        this.closeMenu();
        this.activeDrodow = false;
      }
    })
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  onSearch() {
    this.currentPage = 1; // Reiniciar a la primera página al buscar
    this.applyFilters();
  }


  loadProducts() {
    this.productsSevice.getProducts().subscribe((data: Product[]) => {
      this.allProducts = data;
      this.applyFilters();
    },(error) => {
      console.error('Error al cargar productos:', error);
    });
  }

  applyFilters() {
    let filteredProducts = [...this.allProducts];

    // Apply search
    if (this.searchProduct) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(this.searchProduct.toLowerCase())
      );
    }
    // Apply pagination
    const startIndex = (this.currentPage - 1) * this.pageSize;
    console.log("startIndex " + startIndex)
    this.productsToShow = filteredProducts.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number[] {
    const totalProducts = this.allProducts.length;
    const numberPage = new Array(0);

    for (let i = 0; i < Math.ceil(totalProducts / this.pageSize); i++) {
      numberPage[i] = i + 1;
    }

    //return Array(Math.ceil(totalProducts / this.pageSize)).fill(0).map((x, i) => i + 1);
    return numberPage;
  }

  onPageSizeChange(event: any) {
    const selectedPageSize = event.target.value;
    this.currentPage = 1; // Reiniciar a la primera página al cambiar el tamaño de la página
    this.pageSize = selectedPageSize;
    this.applyFilters();
  }

  selectPage(page: number) {
    if (page > 0 && page <= this.totalPages.length) {
      this.currentPage = page;
    }
    this.applyFilters();
  }

  showDropdown: boolean = false;

  toggleDropdown(event: any, product: Product) {

    console.log(event)

    this.activeDrodow = true;

    this.menuSytle = {
      'display': 'block',
      'position': 'absolute',
      'left.px': event.clientX -70 + document.documentElement.scrollLeft,
      'top.px': event.clientY - 90 + document.documentElement.scrollTop
    };
    this.productRecord = product;
  }

  closeMenu() {
    this.menuSytle = {
      'display:': 'none'
    }
  }

  editProduct() {
    // Lógica para editar el ítem
    console.log('seleccionado el elemento para editar ')
    console.log(this.productRecord)
    this.dataShareService.setDatosEditar(this.productRecord);
    this.router.navigate(['/', 'edit-product'])
    this.closeMenu()
  }

  deleteProduct(){
    this.deleteDataId = this.productRecord.id;
    this.closeMenu();
    this.openModal();
  }

  openModal() {
    this.modalOpen = true;
  }

  modalClosed() {
    this.modalOpen =false;
  }

  modalConfirmed() {
    this.deteleProduct();
  }

  deteleProduct(){
    this.productsSevice.deleteProduct(this.deleteDataId).subscribe((data)=>{
      this.loadProducts()
    },(error) => {
      console.error('Error al eliminar el producto:', error);
    });
  }

}
