import './item-container.js';

class ItemList extends HTMLElement {
    set items(items) {
        this._items = items;
        this.render();
    }

    render() {
        this._items.forEach(item => {
            const itemContainer = document.createElement('item-container');
            itemContainer.item = item;
            this.appendChild(itemContainer)
            this.setAttribute('class', 'row')
        });
    }
}

customElements.define('item-list', ItemList);