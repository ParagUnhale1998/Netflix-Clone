import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss'],
})
export class MoviePageComponent {
  movie: any;
  anime: any;
  tvshow: any;

  relatedMovies: any;
  relatedAnimes: any;
  relatedTvshows: any;

  keywords: any[] = [];
  page = 1;

  constructor(private route: ActivatedRoute, private apiService: ApiService,private spinner: NgxSpinnerService) {
    // this.apiService.searchMulti('wwe').subscribe(res => console.log(res))
    this.spinner.show();

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        const path = this.route.snapshot.url[0].path;
        switch (path) {
          case 'movie':
            this.fetchMovieData(id);
            break;
          case 'tv':
            this.fetchTvShowData(id);
            break;
          case 'anime':
            this.fetchAnimeData(id);
            break;
          default:
            console.error('Invalid route');
        }
      }
    });
  }

  fetchMovieData(id: any) {
    this.apiService.getMovieById(id).subscribe((res) => {
      this.movie = res;
      console.log(res)
          this.spinner.hide()
    });
    this.apiService.getMovieRelated(id).subscribe((res: any) => {
      this.relatedMovies = res.results;
    });

    this.apiService.getMovieKeywords(id).subscribe((res: any) => {
      this.keywords = res.keywords;
    });
  }

  fetchAnimeData(id: any) {
    this.apiService.getAnimeByID(id).subscribe((res) => {
      this.anime = res;
      console.log(res)
          this.spinner.hide()
    });
    this.apiService.getAnimeRelated(id).subscribe((res: any) => {
      this.relatedAnimes = res.results;
      console.log('relatedanime',res)
      if(this.relatedAnimes.length === 0){
         this.apiService.getAllTimeFavoriteAnime(1).subscribe((res:any) => {
      this.relatedAnimes = res.results
      
      console.log('popular',res)
     })
      }
      
    });

    // this.apiService.getAllTimeFavoriteAnime(1).subscribe((res:any) => {
    //   this.relatedAnimes = res.results
    //  })

    this.apiService.getAnimeKeywords(id).subscribe((res:any) => {
      this.keywords = res.results
      console.log(res)
    })
  }

  fetchTvShowData(id: any) {
    this.apiService.getTvShowByID(id).subscribe((res) => {
      this.tvshow = res;
      console.log(res)
          this.spinner.hide()
    });
    this.apiService.getTvShowRelated(id).subscribe((res: any) => {
      this.relatedTvshows = res.results;
      console.log(res)
    });

    this.apiService.getTvShowKeywords(id).subscribe((res: any) => {
      this.keywords = res.results;
      console.log(res)
    });
  }
}

