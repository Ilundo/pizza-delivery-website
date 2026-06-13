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

function renderCart() {
    cartItems.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return;

        total += product.price * item.quantity;

        cartItems.innerHTML += `
            <div class="pizza-card">
                <img src="${product.image}" class="pizza-img">

                <div class="pizza-info">
                    <h3 class="pizza-name">${product.title}</h3>

                    <p>Кількість: ${item.quantity}</p>
                    <p>Сума: ${product.price * item.quantity} грн</p>
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