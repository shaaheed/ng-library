import { Component, ViewEncapsulation, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-scrollbar',
  templateUrl: './app-scrollbar.component.html',
  styleUrls: ['./app-scrollbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppScrollbarComponent {

  @ViewChild('wrapper', { read: ElementRef }) wrapperRef;
  @ViewChild('content', { read: ElementRef }) contentRef;
  @ViewChild('vbar', { read: ElementRef }) vbarRef;
  @ViewChild('hbar', { read: ElementRef }) hbarRef;

  private host;

  constructor(private ref: ElementRef) {
    this.host = ref.nativeElement;
  }

  ngOnInit(): void {
    console.log(this.host);
  }

}