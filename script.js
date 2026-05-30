const pizzas = [
    {
        id: 1,
        name: 'Маргарита',
        price: 149,
        image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?crop=edges&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=1080&h=600'
    },
    {
        id: 2,
        name: 'Пепероні',
        price: 179,
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?crop=edges&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=1080&h=600'
    },
    {
        id: 3,
        name: "М'ясна",
        price: 199,
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?crop=edges&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=1080&h=600'
    },
    {
        id: 4,
        name: 'Вегетаріанська',
        price: 169,
        image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?crop=edges&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=1080&h=600'
    },
    {
        id: 5,
        name: 'Піца з Ананасами',
        price: 199,
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?crop=edges&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=1080&h=600'
    },
    {
        id: 6,
        name: 'Цезар',
        price: 149,
        image: 'https://images.unsplash.com/photo-1555072956-7758afb20e8f?crop=edges&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=1080&h=600'
    },
];

let cartCount = 0;

const pizzaGrid = document.getElementById('pizzaGrid');
const cartCountBadge = document.getElementById('cartCount');

function renderMenu() {
    pizzas.forEach(pizza => {
        const card = document.createElement('div');
        card.className = 'pizza-card';
        card.innerHTML = `
            <img src="${pizza.image}" alt="${pizza.name}" class="pizza-img">
            <div class="pizza-info">
                <h3 class="pizza-name">${pizza.name}</h3>
                <div class="pizza-footer">
                    <span class="pizza-price">${pizza.price} грн</span>
                    <button class="btn-add" onclick="addToCart()">В кошик</button>
                </div>
            </div>
        `;
        pizzaGrid.appendChild(card);
    });
}

function addToCart() {
    cartCount++;
    cartCountBadge.innerText = cartCount;
    if (cartCount > 0) {
        cartCountBadge.style.display = 'flex';
    }
}

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

renderMenu();