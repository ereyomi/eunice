import { Component, OnInit } from '@angular/core';
import { WpService } from 'src/app/services/wpservice.service';
import { log } from 'util';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  myCategories: any[];
  loading: boolean = true;
  constructor(private wpservice: WpService) { }

  async ngOnInit() {
    await this.wpservice.getCategories();
    if(this.wpservice.categoriesData){
      this.loading = false;
      this.myCategories = this.wpservice.categoriesData;
    }    

  }

}
