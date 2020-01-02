import { SearchPipe } from './../search.pipe';
import { PaginationService } from './../Services/pagination.service';
import { Component, OnInit, Pipe } from '@angular/core';
import { CatalogueService } from 'app/Services/catalogue.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/Services/authentication.service';

@Component({
  selector: 'app-admin-produits',
  templateUrl: './admin-produits.component.html',
  styleUrls: ['./admin-produits.component.scss']
})
export class AdminProduitsComponent implements OnInit {

  produits;
  mode = 'list';
  i_start = 0;
  i_end = 5;
  dataIdexes;
  currentPage = 0;
  cats;
  currentCat;
  currentProduit;
  currentCatUrl: any;
  term = '';
  constructor(private catService: CatalogueService,
    private router: Router,
    private authService: AuthenticationService,
    private paginationService: PaginationService,
    private pipeSearch: SearchPipe) {
    this.getAllProducts();
    this.getAllCategories();

  }
  getAllCategories() {
    this.catService.getAllCtategories()
      .subscribe(
        data => {
          let dataArray = data['_embedded'];
          this.cats = dataArray['categories'];
          console.log(this.cats);
        },
        err => { console.log(err) }

      )
  }

  setCurentCategorie(c) {
    this.currentCatUrl = c;
  }
  ngOnInit() {

  }

  initiliazePagination(dataArray) {
    console.log("============ initiliazePagination(dataArray)================");
    this.paginationService.setData(dataArray, 5);
    this.dataIdexes = ([...Array(this.paginationService.getNumberOfPages()).fill(0)]);

  }

  getAllProducts() {
    console.log("============ getAllProducts()================");
    this.catService.getAllProduits()
      .subscribe(
        data => {
          let dataEmbeded = data['_embedded'];
          this.produits = dataEmbeded['products'];
          this.initiliazePagination(this.produits);
        },
        err => { console.log(err) }

      )
  }
  previoustPage() {
    this.currentPage = this.paginationService.previousPage(this.currentPage);
    this.loadPage(this.currentPage);
  }
  nextPage() {
    this.currentPage = this.paginationService.nextPage(this.currentPage);
    this.loadPage(this.currentPage);

  }
  loadPage(i) {
    console.log("============loadPage(i) ================");
    this.i_start = this.paginationService.getIndexstrat(i);
    this.i_end = this.paginationService.getIndexend(i);
    this.currentPage = i;
    console.log(this.currentPage);
  }

  onNewProd() {
    if (this.mode != 'new-prod') {
      this.mode = 'new-prod';
    } else {
      this.mode = 'list';
    }

  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  isUser() {
    return this.authService.isUser();
  }

  isAuth() {
    return this.authService.isAuthentificated();
  }

  onSaveProd(value) {
    this.mode = "list";
    let url = this.catService.host + '/products';
    console.log(url);
    console.log(value);
    
    this.catService.postRessource(url, value).
      subscribe(
        data => {
          this.getAllProducts();
          this.loadPage(this.paginationService.getNumberOfPages() - 1);
        },
        err => {
          console.log(err);
        }
      );

  }
  onEditProdForm(value) {
    this.mode = "list";
    console.log(value);
    
    this.catService.putRessource(this.currentProduit._links.self.href, value).
      subscribe(
        data => {

          this.getAllProducts();
        },
        err => {
          console.log(err);
        }
      );
  }
  onDeleteProd(p) {
    let c = confirm("Etes vous sûre ?");
    if (!c) return;
    console.log("Delete");
    this.catService.deleteRessource(p._links.self.href).
      subscribe(
        data => {
          this.getAllProducts();
        },
        err => { console.log(err) }
      )
  }
  onEditProd(p) {

    console.log(p);
    this.currentProduit = p;
    this.catService.getRessource(p._links.category.href).subscribe(
      data => {
      this.currentCat = data;
        console.log(this.currentCat);
        this.mode = "edit-prod";
      },
      err => { console.log(err) }
    );


  }
  paginationProduits() {

  }
}