/*
  this.movie = {
      adult: false,
      backdrop_path: '/iHYh4cdO8ylA3W0dUxTDVdyJ5G9.jpg',
      belongs_to_collection: {
        id: 173710,
        name: 'Planet of the Apes (Reboot) Collection',
        poster_path: '/afGkMC4HF0YtXYNkyfCgTDLFe6m.jpg',
        backdrop_path: '/2ZkvqfOJUCINozB00wmYuGJQW81.jpg',
      },
      budget: 0,
      genres: [
        {
          id: 878,
          name: 'Science Fiction',
        },
        {
          id: 12,
          name: 'Adventure',
        },
        {
          id: 28,
          name: 'Action',
        },
      ],
      homepage:
        'https://www.20thcenturystudios.com/movies/kingdom-of-the-planet-of-the-apes',
      id: 653346,
      imdb_id: 'tt11389872',
      origin_country: ['US'],
      original_language: 'en',
      original_title: 'Kingdom of the Planet of the Apes',
      overview:
        "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.",
      popularity: 2758.182,
      poster_path: '/gKkl37BQuKTanygYQG1pyYgLVgf.jpg',
      production_companies: [
        {
          id: 127928,
          logo_path: '/h0rjX5vjW5r8yEnUBStFarjcLT4.png',
          name: '20th Century Studios',
          origin_country: 'US',
        },
        {
          id: 133024,
          logo_path: null,
          name: 'Oddball Entertainment',
          origin_country: 'US',
        },
        {
          id: 89254,
          logo_path: null,
          name: 'Jason T. Reed Productions',
          origin_country: 'US',
        },
      ],
      production_countries: [
        {
          iso_3166_1: 'US',
          name: 'United States of America',
        },
      ],
      release_date: '2024-05-08',
      revenue: 0,
      runtime: 145,
      spoken_languages: [
        {
          english_name: 'English',
          iso_639_1: 'en',
          name: 'English',
        },
      ],
      status: 'Released',
      tagline: 'No one can stop the reign.',
      title: 'Kingdom of the Planet of the Apes',
      video: false,
      vote_average: 7.247,
      vote_count: 178,
    };

    this.relatedMovies = [
      {
        backdrop_path: '/rmNlWyez5cniGtXkgixG1ezdqVk.jpg',
        id: 1093995,
        original_title: 'Chief of Station',
        overview:
          'After learning that the death of his wife was not an accident, a former CIA Station Chief is forced back into the espionage underworld, teaming up with an adversary to unravel a conspiracy that challenges everything he thought he knew.',
        poster_path: '/uuA01PTtPombRPvL9dvsBqOBJWm.jpg',
        media_type: 'movie',
        adult: false,
        title: 'Chief of Station',
        original_language: 'en',
        genre_ids: [28, 53],
        popularity: 237.965,
        release_date: '2024-05-02',
        video: false,
        vote_average: 4.882,
        vote_count: 17,
      },
      {
        backdrop_path: null,
        id: 1286214,
        original_title: 'Unmasked',
        overview:
          'Sofia, a woman in her mid-20s battling depression, stumbles upon a peculiar mask on the roadside and brings it home. Soon, strange things begin to happen. An irresistible urge to put on the mask develops and the lines between what is real and not begin to blur.',
        poster_path: '/94X3MLidLnMPcxfy8bAe3Va4A6s.jpg',
        media_type: 'movie',
        adult: false,
        title: 'Unmasked',
        original_language: 'en',
        genre_ids: [27, 53, 18],
        popularity: 1.167,
        release_date: '2024-03-22',
        video: false,
        vote_average: 9,
        vote_count: 1,
      },
      {
        backdrop_path: '/9s9o9RT9Yj6nDuRJjnJm78WFoFl.jpg',
        id: 1051896,
        original_title: 'Arcadian',
        overview:
          "In a near future, normal life on Earth has been decimated. Paul and his two sons, Thomas and Joseph, have been living a half-life – tranquility by day and torment by night. Every night, after the sun sets, they face the unrelenting attacks of a mysterious and violent evil. One day, when Thomas doesn't return home before sundown, Paul must leave the safety of their fortified farm to find him. A nightmarish battle ensues that forces the family to execute a desperate plan to survive.",
        poster_path: '/spWV1eRzlDxvai8LbxwAWR0Vst4.jpg',
        media_type: 'movie',
        adult: false,
        title: 'Arcadian',
        original_language: 'en',
        genre_ids: [878, 53, 27],
        popularity: 123.976,
        release_date: '2024-04-12',
        video: false,
        vote_average: 6.431,
        vote_count: 94,
      },
      {
        backdrop_path: '/2C3CdVzINUm5Cm1lrbT2uiRstwX.jpg',
        id: 856289,
        original_title: '封神第一部：朝歌风云',
        overview:
          'Based on the most well-known classical fantasy novel of China, Fengshenyanyi, the trilogy is a magnificent eastern high fantasy epic that recreates the prolonged mythical wars between humans, immortals and monsters, which happened more than three thousand years ago.',
        poster_path: '/ccJpK0rqzhQeP7Mrs2uKqObFY4L.jpg',
        media_type: 'movie',
        adult: false,
        title: 'Creation of the Gods I: Kingdom of Storms',
        original_language: 'zh',
        genre_ids: [28, 14, 10752],
        popularity: 250.964,
        release_date: '2023-07-20',
        video: false,
        vote_average: 7.112,
        vote_count: 245,
      },
      {
        backdrop_path: '/9W02KZYKLoINpqpJ2yv8ATxR1AK.jpg',
        id: 205587,
        original_title: 'The Judge',
        overview:
          "A successful lawyer returns to his hometown for his mother's funeral only to discover that his estranged father, the town's judge, is suspected of murder.",
        poster_path: '/tefUxj4Gg9hgQNgfEYd7kJQrIlD.jpg',
        media_type: 'movie',
        adult: false,
        title: 'The Judge',
        original_language: 'en',
        genre_ids: [18],
        popularity: 120.728,
        release_date: '2014-10-08',
        video: false,
        vote_average: 7.311,
        vote_count: 3909,
      },
      {
        backdrop_path: '/pwGmXVKUgKN13psUjlhC9zBcq1o.jpg',
        id: 634492,
        original_title: 'Madame Web',
        overview:
          'Forced to confront revelations about her past, paramedic Cassandra Webb forges a relationship with three young women destined for powerful futures...if they can all survive a deadly present.',
        poster_path: '/rULWuutDcN5NvtiZi4FRPzRYWSh.jpg',
        media_type: 'movie',
        adult: false,
        title: 'Madame Web',
        original_language: 'en',
        genre_ids: [28, 14],
        popularity: 504.186,
        release_date: '2024-02-14',
        video: false,
        vote_average: 5.613,
        vote_count: 1247,
      },
      {
        backdrop_path: '/qrGtVFxaD8c7et0jUtaYhyTzzPg.jpg',
        id: 823464,
        original_title: 'Godzilla x Kong: The New Empire',
        overview:
          'Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.',
        poster_path: '/tMefBSflR6PGQLv7WvFPpKLZkyk.jpg',
        media_type: 'movie',
        adult: false,
        title: 'Godzilla x Kong: The New Empire',
        original_language: 'en',
        genre_ids: [28, 878, 12],
        popularity: 1416.188,
        release_date: '2024-03-27',
        video: false,
        vote_average: 6.489,
        vote_count: 1037,
      },
      {
        backdrop_path: '/dqK9Hag1054tghRQSqLSfrkvQnA.jpg',
        id: 155,
        original_title: 'The Dark Knight',
        overview:
          'Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.',
        poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
        media_type: 'movie',
        adult: false,
        title: 'The Dark Knight',
        original_language: 'en',
        genre_ids: [18, 28, 80, 53],
        popularity: 118.08,
        release_date: '2008-07-16',
        video: false,
        vote_average: 8.5,
        vote_count: 31909,
      },
      {
        backdrop_path: '/8rpDcsfLJypbO6vREc0547VKqEv.jpg',
        id: 76600,
        original_title: 'Avatar: The Way of Water',
        overview:
          'Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.',
        poster_path: '/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
        media_type: 'movie',
        adult: false,
        title: 'Avatar: The Way of Water',
        original_language: 'en',
        genre_ids: [878, 12, 28],
        popularity: 190.709,
        release_date: '2022-12-14',
        video: false,
        vote_average: 7.624,
        vote_count: 11257,
      },
      {
        backdrop_path: '/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg',
        id: 475557,
        original_title: 'Joker',
        overview:
          'During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic crime figure.',
        poster_path: '/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
        media_type: 'movie',
        adult: false,
        title: 'Joker',
        original_language: 'en',
        genre_ids: [80, 53, 18],
        popularity: 429.755,
        release_date: '2019-10-01',
        video: false,
        vote_average: 8.2,
        vote_count: 24542,
      },
      {
        backdrop_path: '/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg',
        id: 634649,
        original_title: 'Spider-Man: No Way Home',
        overview:
          'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.',
        poster_path: '/5weKu49pzJCt06OPpjvT80efnQj.jpg',
        media_type: 'movie',
        adult: false,
        title: 'Spider-Man: No Way Home',
        original_language: 'en',
        genre_ids: [28, 12, 878],
        popularity: 232.005,
        release_date: '2021-12-15',
        video: false,
        vote_average: 8,
        vote_count: 19364,
      },
      {
        backdrop_path: '/lzWHmYdfeFiMIY4JaMmtR7GEli3.jpg',
        id: 438631,
        original_title: 'Dune',
        overview:
          "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence-a commodity capable of unlocking humanity's greatest potential-only those who can conquer their fear will survive.",
        poster_path: '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
        media_type: 'movie',
        adult: false,
        title: 'Dune',
        original_language: 'en',
        genre_ids: [878, 12],
        popularity: 550.083,
        release_date: '2021-09-15',
        video: false,
        vote_average: 7.778,
        vote_count: 11567,
      },
      {
        backdrop_path: '/yQIBS8B9l2qXoPoPtxSXvH7CfoT.jpg',
        id: 324786,
        original_title: 'Hacksaw Ridge',
        overview:
          'WWII American Army Medic Desmond T. Doss, who served during the Battle of Okinawa, refuses to kill people and becomes the first Conscientious Objector in American history to receive the Congressional Medal of Honor.',
        poster_path: '/wuz8TjCIWR2EVVMuEfBnQ1vuGS3.jpg',
        media_type: 'movie',
        adult: false,
        title: 'Hacksaw Ridge',
        original_language: 'en',
        genre_ids: [18, 36, 10752],
        popularity: 222.504,
        release_date: '2016-10-07',
        video: false,
        vote_average: 8.195,
        vote_count: 13279,
      },
      {
        backdrop_path: '/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg',
        id: 502356,
        original_title: 'The Super Mario Bros. Movie',
        overview:
          'While working underground to fix a water main, Brooklyn plumbers—and brothers—Mario and Luigi are transported down a mysterious pipe and wander into a magical new world. But when the brothers are separated, Mario embarks on an epic quest to find Luigi.',
        poster_path: '/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg',
        media_type: 'movie',
        adult: false,
        title: 'The Super Mario Bros. Movie',
        original_language: 'en',
        genre_ids: [16, 10751, 12, 14, 35],
        popularity: 223.628,
        release_date: '2023-04-05',
        video: false,
        vote_average: 7.676,
        vote_count: 8408,
      },
      {
        backdrop_path: '/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg',
        id: 346698,
        original_title: 'Barbie',
        overview:
          'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.',
        poster_path: '/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
        media_type: 'movie',
        adult: false,
        title: 'Barbie',
        original_language: 'en',
        genre_ids: [35, 12],
        popularity: 467.262,
        release_date: '2023-07-19',
        video: false,
        vote_average: 7.066,
        vote_count: 8203,
      },
      {
        backdrop_path: '/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg',
        id: 496243,
        original_title: '기생충',
        overview:
          "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.",
        poster_path: '/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
        media_type: 'movie',
        adult: false,
        title: 'Parasite',
        original_language: 'ko',
        genre_ids: [35, 53, 18],
        popularity: 100.038,
        release_date: '2019-05-30',
        video: false,
        vote_average: 8.5,
        vote_count: 17507,
      },
      {
        backdrop_path: '/uLtVbjvS1O7gXL8lUOwsFOH4man.jpg',
        id: 118340,
        original_title: 'Guardians of the Galaxy',
        overview:
          'Light years from Earth, 26 years after being abducted, Peter Quill finds himself the prime target of a manhunt after discovering an orb wanted by Ronan the Accuser.',
        poster_path: '/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg',
        media_type: 'movie',
        adult: false,
        title: 'Guardians of the Galaxy',
        original_language: 'en',
        genre_ids: [28, 878, 12],
        popularity: 67.759,
        release_date: '2014-07-30',
        video: false,
        vote_average: 7.9,
        vote_count: 27409,
      },
      {
        backdrop_path: '/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
        id: 299534,
        original_title: 'Avengers: Endgame',
        overview:
          "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.",
        poster_path: '/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
        media_type: 'movie',
        adult: false,
        title: 'Avengers: Endgame',
        original_language: 'en',
        genre_ids: [12, 878, 28],
        popularity: 258.44,
        release_date: '2019-04-24',
        video: false,
        vote_average: 8.3,
        vote_count: 24843,
      },
      {
        backdrop_path: '/xcaSYLBhmDzJ6P14bcKe0KTh3QV.jpg',
        id: 424694,
        original_title: 'Bohemian Rhapsody',
        overview:
          "Singer Freddie Mercury, guitarist Brian May, drummer Roger Taylor and bass guitarist John Deacon take the music world by storm when they form the rock 'n' roll band Queen in 1970. Hit songs become instant classics. When Mercury's increasingly wild lifestyle starts to spiral out of control, Queen soon faces its greatest challenge yet – finding a way to keep the band together amid the success and excess.",
        poster_path: '/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg',
        media_type: 'movie',
        adult: false,
        title: 'Bohemian Rhapsody',
        original_language: 'en',
        genre_ids: [10402, 18],
        popularity: 217.494,
        release_date: '2018-10-24',
        video: false,
        vote_average: 7.988,
        vote_count: 16461,
      },
      {
        backdrop_path: '/2J283YNxKhxAqHeVegUJ5mzLfGb.jpg',
        id: 392044,
        original_title: 'Murder on the Orient Express',
        overview:
          'Genius Belgian detective Hercule Poirot investigates the murder of an American tycoon aboard the Orient Express train.',
        poster_path: '/kc2gJjebceoFgOQbukzPzP8SXVZ.jpg',
        media_type: 'movie',
        adult: false,
        title: 'Murder on the Orient Express',
        original_language: 'en',
        genre_ids: [9648, 18, 80],
        popularity: 62.231,
        release_date: '2017-11-03',
        video: false,
        vote_average: 6.713,
        vote_count: 9634,
      },
    ];



    
    this.route.paramMap.subscribe((params) => {
      const movieId = params.get('id');
      if (movieId) {
        this.movieService.getAnimeByID(+movieId).subscribe((res) => {
          console.log(res);
          // this.movie = res;
        });
        this.movieService.getAllTimeFavoriteAnime(1).subscribe((res:any) => {
          console.log(res.results);
          // this.movie = res;
        });
        this.movieService.getAnimeKeywords(+movieId).subscribe((res:any) => {
          console.log(res.results);
          // this.movie = res;
        });
        
        this.movieService.getMovieById(movieId).subscribe(data => {
          // this.movie = data;
          console.log(data)
        });

        this.movieService.getMovieRelated(movieId,1).subscribe(data => {
          // this.related = data;
          console.log(data)
        });
      }
      
    });*/
