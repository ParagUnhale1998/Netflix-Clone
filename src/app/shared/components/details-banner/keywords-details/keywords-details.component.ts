import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-keywords-details',
  templateUrl: './keywords-details.component.html',
  styleUrls: ['./keywords-details.component.scss']
})
export class KeywordsDetailsComponent {
  @Input() keywords: any[] = [];

  constructor() { }
}
