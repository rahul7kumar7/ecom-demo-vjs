let generateShopItem = (product) => {
    const {id, name, price, img} = product;
    const productItem = document.createElement('div');
    productItem.classList.add('prod');
    productItem.id = `prod-id-${id}`;
    productItem.innerHTML = `
            <div class="prod-image">
            <a href="pages/product.html?id=${id}">
                <img src="${img}" alt="${name}">
            </a>
        </div>
        <div class="prod-info">
            <div class="prod-details">
                <a class="item-title">${name}</a>
                <div class="item-price">${price}</div>
            </div>
            <div class="prod-action">  
            </div>
    `;

    const prodCartAnchor = document.createElement('a');
    prodCartAnchor.id = 'addToCart';
    const prodCartDiv = document.createElement('div');
    prodCartDiv.classList.add('prod-cart');
    prodCartDiv.innerHTML = `<i class="bi bi-cart-fill"></i> ADD TO CART`;
    productItem.querySelector('.prod-action').appendChild(prodCartAnchor);
    prodCartAnchor.appendChild(prodCartDiv);

    const isInCart = localCart.some(item => item.id === id);
    if (isInCart){
        isInCartFunc(prodCartDiv)
    }

    prodCartAnchor.addEventListener('click', () => {
        if(localCart.length < 10){
            addToCart(id);
            isInCartFunc(prodCartDiv);
        } else {
            showLimitWarning('cart');
        }
    });

    const prodWishlistAnchor = document.createElement('a');
    prodWishlistAnchor.id = 'addToWishlist';
    const prodWishlistDiv = document.createElement('div');
    prodWishlistDiv.classList.add('prod-wishlist');
    prodWishlistDiv.innerHTML = `<i class="bi bi-heart"></i>`;
    productItem.querySelector('.prod-action').appendChild(prodWishlistAnchor);
    prodWishlistAnchor.appendChild(prodWishlistDiv);
    const isInWishlist = localWishlist.some(item => item.id === id);

    if (isInWishlist) {
        isInWishlistFunc(prodWishlistDiv)
    }

    prodWishlistAnchor.addEventListener('click', () => {
        if(localWishlist.length < 10){
            addToWishlist(id);
            isInWishlistFunc(prodWishlistDiv);
        } else {
            showLimitWarning('wishlist');
        }

    });


    return productItem;
}


let generateShop = async () => {
    const gameDatabase = await loadData('https://rahul7kumar7.github.io/ecom-demo-vjs/data/data.json')
    const shop = document.getElementById('shop')
    gameDatabase.gameData.map((item) =>{
        console.log('name is', item.name);
        shop.append(generateShopItem(item));
    })
}

generateShop();

calculate(localCart, 'cartCount');
calculate(localWishlist, 'wishlistCount');
