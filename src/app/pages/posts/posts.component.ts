import { Component, OnInit } from '@angular/core';
import { WpService } from 'src/app/services/wpservice.service';
import { ActivatedRoute, Params } from '@angular/router';
import { catchError} from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  data: any;
  loading: boolean = true;
  numbers: number[];
  //key: any;
  //headers: any;
  //X-WP-Total: 11
   //X-WP-TotalPages: 2
   totalPages: any;
   pageNumber: number;
   mycurrentPage: number;
   myroute: string = 'posts';
  constructor(private wpApi: WpService, private route: ActivatedRoute) {}

  ngOnInit() {
    //per_page=3&_embed
    this.route.params.subscribe(
        (params: Params) => {
          this.pageNumber = +params['pagenumber'];
          console.log("pageNumber: ", this.pageNumber);
          //set loading till we get a content
          this.loading = true;
          if (!isNaN(this.pageNumber)  && typeof this.pageNumber !== null){
            this.getPostperPage(this.pageNumber);
          }else{
            console.log("fetching page 1");
            this.getPostperPage();
          }
          
      }
    );
  }
  getPostperPage(pgNum: number = 1){
      try{
        this.wpApi.getposts(pgNum).pipe(
          catchError(this.wpApi.handleError<any>('err'))
        ).subscribe(
          (resp) => {
            console.log(resp);

            //setting pagination
            this.totalPages = +(resp.headers.get('X-WP-TotalPages'));
            this.mycurrentPage = pgNum;

            this.data = resp.body;
            
            
            //this.key = resp.headers.keys();
            //  this.headers = this.key.map(key => `${key}: ${resp.headers.get(key)}`);
            //  console.log(this.headers);
            //config = {...resp.body};
            
            
              //remove content loader 
              if(this.data || this.data !== null || this.data.length !== 0){
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
  counter(i: number): any[] {
    return new Array(i);
  }
  arrayOne(n: number): any[] {
    return Array(n);
  }

}
