import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el:ElementRef) { 
    console.log(el);
    
    el.nativeElement.style.backgroundColor="black"
    el.nativeElement.style.height="50px"
    el.nativeElement.style.paddingTop="10px"



  }

}
