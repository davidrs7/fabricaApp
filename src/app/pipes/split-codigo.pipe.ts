import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitCodigo'
})
export class SplitCodigoPipe implements PipeTransform {

  transform(value: string): string {
     
    return value.split("-")[0];
  }

}
