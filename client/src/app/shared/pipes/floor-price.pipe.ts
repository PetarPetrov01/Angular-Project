import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'floorPrice',
  standalone: true
})
export class FloorPricePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return Math.floor(value)
  }
}
