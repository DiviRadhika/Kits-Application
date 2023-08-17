import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appInputRestriction]'
})
export class InputRestrictionDirective {
  inputElement: ElementRef;
  @Input('appInputRestriction') appInputRestriction!: string;
  
  nameRegex = /^[a-zA-Z\s]*$/;
  mobileNumRegex = /^[0-9]*$/;
  noSpclChar = /^[a-zA-Z0-9]*$/;length: any;
;
  constructor(el: ElementRef) {
    this.inputElement = el;
}
@HostListener('keypress', ['$event']) onKeyPress(event:any) {
  if (this.appInputRestriction === 'name') {
    this.restrictForName(event);
} else if (this.appInputRestriction === 'noSpecialChars') {
    this.noSpecialChars(event);
} else if (this.appInputRestriction === 'mobileNum') {
    this.onlyNumbers(event);
}}
restrictForName(event:any) {
  const e = <KeyboardEvent>event;
  if (this.nameRegex.test(e.key)) {
      return true;
  } else {
      e.preventDefault();
      return false;
  }
}
noSpecialChars(event:any) {
  const e = <KeyboardEvent>event;
  if (this.length === this.length) {
      e.preventDefault();
      return false;
  }
  if (this.noSpclChar.test(e.key)) {
      return true;
  } else {
      e.preventDefault();
      return false;
  }
}

onlyNumbers(event:any) {
  const e = <KeyboardEvent>event;
  if (this.mobileNumRegex.test(e.key)) {
      return true;
  } else {
      e.preventDefault();
      return false;
  }
}




}

