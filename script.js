let products = [];
let cart = [];

const pizzaGrid = document.getElementById('pizzaGrid');
const cartCountBadge = document.getElementById('cartCount');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

function saveJsonCookie(name, data) {
    document.cookie = `${name}=${encodeURIComponent(JSON.stringify(data))}; path=/; max-age=31536000`;
}

function getJsonCookie(name) {
    const cookies = document.cookie.split('; ');

    for (const cookie of cookies) {
        const [cookieName, value] = cookie.split('=');

        if (cookieName === name) {
            return JSON.parse(decodeURIComponent(value));
        }
    }

    return null;
}

async function loadProducts() {
    try {
        const response = await fetch('./store_db.json');

        if (!response.ok) {
            throw new Error('Ошибка загрузки товаров');
        }

        products = await response.json();

        renderMenu();
    } catch (error) {
        console.error(error);
    }
}

function renderMenu() {
    pizzaGrid.innerHTML = '';

    products.forEach(product => {
        pizzaGrid.innerHTML += `
            <div class="pizza-card">
                <img src="${product.image}" alt="${product.title}" class="pizza-img">

                <div class="pizza-info">
                    <h3 class="pizza-name">${product.title}</h3>

                    <div class="pizza-footer">
                        <span class="pizza-price">${product.price} грн</span>

                        <button class="btn-add" onclick="addToCart(${product.id})">
                            В кошик
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

function addToCart(productId) {
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({
            id: productId,
            quantity: 1
        });
    }

    saveJsonCookie('cart', cart);

    updateCartCounter();
}

function updateCartCounter() {
    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    cartCountBadge.textContent = totalItems;

    if (cartCountBadge) {
        cartCountBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

function init() {
    cart = getJsonCookie('cart') || [];

    updateCartCounter();

    loadProducts();
}

init();