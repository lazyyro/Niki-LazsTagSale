const products = [
    "item1.jpg", "item2.jpg", "item3.jpg", "item4.jpg",
    "item5.jpg", "item6.jpg", "item7.jpg", "item8.jpg"
];

const cart = [];
const soldItems = [];

function loadProducts() {
    const productContainer = document.getElementById("products");
    productContainer.innerHTML = ""; 

    products.forEach((image, index) => {
        if (!soldItems.includes(image)) { 
            let productElement = document.createElement("div");
            productElement.classList.add("product");

            productElement.innerHTML = `
                <img src="images/${image}" alt="Product ${index + 1}">
                <button onclick="addToCart('${image}')">Preorder</button>
            `;
            productContainer.appendChild(productElement);
        }
    });
}

function addToCart(image) {
    if (!cart.includes(image) && !soldItems.includes(image)) {
        cart.push(image);
        alert("Item added to cart!");
    } else {
        alert("This item is already in your cart or sold!");
    }
}

function viewCart() {
    const cartOverlay = document.getElementById("cart-overlay");
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");

    cartItems.innerHTML = ""; 

    cart.forEach((item, index) => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `Item ${index + 1} 
            <button onclick="removeFromCart('${item}')">Remove</button>`;
        cartItems.appendChild(listItem);
    });

    totalPrice.innerText = `Total Items: ${cart.length}`;
    cartOverlay.style.display = "flex";
}

function removeFromCart(image) {
    const index = cart.indexOf(image);
    if (index !== -1) {
        cart.splice(index, 1);
        viewCart();
    }
}

function closeCart() {
    document.getElementById("cart-overlay").style.display = "none";
}

function checkout() {
    const customerName = document.getElementById("customer-name").value.trim();

    if (customerName === "") {
        alert("Please enter your first and last name before checking out.");
        return;
    }

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Move items to sold list
    cart.forEach(item => {
        soldItems.push(item);
    });

    cart.length = 0;
    alert(`Thank you for your purchase, ${customerName}! We look forward to seeing you at the tag sale.`);
    closeCart();
    loadProducts();
    updateSoldItems();
}

function updateSoldItems() {
    const soldList = document.getElementById("sold-list");
    soldList.innerHTML = "";

    soldItems.forEach((item, index) => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `<img src="images/${item}" alt="Sold Item ${index + 1}">`;
        soldList.appendChild(listItem);
    });
}

// Load products when the page loads
document.addEventListener("DOMContentLoaded", loadProducts);
