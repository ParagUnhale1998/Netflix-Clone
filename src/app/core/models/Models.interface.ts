
//favourite anime , Popular anime , recent anime

export interface IallAnimeResponse {
    recentAnime: IanimeResponse
    favouriteAnime: IanimeResponse
    popularAnime: IanimeResponse
  }

  
export interface IanimeResponse {
    page?: number
    results: IanimeCard[]
    total_pages?: number
    total_results?: number
  }
  
  export interface IanimeCard {
    adult: boolean
    backdrop_path?: string
    genre_ids: number[]
    id: number
    origin_country: string[]
    original_language: string
    original_name: string
    media_type?: string
    overview: string
    popularity: number
    poster_path: string
    first_air_date: string
    name: string
    vote_average: number
    vote_count: number
  }
  
  // now playing movies ,popular movies ,top rated movies , upcoming movies 

  export interface IallMoviesResponse {
    popularMovies: ImoviesResponse
    topRatedMovies: ImoviesResponse
    upcomingMovies: ImoviesResponse
    nowPlayingTV: ImoviesResponse
  }

  export interface ImoviesResponse {
    dates?: Dates
    page?: number
    results: ImoviesCard[]
    total_pages?: number
    total_results?: number
  }
  
  export interface Dates {
    maximum: string
    minimum: string
  }
  
  export interface ImoviesCard {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
  }
  

  // now playing tv shows , top rated tv shows , comdy tv shows



  export interface IallTvResponse {
    trendingTvShows: ItvResponse
    topRatedTvShows: ItvResponse
    comedyTvShows: ItvResponse
    nowPlayingTV: ItvResponse
  }

  export interface ItvResponse {
    page?: number
    results: ItvCard[]
    total_pages?: number
    total_results?: number
  }
  
  export interface ItvCard {
    adult: boolean
    backdrop_path?: string
    genre_ids: number[]
    id: number
    origin_country: string[]
    original_language: string
    original_name: string
    media_type?: string
    overview: string
    popularity: number
    poster_path: string
    first_air_date: string
    name: string
    vote_average: number
    vote_count: number
  }
  

  // anime all data types // GET ANIME BY ID

  export interface IanimeID {
    adult: boolean
    backdrop_path: string
    created_by: any[]
    episode_run_time: number[]
    first_air_date: string
    genres: Genre[]
    homepage: string
    id: number
    in_production: boolean
    languages: string[]
    last_air_date: string
    last_episode_to_air: LastEpisodeToAir
    name: string
    next_episode_to_air: NextEpisodeToAir
    networks: Network[]
    number_of_episodes: number
    number_of_seasons: number
    origin_country: string[]
    original_language: string
    original_name: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: ProductionCompany[]
    production_countries: ProductionCountry[]
    seasons: Season[]
    spoken_languages: SpokenLanguage[]
    status: string
    tagline: string
    type: string
    vote_average: number
    vote_count: number
  }
  
  export interface IanimeKeywordResponse {
    id: number
    results: IanimeKeywordResult[]
  }
  
  export interface IanimeKeywordResult {
    name: string
    id: number
  }

  

  export interface Genre {
    id: number
    name: string
  }
  
  export interface LastEpisodeToAir {
    id: number
    overview: string
    name: string
    vote_average: number
    vote_count: number
    air_date: string
    episode_number: number
    episode_type: string
    production_code: string
    runtime: number
    season_number: number
    show_id: number
    still_path: string
  }
  
  export interface NextEpisodeToAir {
    id: number
    overview: string
    name: string
    vote_average: number
    vote_count: number
    air_date: string
    episode_number: number
    episode_type: string
    production_code: string
    runtime: any
    season_number: number
    show_id: number
    still_path: string
  }
  
  export interface Network {
    id: number
    logo_path: string
    name: string
    origin_country: string
  }
  
  export interface ProductionCompany {
    id: number
    logo_path?: string
    name: string
    origin_country: string
  }
  
  export interface ProductionCountry {
    iso_3166_1: string
    name: string
  }
  
  export interface Season {
    air_date: string
    episode_count: number
    id: number
    name: string
    overview: string
    poster_path: string
    season_number: number
    vote_average: number
  }
  
  export interface SpokenLanguage {
    english_name: string
    iso_639_1: string
    name: string
  }
  

  // GET TV BY ID , KEYWORDS , RESPONSE

  export interface ItvID {
    adult: boolean
    backdrop_path: string
    created_by: CreatedBy[]
    episode_run_time: any[]
    first_air_date: string
    genres: Genre[]
    homepage: string
    id: number
    in_production: boolean
    languages: string[]
    last_air_date: string
    last_episode_to_air: LastEpisodeToAir
    name: string
    next_episode_to_air: NextEpisodeToAir
    networks: Network[]
    number_of_episodes: number
    number_of_seasons: number
    origin_country: string[]
    original_language: string
    original_name: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: ProductionCompany[]
    production_countries: ProductionCountry[]
    seasons: Season[]
    spoken_languages: SpokenLanguage[]
    status: string
    tagline: string
    type: string
    vote_average: number
    vote_count: number
  }
  
  export interface CreatedBy {
    id: number
    credit_id: string
    name: string
    original_name: string
    gender: number
    profile_path: string
  }

  export interface ItvKeywordResponse {
    id: number
    results: ItvKeywordResult[]
  }
  
  export interface ItvKeywordResult {
    name: string
    id: number
  }
  

  // GET MOVIE BY ID , REPSONSE , KEYWORDS 

  export interface ImovieID {
    adult: boolean
    backdrop_path: string
    belongs_to_collection: BelongsToCollection
    budget: number
    genres: Genre[]
    homepage: string
    id: number
    imdb_id: string
    origin_country: string[]
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: ProductionCompany[]
    production_countries: ProductionCountry[]
    release_date: string
    revenue: number
    runtime: number
    spoken_languages: SpokenLanguage[]
    status: string
    tagline: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
  }
  
  export interface BelongsToCollection {
    id: number
    name: string
    poster_path: string
    backdrop_path: string
  }
  
  export interface Genre {
    id: number
    name: string
  }
   
  export interface ProductionCountry {
    iso_3166_1: string
    name: string
  }
  
  export interface SpokenLanguage {
    english_name: string
    iso_639_1: string
    name: string
  }
  

  export interface ImovieKeywordResponse {
    id: number
    keywords: ImovieKeywordResult[]
  }
  
  export interface ImovieKeywordResult {
    id: number
    name: string
  }
  