import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'app/Services/authentication.service';

declare const $: any;


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  
  @Input()
  public isAuth: boolean=false;
  
  menuItems: any[];

  constructor(private authService:AuthenticationService) { }

  ngOnInit() {
    
    console.log(this.isAuth);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  
  isAdmin()
  {
      return this.authService.isAdmin();
  }

  isUser()
  {
      return this.authService.isUser();
  }
}
