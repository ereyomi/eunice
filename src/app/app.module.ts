import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CommentsComponent } from './layout/comments/comments.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PostsComponent } from './pages/posts/posts.component';
import { IntroComponent } from './layout/intro/intro.component';
import { ContentLoaderComponent } from './layout/content-loader/content-loader.component';

import { MaterialModule } from './material.module';
import {MatNativeDateModule} from '@angular/material/core';

import { HttpClientModule } from '@angular/common/http';
import { WpService } from './services/wpservice.service';
import { TruncatePipe } from './pipe/truncate.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriesComponent } from './layout/categories/categories.component';
import { AsideComponent } from './layout/aside/aside.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { NestedCommentComponent } from './layout/comments/nested-comment/nested-comment.component';
import { PostComponent } from './layout/post/post.component';
import { DisplayPostComponent } from './pages/display-post/display-post.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { CommentFormComponent } from './layout/comments/comment-form/comment-form.component';
import { PaginationComponent } from './layout/pagination/pagination.component';
import { LoaderComponent } from './layout/loader/loader.component';
@NgModule({
  declarations: [
    TruncatePipe,
    AppComponent,
    NavbarComponent,
    AboutComponent,
    ContactComponent,
    NestedCommentComponent,
    CommentFormComponent,
    CommentsComponent,    
    PostsComponent,
    PostComponent,
    DisplayPostComponent,
    IntroComponent,
    ContentLoaderComponent,
    CategoriesComponent,
    AsideComponent,
    CategoryPageComponent,
    ErrorPageComponent,
    PaginationComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    MaterialModule,
    MatNativeDateModule,  
    ReactiveFormsModule,  
  ],
  providers: [WpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
