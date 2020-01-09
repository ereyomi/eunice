import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-content-loader',
  templateUrl: './content-loader.component.html',
  styleUrls: ['./content-loader.component.css']
})
export class ContentLoaderComponent implements OnInit {
  @Input() type: any;
  constructor() { }

  ngOnInit() {
    console.log('type', this.type);
  }

}
