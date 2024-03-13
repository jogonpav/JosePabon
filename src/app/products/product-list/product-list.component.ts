import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product.interface';
import { DatashareService } from '../services/datasshare/datashare.service';
import { ProductsServices } from '../services/product-service/products-services.service';

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
  filteredProducts: Product[] = []

  modalOpen: boolean = false;
  deleteDataId: string = '';

  menuStyle: any = {
    'display:': 'none'
  }
  productRecord!: Product;
  activeDropdown = false;


/*   @ViewChild('iconEditDropDown') iconEditDropDown!: ElementRef;

  @ViewChild('dropdownMenutest') productSelect!: ElementRef; */

  constructor(
    private productsSevice: ProductsServices, 
    private renderer: Renderer2,
    private router: Router,
    private dataShareService: DatashareService
    ) {
    this.renderer.listen('window', 'click', (e: Event ) => {
      this.handleWindowClickEvent(e);
      /* const element = e.target as HTMLDivElement
      const classes = element.classList

      if(element.classList[0] !== 'icon-edit' && this.activeDropdown){
        this.closeMenu();
        this.activeDropdown = false;
      } */
    }) 

  /*   this.renderer.listen('window', 'click', (event: Event ) => {
      this.handleWindowClickEvent(event);
    }) */
  }

  ngOnInit(): void {
    this.loadProducts();
    this.renderer.listen('window', 'click', (event: Event ) => {
      this.handleWindowClickEvent(event);
    })
  }

  onSearch() {
    this.currentPage = 1;
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

    if (this.searchProduct) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(this.searchProduct.toLowerCase())
      );
    }

    const startIndex = (this.currentPage - 1) * this.pageSize;
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
    this.currentPage = 1; 
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

    this.activeDropdown = true;

    this.menuStyle = {
      'display': 'block',
      'position': 'absolute',
      'left.px': event.clientX -70 + document.documentElement.scrollLeft,
      'top.px': event.clientY - 90 + document.documentElement.scrollTop
    };
    this.productRecord = product;
  }

  closeMenu() {
    this.menuStyle = {
      'display': 'none'
    }
  }

  editProduct() {
    this.dataShareService.setEditData(this.productRecord);
    this.router.navigate(['/', 'edit-product'])
    this.closeMenu()
  }

  deleteProductOption(){
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
    this.deleteProduct();
  }

  deleteProduct(){
    this.productsSevice.deleteProduct(this.deleteDataId).subscribe({
      next: ()=>this.loadProducts(),
      error: (error)=> console.error('Error al eliminar el producto:', error)
    });
  }

  handleWindowClickEvent(event: Event) {
    const element = event.target as HTMLDivElement;
    
    if (element.classList[0] !== 'icon-edit' && this.activeDropdown) {
      this.closeMenu();
      this.activeDropdown = false;
    }
  }

}
