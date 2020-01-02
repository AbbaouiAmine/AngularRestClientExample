import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/Services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auhService:AuthenticationService,private router:Router) { }

  ngOnInit() {
  }

  onLogin(user)
  {
    this.auhService.login(user)
    .subscribe(
      resp=>{
        
      let jwt=resp.headers.get('Authorization');
      console.log(jwt);
      this.auhService.saveToken(jwt);

      console.log(this.isAuthentificated());
      this.router.navigateByUrl("/");
      },
      err=>{console.log(err)}
    );
    //console.log(user);
  }

  isAdmin()
  {
      return this.auhService.isAdmin();
  }

  isUser()
  {
      return this.auhService.isUser();
  }

  isAuthentificated()
  {
    return this.auhService.isAuthentificated();
  }

}
