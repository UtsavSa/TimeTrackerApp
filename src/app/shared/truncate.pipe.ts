import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate', standalone: true })
export class TruncatePipe implements PipeTransform {
  transform(value: string | null | undefined, max = 30): string {
    if (!value) return '';
    return value.length > max ? value.slice(0, max - 1) + '…' : value;
  }
}
