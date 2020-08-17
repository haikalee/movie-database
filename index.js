import './item-list.js';
import './item-container.js';

let newMovie = "";
let old = "";
// Init
const init = () => {
    showPopularMovie();
}
document.addEventListener('DOMContentLoaded', init);

// Global Variable
const spinner = document.querySelector('.spinner-border');
const btnPopularMovie = document.querySelector('.popular-movie');
const btnTopRatedMovie = document.querySelector('.top-related-movie');
const btnPopularShow = document.querySelector('.popular-tv');
const btnTopRatedShow = document.querySelector('.top-related-tv');
const movieContainer = document.querySelector('.movie-container');


btnPopularMovie.addEventListener('click', () => {
    old = newMovie;
    movieContainer.removeChild(old)
    showPopularMovie()
})
btnTopRatedMovie.addEventListener('click', () => {
    old = newMovie;
    movieContainer.removeChild(old)
    showTopRatedMovie()
})
btnPopularShow.addEventListener('click', () => {
    old = newMovie;
    movieContainer.removeChild(old)
    showPopularTv();
})
btnTopRatedShow.addEventListener('click', () => {
    old = newMovie;
    movieContainer.removeChild(old)
    showTopRatedTv()
})

const showTopRatedTv = () => {
    btnTopRatedMovie.classList.remove('active');
    btnPopularMovie.classList.remove('active');
    btnPopularShow.classList.remove('active');
    btnTopRatedShow.classList.add('active');
    spinner.remove('d-none');
    fetchJson('https://api.themoviedb.org/3/tv/top_rated?api_key=b78ab1b5579e14c01def23c7f72c18df', 'tv');
}

const showPopularTv = () => {
    btnTopRatedMovie.classList.remove('active');
    btnPopularMovie.classList.remove('active');
    btnPopularShow.classList.add('active');
    btnTopRatedShow.classList.remove('active');
    spinner.remove('d-none');
    fetchJson('https://api.themoviedb.org/3/tv/popular?api_key=b78ab1b5579e14c01def23c7f72c18df', 'tv');
}
// Top Rated Movie
const showTopRatedMovie = () => {
    btnTopRatedMovie.classList.add('active');
    btnPopularMovie.classList.remove('active');
    btnPopularShow.classList.remove('active');
    btnTopRatedShow.classList.remove('active');
    spinner.remove('d-none');
    fetchJson('https://api.themoviedb.org/3/movie/top_rated?api_key=b78ab1b5579e14c01def23c7f72c18df', 'movie');
}

// Popular Movie
const showPopularMovie = () => {
    btnTopRatedMovie.classList.remove('active');
    btnPopularMovie.classList.add('active');
    btnPopularShow.classList.remove('active');
    btnTopRatedShow.classList.remove('active');
    spinner.remove('d-none')
    fetchJson('https://api.themoviedb.org/3/movie/popular?api_key=b78ab1b5579e14c01def23c7f72c18df', 'movie');
}

// SearchEngine
document.querySelector('.btn-movie-search').addEventListener('click', e => {
    e.preventDefault();
    const keyword = document.querySelector('.keyword').value;
    old = newMovie;
    movieContainer.removeChild(old)
    showSearchMovie(keyword);
})

document.querySelector('.btn-tv-search').addEventListener('click', e => {
    e.preventDefault();
    const keyword = document.querySelector('.keyword').value;
    old = newMovie;
    movieContainer.removeChild(old)
    showSearchTv(keyword);
})

// Search Movie
const showSearchMovie = keyword => {
    spinner.remove('d-none');
    btnTopRatedMovie.classList.remove('active');
    btnPopularMovie.classList.remove('active');
    btnPopularShow.classList.remove('active');
    btnTopRatedShow.classList.remove('active');
    fetchJson(`https://api.themoviedb.org/3/search/movie?api_key=b78ab1b5579e14c01def23c7f72c18df&query=${keyword}`, 'movie');
}
const showSearchTv = keyword => {
    spinner.remove('d-none');
    btnTopRatedMovie.classList.remove('active');
    btnPopularMovie.classList.remove('active');
    btnPopularShow.classList.remove('active');
    btnTopRatedShow.classList.remove('active');
    fetchJson(`https://api.themoviedb.org/3/search/tv?api_key=b78ab1b5579e14c01def23c7f72c18df&query=${keyword}`, 'tv');
}

