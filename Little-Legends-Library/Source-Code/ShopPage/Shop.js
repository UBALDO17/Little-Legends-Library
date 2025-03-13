document.addEventListener("DOMContentLoaded", function () {
    updateCartCount(); // Ensure cart count updates on load
    setupCartButtons(); // Attach event listeners to add-to-cart buttons
});

// 🛒 Function to add product to cart
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product already exists in cart
    const exists = cart.some(item => item.name === product.name);
    if (!exists) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        return true; // New item added
    }
    return false; // Item already in cart
}

// 🔢 **Update Cart Count Badge**
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = cart.length; // Count unique items

    const cartBadge = document.querySelector(".cart-count");
    if (cartBadge) {
        cartBadge.textContent = cartCount;
        cartBadge.style.display = cartCount > 0 ? "flex" : "none"; // Hide if empty
    }
}

// **Show floating cart message**
function showCartMessage(message) {
    let existingMessage = document.querySelector(".cart-message");
    if (existingMessage) {
        existingMessage.remove(); // Remove any existing message to avoid duplicates
    }

    const messageDiv = document.createElement("div");
    messageDiv.classList.add("cart-message");
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);

    // Remove message after animation
    setTimeout(() => {
        messageDiv.remove();
    }, 2000);
}

// **Attach event listeners to all "Add to Cart" buttons**
function setupCartButtons() {
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const product = {
                name: this.dataset.name,
                price: parseFloat(this.dataset.price),
                image: this.dataset.image
            };

            const isAdded = addToCart(product); // Add to cart and check if it's new
            if (isAdded) {
                showCartMessage("✅ Added to Cart!");
            } else {
                showCartMessage("⚠️ Item is already in the cart!");
            }

            updateCartCount(); // Update cart count after adding
        });
    });
}
