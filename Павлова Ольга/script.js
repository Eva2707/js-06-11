const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function sendRequest(url, callback) {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            callback(xhr.responseText);
        }
    };

    xhr.open('GET', `${API}${url}`, true);
    xhr.send();

}

function makeGETRequest(url, callback) {
    return new Promise((resolve, reject) => {
        // console.log('Работает промис');
        let xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject;
        xhr.open("GET", url, true);
        xhr.onload = () => resolve(callback(xhr.responseText));
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
      });

class GoodsItem {
    constructor(product_name, price) {
        this.product_name = product_name;
        this.price = price;
    }
    
    render() {
        return `<div class="goods-item" data-title="${this.product_name}" data-price="${this.price}">
            <h2>${this.product_name}</h2>
            <p>${this.price}</p>
            <button name="add-to-cart">Добавить в корзину</button>
        </div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods(callback) {
        sendRequest('/catalogData.json', (result) => {
            this.goods = JSON.parse(result);
            callback();
        });
    }

    render() {
        let goodsLayout = '';
        this.goods.forEach(({ product_name, price }) => {
            const item = new GoodsItem(product_name, price);
            goodsLayout += item.render();
        });
        document.querySelector('.goods-list').innerHTML = goodsLayout;
    }
}

class BasketItem {
    constructor(id, title, price) {
        this.id = id;
        this.title = title;
        this.price = price;        
    }
    render() {
        return `<div class="basket-item"><div class="basket-info"><h3>${this.title}</h3><p>${this.price}</p></div><button class='deleteItem' onclick='deleteItem(${this.id})'>&times;</button></div>`;
    }
}

class Basket {
    constructor() {
        this.cartGoods = [];
    }
    
    // Добавить в корзину     
    addToBasket(id) {
        let toBasket;
        list.goods.forEach(function(item) {
            if(id == item.id) {
                toBasket = {
                    id: item.id,
                    title: item.title,
                    price: item.price                    
                }
            }
        });
        this.cartGoods.push(toBasket);
        this.basketCount();
    }

    // Удаление из корзины
    deleteFromBasket(id) {
        let getIdElemen;
        this.cartGoods.indexOf(function(item, i) {
            let thisId = item.id;
            if(id == thisId) {
                getIdElemen = i;
            }
            
        });
        this.cartGoods.splice(getIdElemen, 1);
        this.render();
        this.basketCount();
    }    
    
const list = new GoodsList;
list.fetchGoods();