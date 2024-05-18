import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-media-details',
  templateUrl: './media-details.component.html',
  styleUrls: ['./media-details.component.scss'],
})
export class MediaDetailsComponent {
  @Input() mediaData: any;
  @Output() toggleVideo: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  onToggleVideo() {
    this.toggleVideo.emit();
  }
}
