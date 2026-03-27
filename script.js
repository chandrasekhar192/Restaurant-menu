// Data for the menu items
const menuData = [
    { id: 1, name: "Classic Burger", price: 149, image: "burger.jpg" },
    { id: 2, name: "Cheese Pizza", price: 299, image: "images/pizza.jpg" },
    { id: 3, name: "Pasta Alfredo", price: 249, image: "images/pasta.jpg" },
    { id: 4, name: "Grilled Chicken Salad", price: 199, image: "images/salad.jpg" },
    { id: 5, name: "French Fries", price: 99, image: "images/french.jpg" },
    { id: 6, name: "Cold Coffee", price: 120, image: "images/cold.jpg" },
    { id: 7, name: "Chocolate Shake", price: 150, image: "images/choclate.jpg" },
    { id: 8, name: "Vanilla Ice Cream", price: 80, image: "images/ice.jpg" }
];

// Array to store cart items
let cart = [];

// Function to display menu items on the page
function displayMenu() {
    const menuGrid = document.getElementById("menu-grid");
    menuGrid.innerHTML = ""; // Clear existing content

    menuData.forEach(item => {
        // Create a div for each menu item
        const itemDiv = document.createElement("div");
        itemDiv.className = "menu-item";

        // Add HTML content for the item
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>₹${item.price}</p>
            <button class="btn" onclick="addToCart(${item.id})">Add to Cart</button>
        `;

        menuGrid.appendChild(itemDiv);
    });
}

// Function to add an item to the cart
function addToCart(itemId) {
    // Find the item in our menu data
    const item = menuData.find(menuItem => menuItem.id === itemId);

    if (item) {
        // Add the item to the cart array
        cart.push(item);
        // Update the cart display
        updateCartDisplay();
        alert(`${item.name} added to cart!`);
    }
}

// Function to remove an item from the cart based on its index
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

// Function to update the cart UI
function updateCartDisplay() {
    const cartItemsList = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    cartItemsList.innerHTML = ""; // Clear existing cart list

    let total = 0;

    if (cart.length === 0) {
        // If cart is empty, show the message
        cartItemsList.innerHTML = '<li class="empty-cart">Your cart is empty.</li>';
    } else {
        // Loop through cart array and display items
        cart.forEach((item, index) => {
            total += item.price;

            const li = document.createElement("li");
            li.innerHTML = `
                <span>${item.name} - ₹${item.price}</span>
                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItemsList.appendChild(li);
        });
    }

    // Update the total price
    totalPriceElement.innerText = total;
}

// Function to handle the checkout process
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add some items before placing an order.");
        return;
    }

    const confirmOrder = confirm("Are you sure you want to place the order?");
    if (confirmOrder) {
        alert("Order placed successfully! Thank you for choosing Student Eats.");
        // Clear the cart after successful order
        cart = [];
        updateCartDisplay();
    }
}

// Initialize the page once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    displayMenu();

    // Add event listener to the checkout button
    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", checkout);
    }
});
