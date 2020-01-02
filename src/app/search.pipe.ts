import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(values: any[], args?: any): any {
    console.log(args);
    
    return values.filter(item => item.name == args);
  }

}
