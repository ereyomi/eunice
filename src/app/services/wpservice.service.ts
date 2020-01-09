import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Config } from 'protractor';
@Injectable({
  providedIn: 'root'
})
export class WpService {
  //private domain = 'https://ereyomiblog.000webhostapp.com/';
  private domain = 'http://localhost:80/';
  private PostEndpoint = `${this.domain}wordpress/wp-json/wp/v2/posts`;
  //private PostEndpoint = 'https://ereyomiblog.000webhostapp.com/wordpress/wp-json/wp/v2/posts';
  private commentEndpoint = `${this.domain}wordpress/wp-json/wp/v2/comments`;
  private categoriesEndpoint = `${this.domain}wordpress/wp-json/wp/v2/categories`;
  private tokenUrl = `${this.domain}wordpress/wp-json/jwt-auth/v1/token`;
  private getPostBycategory = `${this.domain}wordpress/wp-json/wp/v2/posts?categories=`;
  private commentParent = `${this.domain}wordpress/index.php/wp-json/wp/v2/comments?parent=13`;
  storeToken: Observable<Object>;
  tokenData: any;
  query: string;
  category: any[];
  categoriesData: any[];
  constructor(private http: HttpClient,private router: Router) { }

handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      //error.statusText
      //error.status
      this.toRoute(error.status,error.statusText);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  toRoute(errorStatus: number, errorStatusText: string) {
    this.router.navigate(['/error'], 
      {
        queryParams: {status: errorStatus, statustext: errorStatusText}
      }
    );
  }

   getposts(pageNumber: number = 1): Observable<HttpResponse<Config>>{
    //'page=1&_embed'
    this.query = `?page=${pageNumber}&_embed`;
    console.log(`${this.PostEndpoint}${this.query}`);
    //return this.http.get(`${this.PostEndpoint}?${query}`);
    const endUrl = `${this.PostEndpoint}${this.query}`;
    //.pipe(
      //retry(3)
    //)
    return this.http.get<Config>(endUrl, { observe: 'response' });
  }
  getpost(id: number): Observable<any> {
    const url = `${this.PostEndpoint}/${id}?_embed`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched product id=${id}`)),
      catchError(this.handleError<any>(`getProduct id=${id}`))
    );
  }
  getProduct(id: number): Observable<any> {
    const url = `${this.PostEndpoint}/${id}`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched product id=${id}`)),
      catchError(this.handleError<any>(`getProduct id=${id}`))
    );
  }
 
  getTokenData(){
    
    let loginData = {
      username: 'ereyomi',
      password: 'ereyomi' 
      // username: 'myAuthor',
      // password: 'myAuthor'   
    }

    let options = { headers: new HttpHeaders({'Content-Type': 'application/json'})};

    this.storeToken = this.http.post(this.tokenUrl, loginData, options);
    return this.storeToken;
  }
  processToken(){
    return new Promise(
      (resolve, reject) => {
      this.getTokenData().subscribe(
        data => resolve(this.tokenData = data)
      );
      }
    );
  }
  async getToken(){
    try{
      await this.processToken();
      console.log("token: ",this.tokenData);
    }catch(e){
      console.log(e)
    }
    
  }

  comment(data){    

    let postData = {
      author_name: data.name,
      author_email: data.email,
      content: data.content,
      post: data.postID,
      //parent: 13,
    }
    console.log(postData);
    let options = { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${data.token}`
    })};
   return this.http.post(this.commentEndpoint, postData, options);

  }
  getPostComments(id: number){
    const url = `${this.commentEndpoint}?post=${id}`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched product id=${id}`)),
      catchError(this.handleError<any>(`getProduct id=${id}`))
    );
  }
  CreatePost (data){
    
    console.log(data.token);
    let postData = {
      title: 'from Angular 2 post',
      content: 'posted from angular',
      // _embedded['wp:featuredmedia']['0'].source_url: ""
      status: 'publish'
    }

    let options = { headers: new HttpHeaders(
                    {'Content-Type': 'application/json', 
                    //'accept': 'application/json',
                    'Authorization': 'Bearer ' + data.token
                    }
                    )
                  };
   return this.http.post(this.PostEndpoint, postData, options);
  }
  Categories(): Observable<any[]>{
    console.log(`${this.categoriesEndpoint}`);
    return this.http.get<any[]>(`${this.categoriesEndpoint}`)
    .pipe(
      tap(post => console.log('fetched categories')),
      catchError(this.handleError('getcategories', []))
    );
  }
  processCategories(){
    return new Promise(
      (resolve, reject) => {
      this.Categories().subscribe(
        data => resolve(this.categoriesData = data)
      );
      }
    );
  }
  async getCategories(){
    try{
      await this.processCategories();
      console.log("categories: ",this.categoriesData);
    }catch(e){
      console.log(e)
    }
    
  }
   
  getPostsBycategory(id:number = 1, pageNum: number = 3): Observable<HttpResponse<Config>>{
    console.log(`${this.getPostBycategory}${id}&per_page=5&page=${pageNum}&_embed`);
    return this.http.get<Config>(`${this.getPostBycategory}${id}&per_page=5&page=${pageNum}&_embed`, { observe: 'response' });
  }
  
}
