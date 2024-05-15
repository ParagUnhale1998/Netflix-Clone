import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'img'
})
export class ImgPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return `https://image.tmdb.org/t/p/w500/${value}`;
  }

}