/*
    this.movie = {
      adult: false,
      backdrop_path: '/iHYh4cdO8ylA3W0dUxTDVdyJ5G9.jpg',
      belongs_to_collection: {
        id: 173710,
        name: 'Planet of the Apes (Reboot) Collection',
        poster_path: '/afGkMC4HF0YtXYNkyfCgTDLFe6m.jpg',
        backdrop_path: '/2ZkvqfOJUCINozB00wmYuGJQW81.jpg',
      },
      budget: 0,
      genres: [
        {
          id: 878,
          name: 'Science Fiction',
        },
        {
          id: 12,
          name: 'Adventure',
        },
        {
          id: 28,
          name: 'Action',
        },
      ],
      homepage:
        'https://www.20thcenturystudios.com/movies/kingdom-of-the-planet-of-the-apes',
      id: 653346,
      imdb_id: 'tt11389872',
      origin_country: ['US'],
      original_language: 'en',
      original_title: 'Kingdom of the Planet of the Apes',
      overview:
        "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.",
      popularity: 2758.182,
      poster_path: '/gKkl37BQuKTanygYQG1pyYgLVgf.jpg',
      production_companies: [
        {
          id: 127928,
          logo_path: '/h0rjX5vjW5r8yEnUBStFarjcLT4.png',
          name: '20th Century Studios',
          origin_country: 'US',
        },
        {
          id: 133024,
          logo_path: null,
          name: 'Oddball Entertainment',
          origin_country: 'US',
        },
        {
          id: 89254,
          logo_path: null,
          name: 'Jason T. Reed Productions',
          origin_country: 'US',
        },
      ],
      production_countries: [
        {
          iso_3166_1: 'US',
          name: 'United States of America',
        },
      ],
      release_date: '2024-05-08',
      revenue: 0,
      runtime: 145,
      spoken_languages: [
        {
          english_name: 'English',
          iso_639_1: 'en',
          name: 'English',
        },
      ],
      status: 'Released',
      tagline: 'No one can stop the reign.',
      title: 'Kingdom of the Planet of the Apes',
      video: false,
      vote_average: 7.247,
      vote_count: 178,
    };

    this.relatedMovies = [
      {
        backdrop_path: '/rmNlWyez5cniGtXkgixG1ezdqVk.jpg',
        id: 1093995,
        original_title: 'Chief of Station',
        overview:
          'After learning that the death of his wife was not an accident, a former CIA Station Chief is forced back into the espionage underworld, teaming up with an adversary to unravel a conspiracy that challenges everything he thought he knew.',
        poster_path: '/uuA01PTtPombRPvL9dvsBqOBJWm.jpg',
        media_type: 'movie',
        adult: false,
        title: 'Chief of Station',
        original_language: 'en',
        genre_ids: [28, 53],
        popularity: 237.965,
        release_date: '2024-05-02',
        video: false,
        vote_average: 4.882,
        vote_count: 17,
      },
      {
        backdrop_path: null,
        id: 1286214,
        original_title: 'Unmasked',
        overview:
          'Sofia, a woman in her mid-20s battling depression, stumbles upon a peculiar mask on the roadside and brings it home. Soon, strange things begin to happen. An irresistible urge to put on the mask develops and the lines between what is real and not begin to blur.',
        poster_path: '/94X3MLidLnMPcxfy8bAe3Va4A6s.jpg',
        media_type: 'movie',
        adult: false,
        title: 'Unmasked',
        original_language: 'en',
        genre_ids: [27, 53, 18],
        popularity: 1.167,
        release_date: '2024-03-22',
        video: false,
        vote_average: 9,
        vote_count: 1,
      },
      {
        backdrop_path: '/9s9o9RT9Yj6nDuRJjnJm78WFoFl.jpg',
        id: 1051896,
        original_title: 'Arcadian',
        overview:
          "In a near future, normal life on Earth has been decimated. Paul and his two sons, Thomas and Joseph, have been living a half-life – tranquility by day and torment by night. Every night, after the sun sets, they face the unrelenting attacks of a mysterious and violent evil. One day, when Thomas doesn't return home before sundown, Paul must leave the safety of their fortified farm to find him. A nightmarish battle ensues that forces the family to execute a desperate plan to survive.",
        poster_path: '/spWV1eRzlDxvai8LbxwAWR0Vst4.jpg',
        media_type: 'movie',
        adult: false,
        title: 'Arcadian',
        original_language: 'en',
        genre_ids: [878, 53, 27],
        popularity: 123.976,
        release_date: '2024-04-12',
        video: false,
        vote_average: 6.431,
        vote_count: 94,
      },
      {
        backdrop_path: '/2C3CdVzINUm5Cm1lrbT2uiRstwX.jpg',
        id: 856289,
        original_title: '封神第一部：朝歌风云',
        overview:
          'Based on the most well-known classical fantasy novel of China, Fengshenyanyi, the trilogy is a magnificent eastern high fantasy epic that recreates the prolonged mythical wars between humans, immortals and monsters, which happened more than three thousand years ago.',
        poster_path: '/ccJpK0rqzhQeP7Mrs2uKqObFY4L.jpg',
        media_type: 'movie',
        adult: false,
        title: 'Creation of the Gods I: Kingdom of Storms',
        original_language: 'zh',
        genre_ids: [28, 14, 10752],
        popularity: 250.964,
        release_date: '2023-07-20',
        video: false,
        vote_average: 7.112,
        vote_count: 245,
      },
      {
        backdrop_path: '/9W02KZYKLoINpqpJ2yv8ATxR1AK.jpg',
        id: 205587,
        original_title: 'The Judge',
        overview:
          "A successful lawyer returns to his hometown for his mother's funeral only to discover that his estranged father, the town's judge, is suspected of murder.",
        poster_path: '/tefUxj4Gg9hgQNgfEYd7kJQrIlD.jpg',
        media_type: 'movie',
        adult: false,
        title: 'The Judge',
        original_language: 'en',
        genre_ids: [18],
        popularity: 120.728,
        release_date: '2014-10-08',
        video: false,
        vote_average: 7.311,
        vote_count: 3909,
      },
      {
        backdrop_path: '/pwGmXVKUgKN13psUjlhC9zBcq1o.jpg',
        id: 634492,
        original_title: 'Madame Web',
        overview:
          'Forced to confront revelations about her past, paramedic Cassandra Webb forges a relationship with three young women destined for powerful futures...if they can all survive a deadly present.',
        poster_path: '/rULWuutDcN5NvtiZi4FRPzRYWSh.jpg',
        media_type: 'movie',
        adult: false,
        title: 'Madame Web',
        original_language: 'en',
        genre_ids: [28, 14],
        popularity: 504.186,
        release_date: '2024-02-14',
        video: false,
        vote_average: 5.613,
        vote_count: 1247,
      },
      {
        backdrop_path: '/qrGtVFxaD8c7et0jUtaYhyTzzPg.jpg',
        id: 823464,
        original_title: 'Godzilla x Kong: The New Empire',
        overview:
          'Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.',
        poster_path: '/tMefBSflR6PGQLv7WvFPpKLZkyk.jpg',
        media_type: 'movie',
        adult: false,
        title: 'Godzilla x Kong: The New Empire',
        original_language: 'en',
        genre_ids: [28, 878, 12],
        popularity: 1416.188,
        release_date: '2024-03-27',
        video: false,
        vote_average: 6.489,
        vote_count: 1037,
      },
      {
        backdrop_path: '/dqK9Hag1054tghRQSqLSfrkvQnA.jpg',
        id: 155,
        original_title: 'The Dark Knight',
        overview:
          'Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.',
        poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
        media_type: 'movie',
        adult: false,
        title: 'The Dark Knight',
        original_language: 'en',
        genre_ids: [18, 28, 80, 53],
        popularity: 118.08,
        release_date: '2008-07-16',
        video: false,
        vote_average: 8.5,
        vote_count: 31909,
      },
      {
        backdrop_path: '/8rpDcsfLJypbO6vREc0547VKqEv.jpg',
        id: 76600,
        original_title: 'Avatar: The Way of Water',
        overview:
          'Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.',
        poster_path: '/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
        media_type: 'movie',
        adult: false,
        title: 'Avatar: The Way of Water',
        original_language: 'en',
        genre_ids: [878, 12, 28],
        popularity: 190.709,
        release_date: '2022-12-14',
        video: false,
        vote_average: 7.624,
        vote_count: 11257,
      },
      {
        backdrop_path: '/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg',
        id: 475557,
        original_title: 'Joker',
        overview:
          'During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic crime figure.',
        poster_path: '/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
        media_type: 'movie',
        adult: false,
        title: 'Joker',
        original_language: 'en',
        genre_ids: [80, 53, 18],
        popularity: 429.755,
        release_date: '2019-10-01',
        video: false,
        vote_average: 8.2,
        vote_count: 24542,
      },
      {
        backdrop_path: '/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg',
        id: 634649,
        original_title: 'Spider-Man: No Way Home',
        overview:
          'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.',
        poster_path: '/5weKu49pzJCt06OPpjvT80efnQj.jpg',
        media_type: 'movie',
        adult: false,
        title: 'Spider-Man: No Way Home',
        original_language: 'en',
        genre_ids: [28, 12, 878],
        popularity: 232.005,
        release_date: '2021-12-15',
        video: false,
        vote_average: 8,
        vote_count: 19364,
      },
      {
        backdrop_path: '/lzWHmYdfeFiMIY4JaMmtR7GEli3.jpg',
        id: 438631,
        original_title: 'Dune',
        overview:
          "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence-a commodity capable of unlocking humanity's greatest potential-only those who can conquer their fear will survive.",
        poster_path: '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
        media_type: 'movie',
        adult: false,
        title: 'Dune',
        original_language: 'en',
        genre_ids: [878, 12],
        popularity: 550.083,
        release_date: '2021-09-15',
        video: false,
        vote_average: 7.778,
        vote_count: 11567,
      },
      {
        backdrop_path: '/yQIBS8B9l2qXoPoPtxSXvH7CfoT.jpg',
        id: 324786,
        original_title: 'Hacksaw Ridge',
        overview:
          'WWII American Army Medic Desmond T. Doss, who served during the Battle of Okinawa, refuses to kill people and becomes the first Conscientious Objector in American history to receive the Congressional Medal of Honor.',
        poster_path: '/wuz8TjCIWR2EVVMuEfBnQ1vuGS3.jpg',
        media_type: 'movie',
        adult: false,
        title: 'Hacksaw Ridge',
        original_language: 'en',
        genre_ids: [18, 36, 10752],
        popularity: 222.504,
        release_date: '2016-10-07',
        video: false,
        vote_average: 8.195,
        vote_count: 13279,
      },
      {
        backdrop_path: '/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg',
        id: 502356,
        original_title: 'The Super Mario Bros. Movie',
        overview:
          'While working underground to fix a water main, Brooklyn plumbers—and brothers—Mario and Luigi are transported down a mysterious pipe and wander into a magical new world. But when the brothers are separated, Mario embarks on an epic quest to find Luigi.',
        poster_path: '/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg',
        media_type: 'movie',
        adult: false,
        title: 'The Super Mario Bros. Movie',
        original_language: 'en',
        genre_ids: [16, 10751, 12, 14, 35],
        popularity: 223.628,
        release_date: '2023-04-05',
        video: false,
        vote_average: 7.676,
        vote_count: 8408,
      },
      {
        backdrop_path: '/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg',
        id: 346698,
        original_title: 'Barbie',
        overview:
          'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.',
        poster_path: '/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
        media_type: 'movie',
        adult: false,
        title: 'Barbie',
        original_language: 'en',
        genre_ids: [35, 12],
        popularity: 467.262,
        release_date: '2023-07-19',
        video: false,
        vote_average: 7.066,
        vote_count: 8203,
      },
      {
        backdrop_path: '/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg',
        id: 496243,
        original_title: '기생충',
        overview:
          "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.",
        poster_path: '/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
        media_type: 'movie',
        adult: false,
        title: 'Parasite',
        original_language: 'ko',
        genre_ids: [35, 53, 18],
        popularity: 100.038,
        release_date: '2019-05-30',
        video: false,
        vote_average: 8.5,
        vote_count: 17507,
      },
      {
        backdrop_path: '/uLtVbjvS1O7gXL8lUOwsFOH4man.jpg',
        id: 118340,
        original_title: 'Guardians of the Galaxy',
        overview:
          'Light years from Earth, 26 years after being abducted, Peter Quill finds himself the prime target of a manhunt after discovering an orb wanted by Ronan the Accuser.',
        poster_path: '/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg',
        media_type: 'movie',
        adult: false,
        title: 'Guardians of the Galaxy',
        original_language: 'en',
        genre_ids: [28, 878, 12],
        popularity: 67.759,
        release_date: '2014-07-30',
        video: false,
        vote_average: 7.9,
        vote_count: 27409,
      },
      {
        backdrop_path: '/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
        id: 299534,
        original_title: 'Avengers: Endgame',
        overview:
          "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.",
        poster_path: '/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
        media_type: 'movie',
        adult: false,
        title: 'Avengers: Endgame',
        original_language: 'en',
        genre_ids: [12, 878, 28],
        popularity: 258.44,
        release_date: '2019-04-24',
        video: false,
        vote_average: 8.3,
        vote_count: 24843,
      },
      {
        backdrop_path: '/xcaSYLBhmDzJ6P14bcKe0KTh3QV.jpg',
        id: 424694,
        original_title: 'Bohemian Rhapsody',
        overview:
          "Singer Freddie Mercury, guitarist Brian May, drummer Roger Taylor and bass guitarist John Deacon take the music world by storm when they form the rock 'n' roll band Queen in 1970. Hit songs become instant classics. When Mercury's increasingly wild lifestyle starts to spiral out of control, Queen soon faces its greatest challenge yet – finding a way to keep the band together amid the success and excess.",
        poster_path: '/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg',
        media_type: 'movie',
        adult: false,
        title: 'Bohemian Rhapsody',
        original_language: 'en',
        genre_ids: [10402, 18],
        popularity: 217.494,
        release_date: '2018-10-24',
        video: false,
        vote_average: 7.988,
        vote_count: 16461,
      },
      {
        backdrop_path: '/2J283YNxKhxAqHeVegUJ5mzLfGb.jpg',
        id: 392044,
        original_title: 'Murder on the Orient Express',
        overview:
          'Genius Belgian detective Hercule Poirot investigates the murder of an American tycoon aboard the Orient Express train.',
        poster_path: '/kc2gJjebceoFgOQbukzPzP8SXVZ.jpg',
        media_type: 'movie',
        adult: false,
        title: 'Murder on the Orient Express',
        original_language: 'en',
        genre_ids: [9648, 18, 80],
        popularity: 62.231,
        release_date: '2017-11-03',
        video: false,
        vote_average: 6.713,
        vote_count: 9634,
      },
    ];*/

