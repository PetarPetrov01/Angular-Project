import { NgIf } from '@angular/common';
import { Component, OnChanges, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnChanges{
  activatedRouter: any;
  
  constructor(private router: Router){};

  ngOnChanges(): void {
    this.activatedRouter = this.router.url;
    console.log(this.activatedRouter)
  }
  
}
