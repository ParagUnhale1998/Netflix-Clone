import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() items: any[] = [];
  @Input() page: number = 1; 
  @Output() navigate: EventEmitter<number> = new EventEmitter<number>();

  navigateTo(id: number) {
    this.navigate.emit(id);
  }
}
