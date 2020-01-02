import { PaginationService } from './../Services/pagination.service';
import { CatalogueService } from 'app/Services/catalogue.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/Services/authentication.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  mode = 'list';
  roles: any[];
  currentUser;
  currentRole;
  term;
  users;
  i_start = 0;
  i_end = 5;
  dataIdexes;
  currentPage = 0;
  role;
  constructor(private catService: CatalogueService,
    private router: Router,
    private authService: AuthenticationService,
    private paginationService: PaginationService) {
    this.getAllUsers();
    this.getAllRoles();

  }

  ngOnInit() {
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
  onNewUser() {
    if (this.mode != 'new-user') {
      this.mode = 'new-user';
    } else {
      this.mode = 'list';
    }
  }
  onSaveUser(value) {
    console.log(value);

    this.mode = 'list';
    let url = this.authService.host + '/register';
    this.authService.postRessource(url, value).
      subscribe(
        data => {
          this.getAllUsers();
          this.loadPage(this.paginationService.getNumberOfPages() - 1);
        },
        err => {
          console.log(err);
        }
      );
  }
  setCurentRole(value) {
    this.role = value;
    console.log(value);
  }
  onEditProdForm(value) {
    this.mode = "list";
    console.log(value);

    this.catService.putRessource(this.currentUser._links.self.href, value).
      subscribe(
        data => {

          this.getAllUsers();
        },
        err => {
          console.log(err);
        }
      );
  }
  onDeleteUser(u) {
    let c = confirm("Etes vous sûre ?");
    if (!c) return;
    console.log("Delete");
    this.authService.deleteRessource(u._links.self.href).
      subscribe(
        data => {
          this.getAllUsers();
        },
        err => { console.log(err) }
      )
  }
  onEditUser(u) {
    this.currentUser = u;
    console.log(u)
    this.authService.getRessource(u._links.roles.href).subscribe(
      data => {
        this.currentRole = data["_embedded"].appRoles[0];
        console.log(this.currentRole);
        this.mode = "edit-user";
      },
      err => { console.log(err); }
    );

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
    this.i_start = this.paginationService.getIndexstrat(i);
    this.i_end = this.paginationService.getIndexend(i);
    this.currentPage = i;
    console.log(this.currentPage);
  }

  getAllUsers() {
    this.authService.getAllUsers()
      .subscribe(
        data => {
          let dataEmbeded = data['_embedded'];
          this.users = dataEmbeded['appUsers'];
          console.log(this.users);
          this.initiliazePagination(this.users);
        },
        err => { console.log(err) }

      )
  }

  getAllRoles() {
    this.authService.getAllRoles()
      .subscribe(
        data => {
          let dataEmbeded = data['_embedded'];
          this.roles = dataEmbeded['appRoles'];
          console.log(this.roles);
        },
        err => { console.log(err) }

      )
  }

  initiliazePagination(dataArray) {
    this.paginationService.setData(dataArray, 5);
    this.dataIdexes = ([...Array(this.paginationService.getNumberOfPages()).fill(0)]);

  }
}
