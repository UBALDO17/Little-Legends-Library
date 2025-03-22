// Customer Reviews Comment
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

// Event listeners for Add to Cart and Buy Now buttons
document.addEventListener("DOMContentLoaded", function () {

    // Handle Add to Cart button click
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const product = {
                name: this.dataset.name,
                price: parseFloat(this.dataset.price),
                image: this.dataset.image
            };

            const isAdded = addToCart(product);
            if (isAdded) {
                showAddedMessage("\u2705 Added to Cart!");
            } else {
                showAddedMessage("\u26A0\ufe0f Item is already in the cart!");
            }

            // Update cart count immediately
            updateCartCount();
        });
    });

    // Handle Buy Now button click
    document.querySelectorAll(".buy-now").forEach(button => {
        button.addEventListener("click", function () {
            const product = {
                name: this.dataset.name,
                price: parseFloat(this.dataset.price),
                image: this.dataset.image
            };

            goToOrderForm(product); // Go to order form
        });
    });

    // Initialize cart count on page load
    updateCartCount();
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

// Buy Now Function (Redirect to Google Form)
function goToOrderForm(product) {
    let orderID = generateOrderID();
    localStorage.setItem("orderID", orderID); // Store Order ID locally

    let formURL = "https://docs.google.com/forms/d/e/1FAIpQLSc9BPxq--g3lNUQ1jtJB3rx6kYPuDrTfaQ-e1BEJ9-z9yvgOw/viewform?";
    let orderIDField = "entry.771543493=" + encodeURIComponent(orderID);
    let productField = "&entry.271701913=" + encodeURIComponent(product.name);
    let priceField = "&entry.827177782=" + encodeURIComponent(product.price);

    sessionStorage.setItem("showOrderSuccess", "true");
    window.location.href = formURL + orderIDField + productField + priceField;
}

// Generate Order ID Function
function generateOrderID() {
    return 'ORDER-' + Math.floor(Math.random() * 1000000);
}


// Write Review Form
function writeReview(bookName) {
    const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdMAvVk8X06BhMumPkjd9SmHAO_YzJIEit4Df4wOLrMmzmx6A/viewform";
    const prefilledUrl = `${formUrl}?usp=pp_url&entry.386075443=${encodeURIComponent(bookName)}`;
    window.location.href = prefilledUrl;
}