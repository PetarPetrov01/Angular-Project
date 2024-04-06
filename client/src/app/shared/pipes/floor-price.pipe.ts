import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'floorPrice',
  standalone: true,
})
export class FloorPricePipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    const formattedNum = Math.floor(value)
      .toString()
      .split('')
      .reverse()
      .join('')
      .match(/\d{1,3}/g);
    return formattedNum?.join(' ').split('').reverse().join('');
  }
}
