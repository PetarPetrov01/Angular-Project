import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const cookieName = 'auth-cookie';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  providers: [CookieService],
})
export class AuthComponent implements OnInit {
  constructor(
    private cookieService: CookieService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    const user = this.authService.getUser();
    const authCookie = this.cookieService.get(cookieName);

    if (user && authCookie) {
      //Both credentials intact
      console.log('credentials intact')
    } else if(authCookie){
      //Check if token is valid
      console.log('missing user')
    } else {
      console.log('Token is missing')
    }
  }
}
