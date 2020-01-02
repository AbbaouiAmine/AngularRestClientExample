import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { AuthenticationService } from './Services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

     constructor(public location: Location,private authService:AuthenticationService) {}

    ngOnInit(){
    this.authService.loadToken();
    }

    isMap(path){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      titlee = titlee.slice( 1 );
      if(path == titlee){
        return false;
      }
      else {
        return true;
      }
    }

isAdmin()
{
  return this.authService.isAdmin();
}

isUser()
{
  return this.authService.isUser();
}

isAuthentificated()
{
  return this.authService.isAuthentificated();
}


}
