document.querySelector(".toggle-reviews").addEventListener("click", function() {
    const hiddenReviews = document.querySelectorAll(".hidden");
    if (this.textContent === "Show More") {
        hiddenReviews.forEach(el => el.style.display = "flex");
        this.textContent = "Show Less";
    } else {
        hiddenReviews.forEach(el => el.style.display = "none");
        this.textContent = "Show More";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    updateCartCount(); // Ensure count updates on load

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const product = {
                name: this.dataset.name,
                price: parseFloat(this.dataset.price),
                image: this.dataset.image
            };

            const isAdded = addToCart(product); // Add to cart and check if it's new
            if (isAdded) {
                showAddedMessage("✅ Added to Cart!");
            } else {
                showAddedMessage("⚠️ Item is already in the cart!");
            }

            updateCartCount(); // Update cart count after adding
        });
    });
});

// 🛒 **Add to Cart Function (Prevents duplicates)**
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product already exists
    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) return false; // Don't add duplicate items

    cart.push(product); // Add only if not already in the cart
    localStorage.setItem("cart", JSON.stringify(cart));
    return true; // Item added successfully
}

// 🔢 **Update Cart Count Badge**
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = cart.length; // Only counts unique items

    const cartBadge = document.querySelector(".cart-count");
    if (cartBadge) {
        cartBadge.textContent = cartCount;
        cartBadge.style.display = cartCount > 0 ? "flex" : "none"; // Hide if empty
    }
}

// ✅ **Show "Added to Cart" Message**
function showAddedMessage(text) {
    const message = document.createElement("div");
    message.textContent = text;
    message.classList.add("cart-message");
    document.body.appendChild(message);

    setTimeout(() => {
        message.classList.add("fade-out"); // Fade out animation
        setTimeout(() => message.remove(), 1000);
    }, 1000);
}

// Ensure cart count updates when page loads
document.addEventListener("DOMContentLoaded", updateCartCount);