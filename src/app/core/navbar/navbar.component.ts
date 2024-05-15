import {  Component, DoCheck, HostListener, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
 
  navList = [
    {name:"Home",url:"/home", "id" : 0},
    {name:"TV",url:"/tv", "id" : 1},
    {name:"Movies",url:"/movies", "id" : 2},
    {name:"Anime",url:"/anime", "id" : 3}
  ]

  isScrolled = false;

  isSearchOpen: boolean = false;

 
  ngOnInit(): void {
   
  }
  constructor(private router: Router) { }

  isRouteActive(url: string): boolean {
      return this.router.url === url;
  }
  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }

}
