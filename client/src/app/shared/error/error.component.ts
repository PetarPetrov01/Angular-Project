import { Component, OnInit } from '@angular/core';
import { ErrorService } from './error.service';
import { Observable } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [NgIf],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent implements OnInit{
  error: string | null = null;

  constructor(private errorService: ErrorService){}

  ngOnInit(): void {
    this.errorService.error$.subscribe((err)=>{
      this.error = err
    })
  }
}
