import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalSlice',
  standalone: true,
})
export class DecimalSlicePipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    return value ? value.toFixed(2).slice(-2) : value;
  }
}
