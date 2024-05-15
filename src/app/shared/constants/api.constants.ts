export const API_KEY = 'b08b3db0727428549f0e771a528c714c'; // Replace with your API key
export const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDhiM2RiMDcyNzQyODU0OWYwZTc3MWE1MjhjNzE0YyIsInN1YiI6IjY2M2U1NTZjNTY2MTI4MGQ3ZGZiMzdmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f3wD2arnCMw_AWGKpD6xvXOPA-kFI9h3pCNuPCrQj78'; // Replace with your access token

export const API_BASE_URL = 'https://api.themoviedb.org/3';
export const IMG_BASE_URL = 'https://image.tmdb.org/t/p';
export const IMG_ORIGINAL_SIZE = 'https://image.tmdb.org/t/p/w1280';

export const LANGUAGE = 'en-US';
export const DEFAULT_PARAMS = {
  include_adult: 'false',
  include_video: 'true',
  language: LANGUAGE,
  sort_by: 'popularity.desc',
  page: '1'
};

// Movie endpoints
export const MOVIE_ENDPOINTS = {
  TOP_RATED: 'movie/top_rated',
  POPULAR: 'movie/popular',
  UPCOMING: 'movie/upcoming',
  NOW_PLAYING: 'movie/now_playing',
};

// TV endpoints
export const TV_ENDPOINTS = {
  TRENDING: 'trending/tv/week',
  TOP_RATED: 'tv/top_rated',
  COMEDY: 'discover/tv',
  NOW_PLAYING: 'tv/on_the_air',
};

// Anime endpoints
export const ANIME_ENDPOINTS = {
  RECENT_RELEASED: 'discover/tv',
  POPULAR_WEEK: 'discover/tv',
  ALL_TIME_FAVORITE: 'discover/tv',
};

// Search endpoint
export const SEARCH_ENDPOINT = 'search/multi';

// ID GENRES Category


export const MOVIE_GENRES = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' }
  ];

  export const TV_GENRES = [
    { id: 10759, name: 'Action & Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 10762, name: 'Kids' },
    { id: 9648, name: 'Mystery' },
    { id: 10763, name: 'News' },
    { id: 10764, name: 'Reality' },
    { id: 10765, name: 'Sci-Fi & Fantasy' },
    { id: 10766, name: 'Soap' },
    { id: 10767, name: 'Talk' },
    { id: 10768, name: 'War & Politics' },
    { id: 37, name: 'Western' }
  ];


// Image Sizes
export const IMAGE_SIZES = {
    BACKDROP: ['w300', 'w780', 'w1280', 'original'],
    LOGO: ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'],
    POSTER: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
    PROFILE: ['w45', 'w185', 'h632', 'original'],
    STILL: ['w92', 'w185', 'w300', 'original']
  };
