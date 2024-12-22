let generateCartItem = (product) => {
    const {id, name, price, img} = product;
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.id = `product-${id}`;

    productDiv.innerHTML = `
        <a href="./product.html?id=${id}">
            <div class="product-image" id="productImage">
                <img src="${img}" alt="${name}">
            </div>                
        </a>
        <div class="product-details">
            <div class="product-name" id="productName">
                <h3>${name}</h3>
            </div>
            <div class="product-price" id="productPrice">
                <p>${price}</p>
            </div>
            <div class="cart-operations" id="cartOperations-${id}">
                <div class="move-to-wishlist"></div>
                <div class="remove-from-cart"></div>
            </div>
        </div>
    `;

    const moveToWishlistButton = document.createElement('button');
    moveToWishlistButton.classList.add('move-to-wishlist-button');
    moveToWishlistButton.innerText = 'Move To Wishlist';

    const isInWishlist = localWishlist.some(item => item.id === id);
    if (isInWishlist) {
        moveToWishlistButton.innerText = 'Item in Wishlist';
        moveToWishlistButton.disabled = true;
    }

    moveToWishlistButton.addEventListener('click', () => {
        moveToWishlist(id);
    });

    const moveToWishlistDiv = productDiv.querySelector('.move-to-wishlist');
    moveToWishlistDiv.appendChild(moveToWishlistButton);

    const removeFromCartButton = document.createElement('button');
    removeFromCartButton.classList.add('remove-from-cart');
    removeFromCartButton.innerText = 'Remove from cart';

    removeFromCartButton.addEventListener('click', () => {
        removeFromCart(id);
    })

    const removeFromCartDiv = productDiv.querySelector('.remove-from-cart');
    removeFromCartDiv.appendChild(removeFromCartButton);
    return productDiv;
}

let generateCartItems = async () => {
    const data = await loadData('../../data/data.json');
    const shoppingCart = document.getElementById('products');
    if (localCart.length > 0){
        const sidebar = document.querySelector('.sidebar');
        sidebar.style.visibility = 'visible';
        shoppingCart.innerHTML = '';
        localCart.forEach(item => {
            let search = data.gameData.find((dataItem)=> dataItem.id === item.id) || {};
            shoppingCart.append(generateCartItem(search));
        })
    } else {
        shoppingCart.innerHTML = '';
        const noItem = document.querySelector('.no-item-found');
        const sidebar = document.querySelector('.sidebar');
        noItem.style.visibility = 'visible';
        sidebar.style.visibility = 'hidden';
    }
}

generateCartItems();


let removeFromCart = (productId) => {
    console.log('id is', productId);
    console.log(typeof productId);
    let search = localCart.find(item => item.id === productId);
    if (search !== undefined) {
        localCart = localCart.filter(item => item.id !== productId);
    }
    else {
        return;
    }
    localStorage.setItem('cartData', JSON.stringify(localCart));
    calculate(localCart, 'cartCount');
    search = null;
    productId = null;
    generateCartItems();
}

let moveToWishlist = (productId) => {
    let search = localWishlist.find(item => item.id === productId);
    console.log('adding item to wishlist....')
    if (search === undefined) {
        localWishlist.push({id:productId});
        localCart = localCart.filter(item => item.id !== productId);
        localStorage.setItem('cartData', JSON.stringify(localCart));
        localStorage.setItem('wishlistData', JSON.stringify(localWishlist));
        calculate(localCart, 'cartCount');
        calculate(localWishlist, 'wishlistCount');
        generateCartItems();
    }
}

let calculate = (localStorageDatabase, selectionCountId) => {
    let selectionCountElement = document.getElementById(selectionCountId);
    console.log(localStorageDatabase.length);
    selectionCountElement.innerHTML = localStorageDatabase.length;
    generateCartItems();
}

calculate(localCart, 'cartCount');
calculate(localWishlist, 'wishlistCount');

