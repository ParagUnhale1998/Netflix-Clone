# Netflix-Like Website

## Introduction
Hello, everyone! My name is Parag Unhale. Recently, I created this amazing Netflix-like website using Angular and Tailwind CSS, utilizing the IMDb API. This README will guide you through the features, setup, and usage of the project.

## Features
- **Home Page**: 
  - Netflix logo, language button, and sign-in button.
  - Awesome heading banner text with a beautiful Netflix background.
  - "Get Started" button for logging in as a guest.
  - Google Gmail login authentication.
  - Beautiful loading spinner on login.
  - Video banner with heading text for movies, series, and Stranger Things.
  - Information about movies, play button, and more info button.

- **Navigation Bar**:
  - Fixed navbar with Netflix logo.
  - Tabs for Home, TV, Movies, and Anime.
  - Search bar icon, notification icon, and user profile picture with a dropdown showing the username and logout button.
  - Background color change on scroll using a custom scroll directive.

- **Content Sections**:
  - Popular movies, trending shows, popular anime, top-rated movies, recent releases, top-rated TV shows, upcoming movies, comedy TV shows, favorite anime, and many more.
  - TV page with a slideshow banner changing every 5 seconds, featuring TV show posters, names, and other information.
  - Movies page with a slideshow banner, popular movies, top-rated movies, and now playing movies.
  - Anime page with a top anime slider, popular weekly anime, top ten anime, and recent releases with pagination.

- **Details Page**:
  - Anime details page with a poster, play button, title, original title, description, arrival date, total seasons, status, genre, rating, duration, and keywords.
  - Video modal for anime trailers.
  - Recommendations section with pagination.

- **Search Functionality**:
  - Search modal with debouncing to delay API calls and suggest top 10 results.
  - Navigation to the details page of the selected search result.

- **Responsiveness**:
  - Fully responsive design for all devices.

- **Authentication and Guards**:
  - Auth guard for protected routes.
  - Interceptor for setting authorization bearer tokens in API calls.
  - Session storage for user details.

- **Performance Enhancements**:
  - Data caching service for reducing unnecessary API calls.
  - Custom image pipe for showing images using IDs.
  - Custom scroll directive for navbar background color change.
  - Best practices followed for clean code API calls.

## Project Structure
- **src**: Main source folder.
  - **environments**: Environment configuration.
  - **assets**: Static assets.
  - **app**: Main app folder.
    - **core**: Core functionalities.
      - **constants**: Constant values.
      - **guards**: Route guards.
      - **interceptors**: HTTP interceptors.
      - **models**: Data models.
      - **services**: Core services.
    - **pages**: Application pages.
      - **anime**: Anime page components.
      - **details**: Details page components.
      - **home**: Home page components.
      - **login-home**: Login home page components.
      - **movies**: Movies page components.
      - **tv**: TV page components.
    - **shared**: Shared modules.
      - **components**: Shared components.
      - **directives**: Custom directives.
      - **pipes**: Custom pipes.
      - **services**: Shared services.

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/netflix-like-website.git
   cd netflix-like-website

2.Install dependencies:


npm install
Set up environment variables:

Create environment configuration files in the src/environments folder for development and production settings.
Start the development server:

ng serve
Open your browser and navigate to http://localhost:4200/.

Usage
Use the sign-in button for Google Gmail login authentication.
Explore the various sections like popular movies, trending shows, and more.
Use the search functionality to find specific movies, TV shows, or anime.
Enjoy the responsive design across different devices.
Log out using the dropdown in the user profile picture.
Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that your code follows the project's coding standards.

License
This project is licensed under the MIT License.

Acknowledgments
IMDb API for providing movie, TV show, and anime data.
Angular and Tailwind CSS for the amazing development framework and styling.

I hope you like this website. Keep supporting my development journey, and thank you!

![Image Description](assets/netflix.jpg)

