document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
    updateCart();
    
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const product = {
                name: this.dataset.name,
                price: parseFloat(this.dataset.price),
                image: this.dataset.image
            };

            const isAdded = addToCart(product);
            if (isAdded) {
                showAddedMessage("✅ Added to Cart!");
            } else {
                showAddedMessage("⚠️ Item is already in the cart!");
            }

            updateCart();
            updateCartCount();
        });
    });

    document.getElementById("clear-cart").addEventListener("click", function () {
        localStorage.removeItem("cart");
        updateCart();
        updateCartCount();
    });
});

// 🛒 **Add to Cart Function (Prevents Duplicates)**
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product already exists
    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) return false; // Don't add duplicate items

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    return true;
}

// ❌ **Remove Item from Cart**
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1); // Remove item at the specified index
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart(); // Update UI immediately
    updateCartCount();
}

// 🔢 **Update Cart Count**
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartBadge = document.querySelector(".cart-count");
    if (cartBadge) {
        cartBadge.textContent = cart.length;
        cartBadge.style.display = cart.length > 0 ? "flex" : "none";
    }
}

// 🛍 **Update Cart Display**
function updateCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "₱0.00";
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        let cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-details">
                <h4>${item.name}</h4>
                <p>₱${item.price.toFixed(2)}</p>
            </div>
            <button class="remove-item" onclick="removeItem(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.price;
    });

    cartTotal.textContent = `₱${total.toFixed(2)}`;
}

// ✅ **Show "Added to Cart" Message**
function showAddedMessage(text) {
    const message = document.createElement("div");
    message.textContent = text;
    message.classList.add("cart-message");
    document.body.appendChild(message);

    setTimeout(() => {
        message.classList.add("fade-out");
        setTimeout(() => message.remove(), 1000);
    }, 1000);
}

// 🟢 Ensure cart updates on load
document.addEventListener("DOMContentLoaded", updateCartCount);
