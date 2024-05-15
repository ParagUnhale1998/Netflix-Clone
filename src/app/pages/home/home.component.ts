import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { forkJoin, map } from 'rxjs';
import { IvideoContent } from 'src/app/models/Video-content.interface';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  popularMovies: IvideoContent[] = [];
  topRatedMovies: IvideoContent[] = [];
  upcomingMovies: IvideoContent[] = [];

  trendingTvShows: any[] = [];
  topRatedTvShows: any[] = [];
  comedyTvShows: any[] = [];

  recentAnime: any[] = [];
  favouriteAnime: any[] = [];
  popularAnime: any[] = [];

  MoviesApi = [
    this.apiService.getPopularMovies(),
    this.apiService.getTopRatedMovies(),
    this.apiService.getUpcomingMovies(),
  ];

  TVShowsApi = [
    this.apiService.getTrendingTv(),
    this.apiService.getTopRatedTv(),
    this.apiService.getComedyTv(),
  ];

  AnimeApi = [
    this.apiService.getRecentReleasedAnime(1),
    this.apiService.getAllTimeFavoriteAnime(1),
    this.apiService.getPupularWeekAnime(1),
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {

    this.fetchMoviesData()
    this.fetchTvShowsData()
    this.fetchAnimeData()
    
  }

  fetchMoviesData() {
    forkJoin(this.MoviesApi)
      .pipe(
        map(([popularMovies, topRatedMovies, upcomingMovies]) => {
          return { popularMovies, topRatedMovies, upcomingMovies };
        })
      )
      .subscribe((res: any) => {
        this.popularMovies = res.popularMovies.results as IvideoContent[];
        console.log(res)
        this.topRatedMovies = res.topRatedMovies.results as IvideoContent[];
        this.upcomingMovies = res.upcomingMovies.results as IvideoContent[];
      });
  }

  fetchTvShowsData() {
    forkJoin(this.TVShowsApi)
      .pipe(
        map(([trendingTvShows, topRatedTvShows, comedyTvShows]) => {
          return { trendingTvShows, topRatedTvShows, comedyTvShows };
        })
      )
      .subscribe((res: any) => {
        this.trendingTvShows = res.trendingTvShows.results as any[];
        console.log(res)
        this.topRatedTvShows = res.topRatedTvShows.results as any[];
        this.comedyTvShows = res.comedyTvShows.results as any[];
      });
  }

  fetchAnimeData() {
    forkJoin(this.AnimeApi)
      .pipe(
        map(([recentAnime, favouriteAnime, popularAnime]) => {
          return { recentAnime, favouriteAnime, popularAnime };
        })
      )
      .subscribe((res: any) => {
        this.recentAnime = res.recentAnime.results as any[];
        console.log(res)
        this.favouriteAnime = res.favouriteAnime.results as any[];
        this.popularAnime = res.popularAnime.results as any[];
      });
  }
}
/*
this.popularMovies = [
  {
    adult: false,
    backdrop_path: "/fY3lD0jM5AoHJMunjGWqJ0hRteI.jpg",
    genre_ids: [
      878,
      27,
      28
    ],
    id: 940721,
    original_language: "ja",
    original_title: "ゴジラ-1.0",
    overview: "Postwar Japan is at its lowest point when a new crisis emerges in the form of a giant monster, baptized in the horrific power of the atomic bomb.",
    popularity: 2735.613,
    poster_path: "/hkxxMIGaiCTmrEArK7J56JTKUlB.jpg",
    release_date: "2023-11-03",
    title: "Godzilla Minus One",
    video: false,
    vote_average: 7.721,
    vote_count: 882
  },
  {
    adult: false,
    backdrop_path: "/sI6uCeF8mUlZx22mFfHSi9W3XQ9.jpg",
    genre_ids: [
      10749,
      35
    ],
    id: 843527,
    original_language: "en",
    original_title: "The Idea of You",
    overview: "40-year-old single mom Solène begins an unexpected romance with 24-year-old Hayes Campbell, the lead singer of August Moon, the hottest boy band on the planet.",
    popularity: 1380.647,
    poster_path: "/zDi2U7WYkdIoGYHcYbM9X5yReVD.jpg",
    release_date: "2024-05-02",
    title: "The Idea of You",
    video: false,
    vote_average: 7.555,
    vote_count: 551
  },
  {
    adult: false,
    backdrop_path: "/iHYh4cdO8ylA3W0dUxTDVdyJ5G9.jpg",
    genre_ids: [
      878,
      12,
      28
    ],
    id: 653346,
    original_language: "en",
    original_title: "Kingdom of the Planet of the Apes",
    overview: "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.",
    popularity: 2138.511,
    poster_path: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
    release_date: "2024-05-08",
    title: "Kingdom of the Planet of the Apes",
    video: false,
    vote_average: 7.077,
    vote_count: 130
  },
  {
    adult: false,
    backdrop_path: "/qrGtVFxaD8c7et0jUtaYhyTzzPg.jpg",
    genre_ids: [
      28,
      878,
      12
    ],
    id: 823464,
    original_language: "en",
    original_title: "Godzilla x Kong: The New Empire",
    overview: "Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.",
    popularity: 1416.188,
    poster_path: "/tMefBSflR6PGQLv7WvFPpKLZkyk.jpg",
    release_date: "2024-03-27",
    title: "Godzilla x Kong: The New Empire",
    video: false,
    vote_average: 6.478,
    vote_count: 1019
  },
  {
    adult: false,
    backdrop_path: "/5cCfqeUH2f5Gnu7Lh9xepY9TB6x.jpg",
    genre_ids: [
      14,
      12,
      35
    ],
    id: 967847,
    original_language: "en",
    original_title: "Ghostbusters: Frozen Empire",
    overview: "The Spengler family returns to where it all started – the iconic New York City firehouse – to team up with the original Ghostbusters, who've developed a top-secret research lab to take busting ghosts to the next level. But when the discovery of an ancient artifact unleashes an evil force, Ghostbusters new and old must join forces to protect their home and save the world from a second Ice Age.",
    popularity: 1286.608,
    poster_path: "/e1J2oNzSBdou01sUvriVuoYp0pJ.jpg",
    release_date: "2024-03-20",
    title: "Ghostbusters: Frozen Empire",
    video: false,
    vote_average: 6.646,
    vote_count: 546
  },
  {
    adult: false,
    backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    genre_ids: [
      878,
      12
    ],
    id: 693134,
    original_language: "en",
    original_title: "Dune: Part Two",
    overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
    popularity: 1180.453,
    poster_path: "/czembW0Rk1Ke7lCJGahbOhdCuhV.jpg",
    release_date: "2024-02-27",
    title: "Dune: Part Two",
    video: false,
    vote_average: 8.213,
    vote_count: 3768
  },
  {
    adult: false,
    backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    genre_ids: [
      878,
      12
    ],
    id: 693134,
    original_language: "en",
    original_title: "Dune: Part Two",
    overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
    popularity: 1180.453,
    poster_path: "/czembW0Rk1Ke7lCJGahbOhdCuhV.jpg",
    release_date: "2024-02-27",
    title: "Dune: Part Two",
    video: false,
    vote_average: 8.213,
    vote_count: 3768
  }, {
    adult: false,
    backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    genre_ids: [
      878,
      12
    ],
    id: 693134,
    original_language: "en",
    original_title: "Dune: Part Two",
    overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
    popularity: 1180.453,
    poster_path: "/czembW0Rk1Ke7lCJGahbOhdCuhV.jpg",
    release_date: "2024-02-27",
    title: "Dune: Part Two",
    video: false,
    vote_average: 8.213,
    vote_count: 3768
  }, {
    adult: false,
    backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    genre_ids: [
      878,
      12
    ],
    id: 693134,
    original_language: "en",
    original_title: "Dune: Part Two",
    overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
    popularity: 1180.453,
    poster_path: "/czembW0Rk1Ke7lCJGahbOhdCuhV.jpg",
    release_date: "2024-02-27",
    title: "Dune: Part Two",
    video: false,
    vote_average: 8.213,
    vote_count: 3768
  }, {
    adult: false,
    backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    genre_ids: [
      878,
      12
    ],
    id: 693134,
    original_language: "en",
    original_title: "Dune: Part Two",
    overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
    popularity: 1180.453,
    poster_path: "/czembW0Rk1Ke7lCJGahbOhdCuhV.jpg",
    release_date: "2024-02-27",
    title: "Dune: Part Two",
    video: false,
    vote_average: 8.213,
    vote_count: 3768
  }, {
    adult: false,
    backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    genre_ids: [
      878,
      12
    ],
    id: 693134,
    original_language: "en",
    original_title: "Dune: Part Two",
    overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
    popularity: 1180.453,
    poster_path: "/czembW0Rk1Ke7lCJGahbOhdCuhV.jpg",
    release_date: "2024-02-27",
    title: "Dune: Part Two",
    video: false,
    vote_average: 8.213,
    vote_count: 3768
  }, {
    adult: false,
    backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    genre_ids: [
      878,
      12
    ],
    id: 693134,
    original_language: "en",
    original_title: "Dune: Part Two",
    overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
    popularity: 1180.453,
    poster_path: "/czembW0Rk1Ke7lCJGahbOhdCuhV.jpg",
    release_date: "2024-02-27",
    title: "Dune: Part Two",
    video: false,
    vote_average: 8.213,
    vote_count: 3768
  }, {
    adult: false,
    backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    genre_ids: [
      878,
      12
    ],
    id: 693134,
    original_language: "en",
    original_title: "Dune: Part Two",
    overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
    popularity: 1180.453,
    poster_path: "/czembW0Rk1Ke7lCJGahbOhdCuhV.jpg",
    release_date: "2024-02-27",
    title: "Dune: Part Two",
    video: false,
    vote_average: 8.213,
    vote_count: 3768
  }, {
    adult: false,
    backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    genre_ids: [
      878,
      12
    ],
    id: 693134,
    original_language: "en",
    original_title: "Dune: Part Two",
    overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
    popularity: 1180.453,
    poster_path: "/czembW0Rk1Ke7lCJGahbOhdCuhV.jpg",
    release_date: "2024-02-27",
    title: "Dune: Part Two",
    video: false,
    vote_average: 8.213,
    vote_count: 3768
  }, {
    adult: false,
    backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    genre_ids: [
      878,
      12
    ],
    id: 693134,
    original_language: "en",
    original_title: "Dune: Part Two",
    overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
    popularity: 1180.453,
    poster_path: "/czembW0Rk1Ke7lCJGahbOhdCuhV.jpg",
    release_date: "2024-02-27",
    title: "Dune: Part Two",
    video: false,
    vote_average: 8.213,
    vote_count: 3768
  }

]
/*  topRated = {
    adult: false,
    backdrop_path: '/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg',
    genre_ids: [18, 80],
    id: 278,
    original_language: 'en',
    original_title: 'The Shawshank Redemption',
    overview:
      'Imprisoned in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.',
    popularity: 153.044,
    poster_path: '/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg',
    release_date: '1994-09-23',
    title: 'The Shawshank Redemption',
    video: false,
    vote_average: 8.704,
    vote_count: 26119,
  };*/
