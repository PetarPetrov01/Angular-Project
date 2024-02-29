import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  providers: [CookieService]
})
export class AuthComponent implements OnInit{
  
  constructor (private cookieService: CookieService){}
  ngOnInit(): void {
    console.log(this.cookieService.get('auth-cookie'))
  }

}
