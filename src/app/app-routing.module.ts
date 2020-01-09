import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayPostComponent } from './pages/display-post/display-post.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { PostsComponent } from './pages/posts/posts.component';
const routes: Routes = [
  {path: '', redirectTo: '/posts', pathMatch: 'full'},
  {path: 'posts', component: PostsComponent},
  {path: 'posts/page/:pagenumber', component: PostsComponent},
  {path: 'post/:id', component: DisplayPostComponent},
  {path: 'category/:id', component: CategoryPageComponent},
  {path: 'category/:id/page/:pagenumber', component: CategoryPageComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'error', component: ErrorPageComponent},
  {path: '**', component: ErrorPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
