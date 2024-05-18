import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isDropdownOpen: boolean = false;

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
  authService = inject(AuthService)
  userData:any
  


  constructor(private router: Router) {
    this.userData = sessionStorage.getItem('loggedInUser')
    this.userData = JSON.parse(this.userData)
   }

  isRouteActive(url: string): boolean {
      return this.router.url === url;
  }
  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }

  signOut(){
    this.authService.signOut()
    sessionStorage.removeItem("loggedInUser")
    sessionStorage.clear()
    this.router.navigateByUrl('/')
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  }
