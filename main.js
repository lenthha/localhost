let currentPage = 1;
let caseCount = 0;

window.onload = function () {
    loadMovies(currentPage);
};

window.onscroll = function () {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        currentPage++;
        loadMovies(currentPage);
    }
};

function loadMovies(page) {
    fetch(`http://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&page=${page}`)
        .then(response => response.json())
        .then(data => {
            let container = document.getElementById('movie-container');
            let movieCase = document.createElement('div');
            movieCase.className = 'movie-case';

            data.results.forEach((movie, index) => {
                if (index % 6 === 0 && index !== 0) {
                    container.appendChild(movieCase);
                    movieCase = document.createElement('div');
                    movieCase.className = 'movie-case';
                }

                let card = document.createElement('div');
                card.className = 'movie-card';

                let image = document.createElement('img');
                image.src = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
                image.alt = movie.title;

                let overlay = document.createElement('div');
                overlay.className = 'overlay';

                let title = document.createElement('h2');
                title.textContent = movie.title;
                title.className = 'movie-title';

                overlay.appendChild(title);
                card.appendChild(image);
                card.appendChild(overlay);
                movieCase.appendChild(card);
            });

            container.appendChild(movieCase);
        })
        .catch(error => console.error('Ошибка:', error));
}

document.querySelectorAll('.arrow').forEach(arrow => {
    arrow.addEventListener('click', function () {
        document.querySelector('.movie-container').scrollBy({
            left: (this.classList.contains('right-arrow') ? 1 : -1) * document.querySelector('.movie-card').offsetWidth,
            behavior: 'smooth'
        });
    });
});
