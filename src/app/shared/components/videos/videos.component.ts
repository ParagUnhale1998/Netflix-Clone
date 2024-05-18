import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent {
  trailerUrl: SafeResourceUrl = "";
  videoError: boolean = false;
  backDropImg:string = ""
  @Input() showVideo: boolean = false;
  @Output() closeVideoEvent = new EventEmitter<void>();


  constructor(private route: ActivatedRoute,private http: HttpClient,private sanitizer: DomSanitizer){
  }
  closeVideo() {
    this.closeVideoEvent.emit();
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        const path = this.route.snapshot.url[0].path;
        switch (path) {
          case 'movie':
           this.getTheTrailer('movie',id)
            break;
          case 'tv':
            this.getTheTrailer('tv',id)
            break;
          case 'anime':
        this.getTheTrailer('tv',id)
            break;
          default:
            console.error('Invalid route');
        }
      }
    });
  }


  getTheTrailer(type: string, id: any) {
    this.http.get<any>(`https://api.themoviedb.org/3/${type}/${id}?language=en-US&append_to_response=videos&api_key=${environment.API_KEY}`)
      .subscribe(data => {
        // console.log('videoData',data)
        if (data.videos && data.videos.results.length > 0) {
          const index = data.videos?.results?.findIndex((element: any) => element.type === 'Trailer' || 'Opening Credits');
          if (index !== -1) {
            const url = data.videos.results[index].key;
            const youtubeUrl = `https://www.youtube.com/embed/${url}`;
            this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(youtubeUrl);
          } else {
           
            this.videoError = true;
            this.backDropImg = data.backdrop_path
          }
        } else {
         
          this.videoError = true;
          this.backDropImg = data.backdrop_path
        }
      }, error => {
        console.error('Error fetching trailer:', error);
        // Handle error here
        this.videoError = true;
       
      });
  }

}
      


