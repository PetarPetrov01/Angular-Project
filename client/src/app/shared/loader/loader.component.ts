import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
})
export class LoaderComponent {
  @Input()color: string = '#fff'
  @Input()diameter: string = '48px'
  @Input()width: string = '5px'
}
