import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { TablesComponent } from './tables/tables.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { ProduitsComponent } from './produits/produits.component';
import { LoginComponent } from './login/login.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminProduitsComponent } from './admin-produits/admin-produits.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';



export const routes: Routes = [
  { path: 'home',      component: HomeComponent },
  {path:"products/:url",         component:ProduitsComponent},
  { path: 'login',           component: LoginComponent },
  { path: 'admincategories',           component: AdminCategoriesComponent },
  { path: 'adminproduits',           component: AdminProduitsComponent },
  { path: 'adminusers',           component: AdminUsersComponent }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
