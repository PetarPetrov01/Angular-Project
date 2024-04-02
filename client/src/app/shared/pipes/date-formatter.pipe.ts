import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'dateFormatter',
  standalone: true,
})
export class DateFormatterPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    if (value) {
      return moment(value).format('DD MMMM YYYY, HH:MM');
    }
    return '';
  }
}
