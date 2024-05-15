import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { KeywordResponse, Keywords, Movie } from 'src/app/models/IMDB.interface';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-movie-banner',
  templateUrl: './movie-banner.component.html',
  styleUrls: ['./movie-banner.component.scss']
})
export class MovieBannerComponent implements OnInit,AfterViewInit{
@Input() movieData!:Movie;
@Input() animeData!:any;
@Input() tvShowData!:any;
// @Input() tvShowsData!:any;
@Input() keywords!:Keywords[];
// keywords: Keywords[] = []; // Initialize keywords array

showVideo: boolean = false;

toggleVideo() {
  console.log('works')
    this.showVideo = !this.showVideo;
  }

  closeVideo() {
    this.showVideo = false;
  }

constructor( private router: Router,private route: ActivatedRoute,private apiService:ApiService,private http: HttpClient,private sanitizer: DomSanitizer){
  // console.log(this.tvShowsData) // undefined 
  // this.keywords = [
  //   {
  //     id: 11195,
  //     name: "empire"
  //   },
  //   {
  //     id: 4152,
  //     name: "kingdom"
  //   },
  //   {
  //     id: 690,
  //     name: "gorilla"
  //   },
  //   {
  //     id: 4565,
  //     name: "dystopia"
  //   },
  //   {
  //     id: 9663,
  //     name: "sequel"
  //   },
  //   {
  //     id: 11239,
  //     name: "distant future"
  //   },
  //   {
  //     id: 14759,
  //     name: "ape"
  //   },
  //   {
  //     id: 14762,
  //     name: "orangutan"
  //   },
  //   {
  //     id: 157972,
  //     name: "chimpanzee"
  //   },
  //   {
  //     id: 177280,
  //     name: "primate"
  //   },
  //   {
  //     id: 275266,
  //     name: "cgi-live action hybrid"
  //   },
  //   {
  //     id: 285366,
  //     name: "post-apocalyptic"
  //   },
  //   {
  //     id: 307212,
  //     name: "evil tyrant"
  //   },
  //   {
  //     id: 326891,
  //     name: "cgi"
  //   }
  // ]
}
ngOnInit(): void {
  
}

ngAfterViewInit(): void {
  // this.movieApi.getMovieKeywords(this.movieData?.id).subscribe((res:any) => {
  //   console.log(res.keywords)
  //   this.keywords = res.keywords as Keywords[] 
  // })
  // console.log(this.tvShowsData)
  
}


openVideo() {
}
}
