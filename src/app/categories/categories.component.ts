import { Component, OnInit, Input } from '@angular/core';
import { CatalogueService } from 'app/Services/catalogue.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit {

  @Input()
  public title: string;

  @Input()
  public subtitle: string;

  @Input()
  public footerText: string;
  
  @Input()
  public withHr: boolean;

  @Input()
  public footerIconClass: string;

  cats;
  currentCategorie;
  
  constructor(private catService:CatalogueService,private router:Router) { 
    this.catService.getAllCtategories()
    .subscribe(
      data=>{
        let arrayData=data["_embedded"];
        this.cats=arrayData["categories"];
      },
      err=>{console.log(err)}
      
      )
  }

  ngOnInit() {
    
  }
  onGetProducts(cat:any)
  {
    this.currentCategorie=cat;
    let url=cat._links.products.href;
    console.log(url);
    this.router.navigateByUrl("/products/"+btoa(url))
    
  }

}
