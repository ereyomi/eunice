import { Component, OnInit } from '@angular/core';
import { WpService } from 'src/app/services/wpservice.service';
import { ActivatedRoute, Params } from '@angular/router';
import { catchError} from 'rxjs/operators';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {
  loading: boolean = true;
  posts: any;
  catId: any;

  totalPages: any;
  pageNumber: number;
  mycurrentPage: number;
  myroute: string = 'category';
  constructor(private wpApi: WpService, private route: ActivatedRoute) { }

  counter(i: number): any[] {
    return new Array(i);
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.catId = +params['id'];
        this.pageNumber = +params['pagenumber'];
        console.log(this.catId, this.pageNumber);
        if (!isNaN(this.pageNumber)  && typeof this.pageNumber !== null){
          this.getCategoryPostperPage(this.catId, this.pageNumber);
        }else{
          this.getCategoryPostperPage(this.catId);
        }
      }
    );
  }
  getCategoryPostperPage(cat_id:  number, pgNum: number = 1){
    try{
      this.wpApi.getPostsBycategory(cat_id, pgNum).pipe(
        catchError(this.wpApi.handleError<any>('err'))
      ).subscribe(
        (resp) => {
          console.log(resp);
          //setting pagination
          this.totalPages = +(resp.headers.get('X-WP-TotalPages'));
          this.mycurrentPage = pgNum;

          this.posts = resp.body;
            //remove content loader 
            if(this.posts || this.posts !== null || this.posts.length !== 0){
              this.loading = false;
            }
          },
          err => {
            console.log(err);
            
          }              
      );
  }catch(e){
    console.log("error occur while trying to load the post page", e);
  }
}

}