// this.movie = {
//   adult: false,
//   backdrop_path: "/iHYh4cdO8ylA3W0dUxTDVdyJ5G9.jpg",
//   belongs_to_collection: {
//     id: 173710,
//     name: "Planet of the Apes (Reboot) Collection",
//     poster_path: "/afGkMC4HF0YtXYNkyfCgTDLFe6m.jpg",
//     backdrop_path: "/2ZkvqfOJUCINozB00wmYuGJQW81.jpg"
//   },
//   budget: 0,
//   genres: [
//     {
//       id: 878,
//       name: "Science Fiction"
//     },
//     {
//       id: 12,
//       name: "Adventure"
//     },
//     {
//       id: 28,
//       name: "Action"
//     }
//   ],
//   homepage: "https://www.20thcenturystudios.com/movies/kingdom-of-the-planet-of-the-apes",
//   id: 653346,
//   imdb_id: "tt11389872",
//   origin_country: [
//     "US"
//   ],
//   original_language: "en",
//   original_title: "Kingdom of the Planet of the Apes",
//   overview: "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.",
//   popularity: 2138.511,
//   poster_path: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
//   production_companies: [
//     {
//       id: 127928,
//       logo_path: "/h0rjX5vjW5r8yEnUBStFarjcLT4.png",
//       name: "20th Century Studios",
//       origin_country: "US"
//     },
//     {
//       id: 133024,
//       logo_path: null,
//       name: "Oddball Entertainment",
//       origin_country: "US"
//     },
//     {
//       id: 89254,
//       logo_path: null,
//       name: "Jason T. Reed Productions",
//       origin_country: "US"
//     }
//   ],
//   production_countries: [
//     {
//       iso_3166_1: "US",
//       name: "United States of America"
//     }
//   ],
//   release_date: "2024-05-08",
//   revenue: 0,
//   runtime: 145,
//   spoken_languages: [
//     {
//       english_name: "English",
//       iso_639_1: "en",
//       name: "English"
//     }
//   ],
//   status: "Released",
//   tagline: "No one can stop the reign.",
//   title: "Kingdom of the Planet of the Apes",
//   video: false,
//   vote_average: 7.069,
//   vote_count: 131
// }

