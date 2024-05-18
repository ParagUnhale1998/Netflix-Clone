declare var google: any;
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login-home',
  templateUrl: './login-home.component.html',
  styleUrls: ['./login-home.component.scss']
})
export class LoginHomeComponent {

  constructor(private router:Router,private spinner: NgxSpinnerService){}

  openSpinner(){
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }


  ngOnInit(): void {
    
    google.accounts.id.initialize({
      client_id:
        '602346929141-hqt2nr4mufrei3jua0ro2plqi8mnej8v.apps.googleusercontent.com',

      callback: (res: any) => {
        // Handle the callback if needed
        this.handleLogin(res);
      },
    });
    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: 350,
    });
  }
 
  private decodeToker(token:string){
    return JSON.parse(atob(token.split(".")[1]))
  }
  
  handleLogin(res: any) {
    if (res) {
      const paylod = this.decodeToker(res.credential)
      sessionStorage.setItem("loggedInUser",JSON.stringify(paylod))
      this.router.navigate(['/home'])
    }
  }

  navigateToHome(){
    const paylod = {
      email_verified: true,
      name: "U. PARAG",
      picture: "https://lh3.googleusercontent.com/a/ACg8ocKZnw9nJa3c4gsPkg7-EWJVCqFDRBLN_Smm3n44v5RkD2jUta7S=s96-c",
      family_name: "PARAG",
      exp: 1715786545,
    }
    sessionStorage.setItem("loggedInUser",JSON.stringify(paylod))
    this.router.navigate(['/home'])
  }
  
}