const showTrailer = id => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=b78ab1b5579e14c01def23c7f72c18df`)
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.results.length == 0) {
                document.querySelector('.trailer').innerHTML = `-`;
            } else {
                responseJson.results.forEach(m => {
                    if (m.type === "Trailer") {
                        document.querySelector('.trailer').innerHTML = `<a href="https://www.youtube.com/watch?v=${m.key}" target="_blank">https://www.youtube.com/watch?v=${m.key}</a>`;
                    }
                });
            }
        })
        .catch(e => errorAlert(e));
}

const fetchJson = (url, type) => {
    fetch(url)
    .then(response => response.json())
    .then(responseJson => {
            if (responseJson.results.length == 0) {
                spinner.add('d-none')
                container.innerHTML = `<div class="col mt-5">
                <div class="alert alert-danger" role="alert">
                                            Upsss..... movie / Tv not found :(
                                            </div>
                                        </div>`;
            } else {
                const movie = document.createElement('item-list');
                movie.items = responseJson.results;
                newMovie = movie;
                movieContainer.appendChild(newMovie);
                document.querySelectorAll('.btn-detail').forEach(btn => {
                    btn.addEventListener('click', function () {
                        getDetail(this.dataset.id, type)
                    })
                })                
                spinner.add('d-none');
            }
        })
        .catch(e => {
            errorAlert(e)
        });
}

const getDetail = (id, type) => {
    let url = ``;
    if (type === 'movie') {
        url = `https://api.themoviedb.org/3/movie/${id}?api_key=b78ab1b5579e14c01def23c7f72c18df`;
    } 
    if (type === 'tv') {
        url = `https://api.themoviedb.org/3/tv/${id}?api_key=b78ab1b5579e14c01def23c7f72c18df`;
    }
    fetch(url)
        .then(response => response.json())
        .then(responseJson => {
            showDetailMovie(responseJson, type)
        })
        .catch(e => {
            errorAlert(e);
        })
}

const showDetailMovie = (d, type) => {
    const container = document.querySelector('.modal-body');
    container.innerHTML = ` <div class="row">
                                <div class="col-md-3">
                                    <img src="https://image.tmdb.org/t/p/w500${d.poster_path}" alt="The Kissing Booth 2" class="img-fluid">
                                </div>
                                <div class="col-md detail-container">
                                    <ul class="list-group">
                                        <li class="list-group-item"><strong>Title : </strong>${d.original_title || d.original_name}</li>
                                        <li class="list-group-item"><strong>Genre : </strong> <span class="genre"></span></li>
                                        <li class="list-group-item"><strong>Release Date : </strong>${d.release_date || d.first_air_date}</li>
                                        <li class="list-group-item"><strong>${d.tagline ? 'Tagline' : 'Season'} : </strong><i>${d.tagline ? d.tagline : d.number_of_seasons }</i></li>
                                        <li class="list-group-item"><strong>${type === 'movie' ? "Trailer" : "Homepage"} : </strong><span class="trailer"><a href="${type === 'movie' ? showTrailer(d.id) : d.homepage}" target="_blank">${type === 'movie' ? showTrailer(d.id) : d.homepage}</a></span></li>
                                        <li class="list-group-item"><strong>Overview : </strong>${d.overview}</li>
                                    </ul>
                                </div>
                            </div>`;
    d.genres.forEach(g => {
        document.querySelector('.genre').innerHTML = g.name;
    })
}

const errorAlert = e => {
    if (e == "TypeError: Failed to fetch") {
        const container = document.querySelector('.modal-body');
        container.innerHTML = ` <div class="row">
                                    <div class="alert alert-danger m-auto" role="alert">
                                        Please Check Your Connection!
                                    </div>
                                </div>`;
    }
}