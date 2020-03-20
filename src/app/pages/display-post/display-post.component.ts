import { Component, OnInit } from '@angular/core';
import { WpService } from 'src/app/services/wpservice.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-display-post',
  templateUrl: './display-post.component.html',
  styleUrls: ['./display-post.component.css']
})
export class DisplayPostComponent implements OnInit {
  loading: boolean = true;
  postId: number;
  post:any;
  token: any;
  constructor(private wpApi: WpService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.postId = +params['id'];
        console.log(this.postId);
        try{
          this.wpApi.getpost(this.postId).subscribe(
            res => {
              this.post = res;
              console.log(this.post);

              // remove content loader 
              if (this.post || this.post !== null || this.post !== 'undefined'){
                this.loading = false;
              }
            }
          );
        }catch(e){
          console.log("error occur while trying to load the post", e);
        }
      }
    );
  }

}
