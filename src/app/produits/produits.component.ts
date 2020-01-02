import { Component, OnInit } from '@angular/core';
import { CatalogueService } from 'app/Services/catalogue.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.scss']
})
export class ProduitsComponent implements OnInit {

  public products:any;
 
  constructor(private catService:CatalogueService,private route:ActivatedRoute,private router:Router) { 
    router.events.subscribe(
      event=>{
        if(event instanceof NavigationEnd)
        {
          let params:string=atob(this.route.snapshot.params.url);
          this.getProducts(params);
        }
      }
    );
    this.getProducts(atob(this.route.snapshot.params.url));
    
  }

  ngOnInit() {
    
  }

  getProducts(urlId)
  {
  
 this.catService.getRessource(urlId)
 .subscribe(
   data=>{console.log(data);this.products=data["_embedded"];},
   err=>{console.log(err)}
 );
  }

}