/*
    this.tvshow = {
      adult: false,
      backdrop_path: "/5fWxvjOUvtUoSmiMEpFl77V6KZV.jpg",
      created_by: [
        {
          id: 1701194,
          credit_id: "62434e5612425c005c65b467",
          name: "Blake Crouch",
          original_name: "Blake Crouch",
          gender: 2,
          profile_path: "/4MUYqLslh3Yxm7EsEOj11aJka9W.jpg"
        }
      ],
      episode_run_time: [],
      first_air_date: "2024-05-07",
      genres: [
        {
          id: 18,
          name: "Drama"
        },
        {
          id: 9648,
          name: "Mystery"
        },
        {
          id: 10765,
          name: "Sci-Fi & Fantasy"
        }
      ],
      homepage: "https://tv.apple.com/show/umc.cmc.4luj45vtqpmjsvb6sc2675oeg",
      id: 196322,
      in_production: true,
      languages: [
        "en"
      ],
      last_air_date: "2024-05-07",
      last_episode_to_air: {
        id: 4115937,
        overview: "Jason wakes to a life that makes no sense—he doesn't have a family and he's created something extraordinary.",
        name: "Trip of a Lifetime",
        vote_average: 8,
        vote_count: 1,
        air_date: "2024-05-07",
        episode_number: 2,
        episode_type: "standard",
        production_code: "",
        runtime: 54,
        season_number: 1,
        show_id: 196322,
        still_path: "/tGDNcydJxlu448Mc5Qkdmw2NzWz.jpg"
      },
      name: "Dark Matter",
      next_episode_to_air: {
        id: 4115938,
        overview: "Leighton and Amanda show Jason his groundbreaking invention. Daniela and Jason2 throw a dinner party.",
        name: "The Box",
        vote_average: 0,
        vote_count: 0,
        air_date: "2024-05-14",
        episode_number: 3,
        episode_type: "standard",
        production_code: "",
        runtime: 50,
        season_number: 1,
        show_id: 196322,
        still_path: "/ovSSE8DjAWsVlI3uBTluRZPiYu3.jpg"
      },
      networks: [
        {
          id: 2552,
          logo_path: "/4KAy34EHvRM25Ih8wb82AuGU7zJ.png",
          name: "Apple TV+",
          origin_country: ""
        }
      ],
      number_of_episodes: 9,
      number_of_seasons: 1,
      origin_country: [
        "US"
      ],
      original_language: "en",
      original_name: "Dark Matter",
      overview: "Jason Dessen is abducted into an alternate version of his life. To get back to his true family, he embarks on a harrowing journey to save them from the most terrifying foe imaginable: himself.",
      popularity: 845.783,
      poster_path: "/c6MRUtPk0nEPQ9FBD9RdRKt2rIm.jpg",
      production_companies: [
        {
          id: 53462,
          logo_path: "/nx8B3Phlcse02w86RW4CJqzCnfL.png",
          name: "Matt Tolmach Productions",
          origin_country: "US"
        },
        {
          id: 11073,
          logo_path: "/aCbASRcI1MI7DXjPbSW9Fcv9uGR.png",
          name: "Sony Pictures Television Studios",
          origin_country: "US"
        },
        {
          id: 228373,
          logo_path: null,
          name: "Mountainside Entertainment",
          origin_country: "US"
        }
      ],
      production_countries: [
        {
          iso_3166_1: "US",
          name: "United States of America"
        }
      ],
      seasons: [
        {
          air_date: "2024-05-07",
          episode_count: 9,
          id: 285443,
          name: "Season 1",
          overview: "",
          poster_path: "/c6MRUtPk0nEPQ9FBD9RdRKt2rIm.jpg",
          season_number: 1,
          vote_average: 8
        }
      ],
      spoken_languages: [
        {
          english_name: "English",
          iso_639_1: "en",
          name: "English"
        }
      ],
      status: "Returning Series",
      tagline: "One life. Infinite possibilities.",
      type: "Scripted",
      vote_average: 8.328,
      vote_count: 29
    }


    this.keywords = [
      {
        name: "chicago, illinois",
        id: 520
      },
      {
        name: "based on novel or book",
        id: 818
      },
      {
        name: "alternate reality",
        id: 156282
      },
      {
        name: "alternate universe",
        id: 245157
      }
    ]*/
