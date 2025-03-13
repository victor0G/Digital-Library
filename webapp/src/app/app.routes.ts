import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MembershipComponent } from './pages/membership/membership.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { LoginComponent } from './pages/login/login.component';
import { MybooksComponent } from './pages/mybooks/mybooks.component';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: HomeComponent,
  },
  {
    path: 'home',
    title: 'Home',
    component: HomeComponent,
  },
  {
    path: 'membership',
    title: 'Membership',
    component: MembershipComponent,
  },
  {
    path: 'contact',
    title: 'Contact Us',
    component: ContactComponent,
  },
  {
    path: 'categories',
    title: 'Books Categories',
    component: CategoriesComponent,
  },
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent,
  },
  {
    path: 'mybooks',
    title: 'books-section',
    component:MybooksComponent,
  },
  {
    path: 'admin',
    title: 'admin-panel',
    component:AdminComponent,
  },
];
