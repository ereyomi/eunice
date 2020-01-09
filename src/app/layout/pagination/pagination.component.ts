import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {
  data: any;
  prev_page: number;
  next_page: number;
  @Input() routeToPage: string;
  @Input() routeToId: number;
  @Input() allPages: number;
  @Input() currentPage: number;
  constructor(private router: Router, private route: ActivatedRoute) { }
  
  ngOnInit() {    
    this.makePagination();   
  }
  ngOnChanges(){
    this.makePagination();
  }
  makePagination(){
    console.log("allpages", this.allPages, "currentPage: ", this.currentPage); 
    //setup next page
    (this.currentPage === this.allPages) ? this.next_page = null : (this.next_page = this.currentPage + 1);

    //setup prev page
    (this.currentPage > 1) ?  (this.prev_page = this.currentPage - 1) : this.prev_page = null;
  }
  getPagePost(pageNum){
    console.log("paginating: ", pageNum);
    if(this.routeToPage && this.routeToId){
      //for category type routing
      this.router.navigate([this.routeToPage,this.routeToId, 'page', pageNum]);
    }else{
      //for posts type routing
      this.router.navigate([this.routeToPage,'page', pageNum]);
    }
    
  }
}