/*
    this.anime = {
      adult: false,
      backdrop_path: "/5cVTc55soLT8SuJBmTS0SZhhBkQ.jpg",
      created_by: [],
      episode_run_time: [
        24
      ],
      first_air_date: "2024-04-11",
      genres: [
        {
          id: 16,
          name: "Animation"
        },
        {
          id: 10759,
          name: "Action & Adventure"
        }
      ],
      homepage: "https://kenkadokugaku.com",
      id: 246029,
      in_production: true,
      languages: [
        "ja"
      ],
      last_air_date: "2024-05-02",
      last_episode_to_air: {
        id: 5273665,
        overview: "SUBSFLIX.COM",
        name: "Friends",
        vote_average: 0,
        vote_count: 0,
        air_date: "2024-05-09",
        episode_number: 5,
        episode_type: "standard",
        production_code: "",
        runtime: 24,
        season_number: 1,
        show_id: 246029,
        still_path: "/3PENBE4BoNN2v7uDkns9GTapmLW.jpg"
      },
      name: "Viral Hit",
      next_episode_to_air: {
        id: 5273666,
        overview: "",
        name: "Episode 6",
        vote_average: 0,
        vote_count: 0,
        air_date: "2024-05-16",
        episode_number: 6,
        episode_type: "standard",
        production_code: "",
        runtime: 24,
        season_number: 1,
        show_id: 246029,
        still_path: null
      },
      networks: [
        {
          id: 1,
          logo_path: "/yS5UJjsSdZXML0YikWTYYHLPKhQ.png",
          name: "Fuji TV",
          origin_country: "JP"
        }
      ],
      number_of_episodes: 12,
      number_of_seasons: 1,
      origin_country: [
        "JP"
      ],
      original_language: "ja",
      original_name: "喧嘩独学",
      overview: "Scrawny high school student Hobin Yu is probably the last guy you'd expect to star in a NewTube channel that revolves around fighting. But after following some advice from a mysterious NewTube channel, Hobin is soon knocking out guys stronger than him and raking in more money than he could have ever dreamed of. Can Hobin keep this up, or will he eventually meet his match?",
      popularity: 141.984,
      poster_path: "/1kZBsmNYgjRxFPBfrFxkQGwS7xX.jpg",
      production_companies: [
        {
          id: 133501,
          logo_path: "/sLuyHvpLctHcBytC23M7a3TK6Ar.png",
          name: "Okuruto Noboru",
          origin_country: "JP"
        },
        {
          id: 172917,
          logo_path: "/pE0G6bDiZDNs972Zc6ZZW1QNdr6.png",
          name: "slowcurve",
          origin_country: "JP"
        },
        {
          id: 3341,
          logo_path: "/dTG5dXE1kU2mpmL9BNnraffckLU.png",
          name: "Fuji Television Network",
          origin_country: "JP"
        },
        {
          id: 98553,
          logo_path: "/lLOwYgpMNq7o1vhK9m8yL13Sc0Y.png",
          name: "Crunchyroll",
          origin_country: "JP"
        },
        {
          id: 218052,
          logo_path: "/ekDHmKkZgEawMh2tEffOzMXkaYM.png",
          name: "LINE Digital Frontier",
          origin_country: "JP"
        },
        {
          id: 1778,
          logo_path: "/b5rT6VbYza3LyfltCmz1OcqzWJM.png",
          name: "dentsu",
          origin_country: "JP"
        },
        {
          id: 59206,
          logo_path: "/oMtJVGvqLAyQZvYTvjDIcbVEzwD.png",
          name: "BS Fuji",
          origin_country: "JP"
        },
        {
          id: 84048,
          logo_path: "/mkxZQuPpZ0cBDfjr4PAxltGSsoH.png",
          name: "GAGA Corporation",
          origin_country: "JP"
        },
        {
          id: 198847,
          logo_path: "/lLOwYgpMNq7o1vhK9m8yL13Sc0Y.png",
          name: "Crunchyroll",
          origin_country: "US"
        }
      ],
      production_countries: [
        {
          iso_3166_1: "JP",
          name: "Japan"
        }
      ],
      seasons: [
        {
          air_date: "2024-04-11",
          episode_count: 12,
          id: 378436,
          name: "Season 1",
          overview: "",
          poster_path: "/saY79VayosiHPxZUHRpsnMBG0dY.jpg",
          season_number: 1,
          vote_average: 8.7
        }
      ],
      spoken_languages: [
        {
          english_name: "Japanese",
          iso_639_1: "ja",
          name: "日本語"
        }
      ],
      status: "Returning Series",
      tagline: "",
      type: "Scripted",
      vote_average: 7.333,
      vote_count: 3
    }
       this.keywords = [
      {
        name: "chicago, illinois",
        id: 520
      },
      {
        name: "based on novel or book",
        id: 818
      },
      {
        name: "alternate reality",
        id: 156282
      },
      {
        name: "alternate universe",
        id: 245157
      }
    ]*/
