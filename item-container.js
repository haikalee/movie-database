class ItemContainer extends HTMLElement {
    set item(item) {
        this._item = item;
        this.render();
    }

    render() {
        this.innerHTML = `  <div class="card">
                                <img src="https://image.tmdb.org/t/p/w500${this._item.poster_path}" class="card-img-top" alt="...">
                                <div class="card-body">
                                <h5 class=k"card-title">${this._item.original_title || this._item.original_name}</h5>
                                    <p class="card-text">${this._item.release_date || this._item.first_air_date}</p>
                                    <a href="#" class="btn btn-primary btn-detail" data-target="#modal" data-toggle="modal" data-id="${this._item.id}">Detail</a>
                                </div>
                            </div>`;
        this.setAttribute('class', 'movie-div col-sm-3 my-3')
    }
}

customElements.define('item-container', ItemContainer);