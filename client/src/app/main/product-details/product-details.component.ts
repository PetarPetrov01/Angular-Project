import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
productId: string = '';

constructor(private activated: ActivatedRoute){}

ngOnInit(): void {
  this.activated.params.subscribe((params)=>{
    this.productId = params['id'];
    console.log(this.productId);
  })
}

}
