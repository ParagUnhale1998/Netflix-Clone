import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'originalIMG'
})
export class OriginalIMGPipe implements PipeTransform {
 
  
  transform(value: any, args?: any): any {
    return `https://image.tmdb.org/t/p/original/${value}`;
  }

}
