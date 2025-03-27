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

// 🎯 FUNCTION: Open Order Modal for Direct Purchase
function goToOrderForm(product) {
    let orderID = generateOrderID();
    localStorage.setItem("orderID", orderID); // Store Order ID locally
    localStorage.setItem("selectedProduct", JSON.stringify(product)); // Store product details

    let bookSelectionContainer = document.getElementById("book-selection");
    bookSelectionContainer.innerHTML = `
        <div class="book-item">
            <p>${product.name}</p>
            <div class="format-options">
                <input type="radio" id="digital" name="format" value="Digital" checked>
                <label for="digital">Digital (₱350)</label>

                <input type="radio" id="physical" name="format" value="Physical">
                <label for="physical">Physical (₱700)</label>
            </div>
        </div>
    `;

    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener("change", toggleDeliverySection);
    });

    toggleDeliverySection(); // Ensure correct delivery section visibility

    document.getElementById("order-modal").classList.remove("hidden");
}

// 🎯 FUNCTION: Show/Hide Delivery Section Based on Selection
function toggleDeliverySection() {
    let requiresDelivery = document.querySelector('input[name="format"]:checked').value === "Physical";

    document.getElementById("delivery-section").style.display = requiresDelivery ? "block" : "none";
    document.getElementById("delivery-note").style.display = requiresDelivery ? "block" : "none";
}

// 🎯 FUNCTION: Close Modal
function closeModal() {
    document.getElementById("order-modal").classList.add("hidden");
}

// 🎯 FUNCTION: Submit Order & Redirect to Google Form
function submitOrder() {
    let orderID = localStorage.getItem("orderID") || generateOrderID();
    
    // Retrieve product details from localStorage
    let storedProduct = localStorage.getItem("selectedProduct");
    let product = storedProduct ? JSON.parse(storedProduct) : { name: "Unknown Product" };

    // Check if format is selected
    let formatElement = document.querySelector('input[name="format"]:checked');
    if (!formatElement) {
        alert("⚠️ Please select a book format.");
        return;
    }
    let format = formatElement.value;

    let price = format === "Physical" ? 700 : 350;
    let requiresDelivery = format === "Physical";

    // Get user inputs safely
    let customerName = document.getElementById("customer-name")?.value.trim() || "";
    let customerEmail = document.getElementById("customer-email")?.value.trim() || "";
    let contactNumber = document.getElementById("contact-number")?.value.trim() || "";
    let deliveryAddress = document.getElementById("delivery-address")?.value.trim() || "";

    // Validate required fields
    if (!customerName || !customerEmail) {
        alert("⚠️ Please enter your name and email.");
        return;
    }
    if (requiresDelivery && (!contactNumber || !deliveryAddress)) {
        alert("⚠️ Please enter your contact number and delivery address.");
        return;
    }

    if (requiresDelivery) price += 50; // Add delivery fee

    // ✅ Update product name format
    let formattedProductName = `${product.name} - ${format} (₱${price})`;

    let formURL = "https://docs.google.com/forms/d/e/1FAIpQLSc9BPxq--g3lNUQ1jtJB3rx6kYPuDrTfaQ-e1BEJ9-z9yvgOw/viewform?";
    let orderIDField = "entry.771543493=" + encodeURIComponent(orderID);
    let productField = "&entry.271701913=" + encodeURIComponent(formattedProductName);
    let priceField = "&entry.827177782=" + encodeURIComponent(price);
    let nameField = "&entry.903715558=" + encodeURIComponent(customerName);
    let emailField = "&entry.955335245=" + encodeURIComponent(customerEmail);
    let contactField = requiresDelivery ? "&entry.1904338608=" + encodeURIComponent(contactNumber) : "";
    let deliveryField = requiresDelivery ? "&entry.2124188500=" + encodeURIComponent(deliveryAddress) : "";

    sessionStorage.setItem("showOrderSuccess", "true");
    window.location.href = formURL + orderIDField + productField + priceField + nameField + emailField + contactField + deliveryField;
}

// 🏷 FUNCTION: Generate Order ID (if missing)
function generateOrderID() {
    return "ORDER-" + Math.floor(Math.random() * 1000000);
}

// Search Blogger
function searchBloggerPosts(searchBoxId) {
    var query = document.getElementById(searchBoxId).value;
    if (query) {
        var baseUrl = "https://littlelegendslibrary.blogspot.com/search?q=" + encodeURIComponent(query);

        // Ensure &m=1 is completely removed
        var finalUrl = baseUrl.replace("&m=1", "");

        // Force direct access to search results
        window.location.href = finalUrl + "&m=0";
    }
}