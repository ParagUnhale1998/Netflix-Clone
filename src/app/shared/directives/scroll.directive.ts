import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective {

  @HostBinding('class.bg-scroll') headerVariable = false;

  @HostListener('document:scroll')
  onScroll() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    this.headerVariable = scrollTop > 0;
  }

}
