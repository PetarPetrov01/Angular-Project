import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { Observable } from 'rxjs';
import { APIProduct } from '../../types/Product';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
products$ : Observable<APIProduct[]>; 

constructor (private apiService: ApiService){
  this.products$ = this.apiService.getProducts({limit: 3, sort: 'createdAt:asc'});

}
}
