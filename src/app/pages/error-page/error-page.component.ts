import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  errorStatus: number;
  errorStatusText: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (params: Params) => {
        this.errorStatus = +params['status'];
        this.errorStatusText = params['statustext'];
        
        (isNaN(this.errorStatus)  && typeof this.errorStatusText === 'undefined')
        ?
        (
          this.errorStatus = 404,
          this.errorStatusText = 'Page Not Found'
          )
        :
        ('')
        ;
        console.log(this.errorStatus, this.errorStatusText);
      }
    );
  }

}
