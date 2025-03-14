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

    // Check if the item already exists
    const existingProduct = cart.find(item => item.name === product.name);
    if (!existingProduct) {
        cart.push(product); // Add only if not already in the cart
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    return !existingProduct; // Return true if new item added, false if already exists
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


// Customer Reviews
document.addEventListener("DOMContentLoaded", function () {
    const reviews = document.querySelectorAll(".customer-reviews-container");
    let index = 0;

    function showNextReview() {
        reviews.forEach((review, i) => {
            review.classList.remove("active");
            if (i === index) {
                review.classList.add("active");
            }
        });
        index = (index + 1) % reviews.length;
    }

    setInterval(showNextReview, 4000); // Slide every 4 seconds
});


