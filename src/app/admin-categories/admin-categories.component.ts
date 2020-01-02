import { Component, OnInit, Input } from '@angular/core';
import { CatalogueService } from 'app/Services/catalogue.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/Services/authentication.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {


  cats;
  currentCategorie;
  mode = 'list';


  constructor(private catService: CatalogueService, private router: Router, private authService: AuthenticationService) {
    this.getAllCategories();
  }

  getAllCategories() {
    this.catService.getAllCtategories()
      .subscribe(
        data => { this.cats = data['_embedded']; },
        err => { console.log(err) }

      )
  }

  ngOnInit() {

  }
  onGetProducts(cat: any) {
    this.currentCategorie = cat;
    let url = cat._links.products.href;
    console.log(url);
    this.router.navigateByUrl("/products/" + btoa(url))

  }

  isCategoriUsed(cat) {
    console.log(cat._links.products.href);
    this.catService.getRessource(cat._links.products.href).subscribe
      (
        data => {
          let Object = data["_embedded"];
          let products: any[] = Object.products;

          if (products.length > 0)
            {
              confirm("Impossible de supprimer la catégorie !!");

            }
            else{
this.deleteCat(cat);
            }

           
          
        },
        err => { console.log("Erreur") }
      );


    }

    deleteCat(cat)
    {
      
    let c = confirm("Etes vous sûre ?");
    if (!c) return;
    console.log("Delete");


    this.catService.deleteRessource(cat._links.self.href).
      subscribe(
        data => {
          this.getAllCategories();
        },
        err => { console.log(err) }
      )
    }
  onDeleteCat(cat) {
this.isCategoriUsed(cat);
  }
  onNewCat() {
    if (this.mode != "new-cat")
      this.mode = "new-cat";
    else
      this.mode = "list";
  }

  onSaveCat(value) {
    this.mode = "list";
    console.log(value);
    let url = this.catService.host + "/categories";
    console.log(url);
    this.catService.postRessource(url, value).
      subscribe(
        data => {

          this.getAllCategories();
        },
        err => {
          console.log(err);
        }
      );

  }

  onEditCat(cat) {
    this.mode = "edit-cat";
    this.catService.getRessource(cat._links.self.href).
      subscribe(
        data => { this.currentCategorie = data },
        err => { console.log(err) }
      );
  }

  onEditCatForm(value) {
    this.mode = "list";
    console.log(value);

    this.catService.putRessource(this.currentCategorie._links.self.href, value).
      subscribe(
        data => {

          this.getAllCategories();
        },
        err => {
          console.log(err);
        }
      );
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

}
