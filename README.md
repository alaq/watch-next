# iCheckMovies Next Movie Scraper

This scrapes icheckmovies.com for the next movie on my list to watch. The more ICM toplists a movie is on, the higher it is on my list. We cannot access this without logging in, but the [1001 Movies You Must See Before You Die](https://www.icheckmovies.com/lists/1001+movies+you+must+see+before+you+die/) is a good proxy for this.

To only get the movies I have not seen myself already I use [this](https://www.icheckmovies.com/lists/1001+movies+you+must+see+before+you+die/?user=soviel&sort=officialtoplists) url.

The data is fetched every day with a [Github Action](./.github/workflows/scrape.yml) which then commits the JSON to this repository. There is a next movie is displayed [on Github Pages](https://alaq.github.io/watch-next/).