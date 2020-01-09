import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WpService } from 'src/app/services/wpservice.service';
import { log } from 'util';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  
  toggle:boolean = false;

  navLinks: any[] = [
    {
      name: 'Home',
      address: '/posts',
      icon: 'home'
    },
    {
      name: 'About',
      address: '/about',
      icon:'account_circle'
    },
    {
      name: 'Contact',
      address: '/contact',
      icon:'contacts'
    },
    /* {
      name: 'sublink',
      address: '',
      icon:'apps',
      sublink: [
        'music', 
        'song', 
        'cooking'
      ]
    }, */
  ];

  @ViewChild('mynav', {static: true}) navView: ElementRef;
  panel: boolean = false;
  elemt:any;
  panelHeight:any = null;
  navHeight:any = null;
  parentElem: any;
  headerbackgroundChange: boolean;

  constructor(
    private elRef:ElementRef, 
    private zone: NgZone,
    private route: ActivatedRoute,
    private router: Router, 
    private wpservice: WpService
    ) { 
    window.onscroll = () => {
      zone.run(() => {
       (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80)
        ?
         this.headerbackgroundChange = true
        :
          this.headerbackgroundChange = false
        ;

      });
    };
  }
  
  async ngOnInit() {
    await this.wpservice.getCategories();
    const category = {
      name: 'categories',
      address: '',
      icon:'apps',
      sublink: this.wpservice.categoriesData
    }
    this.navLinks.push(category);
    console.log(this.navLinks);
    
  }

  ngAfterViewInit() {
    console.log(this.navView);
  }

  toRoute(tolink: string) {
    //console.log(tolink);
    (tolink && typeof tolink !== null)
    ?
    (
      this.toggleMenu(),
      this.router.navigate([`${tolink}`], { relativeTo: this.route })
    )
    :
      console.log('sublink')
    ;
    
    //this.router.navigate(['home], { relativeTo: this.route });
    //this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }
  toRouteCategory(routeToId){
    this.toggleMenu();
    this.router.navigate(['category', routeToId]);
  }

  panelToggle(event){
    console.log(event.target.innerHTML);
    //console.log("parent Element", event.target.parentElement);
    this.parentElem = event.target.parentElement;
    //console.log("parent next sibling", event.target.parentElement.nextElementSibling);
  //   console.log(event.target.nextElementSibling);
  // console.log('curentTarget', event.currentTarget);
    this.elemt = this.parentElem.nextElementSibling;
    console.log('next element', this.elemt);
    ((this.elemt !== null) && event.currentTarget)
    ?
    (
      (this.elemt.style.height && typeof this.elemt.style.height !== null)
      ?
      this.elemt.style.height = null
      :
      this.elemt.style.height = `${this.elemt.scrollHeight}px`              
    )    
    :
    ''
    ;
  }

  toggleMenu() {
    console.log("toggle");
    this.toggle 
    ? 
    (
      this.toggle = false
      /* this.navHeight = null */
    ) 
    : 
    (
      this.toggle = true
      /* this.navHeight = `${this.navView.nativeElement.scrollHeight}px` */
    );
    
  }
  ppanel(event){
    console.log(event.target.nextElementSibling);
  console.log('curentTarget', event.currentTarget);
    this.elemt = event.target.nextElementSibling;
    console.log('next element', this.elemt);
    ((this.elemt !== null) && event.currentTarget)
    ?
    (
      (this.elemt.style.height && typeof this.elemt.style.height !== null)
      ?
      this.elemt.style.height = null
      :
      this.elemt.style.height = `${this.elemt.scrollHeight}px`              
    )    
    :
    ''
    ;
  }

}
