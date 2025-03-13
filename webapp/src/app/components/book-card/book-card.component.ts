import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css',
})
export class BookCardComponent {
  @Input() image: string = '';
  @Input() name: string = '';
  @Input() author: string = '';
  @Input() rating: number = 0;
  @Input() showBorrow: boolean = false;


  getArrayFromSize(n: number): number[] {
    return new Array(n).fill(0);
  }
}
