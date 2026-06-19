let cart = getJsonCookie('cart') || [];
let products = [];

const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

function getJsonCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) {
            return JSON.parse(decodeURIComponent(value));
        }
    }
    return [];
}

function saveCart() {
    document.cookie = `cart=${encodeURIComponent(JSON.stringify(cart))}; path=/; max-age=31536000`;
}

async function loadProducts() {
    const res = await fetch('./store_db.json');
    products = await res.json();
    renderCart();
}

function updateQuantity(id, delta) {
    const item = cart.find(p => p.id === id);
    if (!item) return;

    item.quantity += delta;

    if (item.quantity <= 0) {
        cart = cart.filter(p => p.id !== id);
    }

    saveCart();
    renderCart();
}

function renderCart() {
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = `<p class="cart-empty-text">Кошик порожній 😔</p>`;
        cartTotal.textContent = `Всього: 0 грн`;
        return;
    }

    let total = 0;

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return;

        const itemTotal = product.price * item.quantity;
        total += itemTotal;

        cartItems.innerHTML += `
            <div class="pizza-card">
                <img src="${product.image}" alt="${product.name || product.title}" class="pizza-img">
                <div class="pizza-info">
                    <h3 class="pizza-name">${product.name || product.title}</h3>
                    <p class="cart-item-meta">Сума: ${itemTotal} грн</p>
                    <p class="cart-item-price-info">${product.price} грн/шт</p>
                    <div class="pizza-footer cart-controls">
                        <button class="btn-add cart-btn-qty" onclick="updateQuantity(${product.id}, -1)">-</button>
                        <span class="cart-qty-num">${item.quantity}</span>
                        <button class="btn-add cart-btn-qty" onclick="updateQuantity(${product.id}, 1)">+</button>
                    </div>
                </div>
            </div>
        `;
    });

    cartTotal.textContent = `Всього: ${total} грн`;
}

function clearCart() {
    cart = [];
    saveCart();
    renderCart();
}

loadProducts();