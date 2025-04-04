document.addEventListener("DOMContentLoaded", function () {
    
    // ✅ Check if cart should be cleared when returning from the form
    if (localStorage.getItem("clearCartOnReturn") === "true") {
        localStorage.removeItem("cart"); // Clear the cart
        localStorage.removeItem("clearCartOnReturn"); // Remove the flag to prevent repeated clearing
        updateCart();
        updateCartCount();
    }

    // ✅ Notify user if order was placed
    // if (sessionStorage.getItem("showOrderSuccess")) {
    //     alert(`✅ Your order has been successfully placed! Your Order ID is: ${localStorage.getItem("orderID")}`);
    //     sessionStorage.removeItem("showOrderSuccess"); // Prevent alert from showing again
    // }
    
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
                showAddedMessage("\u2705 Added to Cart!");
            } else {
                showAddedMessage("\u26A0\ufe0f Item is already in the cart!");
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
    let cartCount = cart.length;

    document.querySelectorAll(".cart-count").forEach(cartBadge => {
        if (cartCount > 0) {
            cartBadge.textContent = cartCount;
            cartBadge.classList.add("show"); // Add 'show' class
            cartBadge.style.display = "flex"; // Make sure it's visible
        } else {
            cartBadge.classList.remove("show"); // Remove 'show' class
            cartBadge.style.display = "none"; // Hide it completely
        }
    });
}

// Run on page load to apply correct visibility
document.addEventListener("DOMContentLoaded", updateCartCount);

// 🛍 **Update Cart Display**
function updateCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div style="text-align: center;">Your cart is empty.</div>';
        cartTotal.textContent = "\u20B10.00";
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

    cartTotal.textContent = `\u20B1${total.toFixed(2)}`;
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


// Checkout or Buy Now Function
function generateOrderID() {
    return 'ORDER-' + Math.floor(Math.random() * 1000000);
}

// 🎯 FUNCTION: Open Order Modal & Populate Book Selection
function goToOrderForm() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let bookSelectionContainer = document.getElementById("book-selection");
    bookSelectionContainer.innerHTML = ""; // Clear previous selections

    cart.forEach((item, index) => {
        bookSelectionContainer.innerHTML += `
            <div class="book-item">
                <p>${item.name}</p>
                <div class="format-options">
                    <input type="radio" id="digital-${index}" name="format-${index}" value="Digital" checked>
                    <label for="digital-${index}">Digital (₱350)</label>

                    <input type="radio" id="physical-${index}" name="format-${index}" value="Physical">
                    <label for="physical-${index}">Physical (₱700)</label>
                </div>
            </div>
        `;
    });

    // 🎯 Add event listener AFTER elements are added
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener("change", toggleDeliverySection);
    });

    // 🎯 Reset selection to Digital on modal open
    document.querySelectorAll('input[value="Digital"]').forEach(radio => radio.checked = true);

    // 🎯 Ensure delivery section is hidden when opening
    toggleDeliverySection();

    // 🎯 Show modal
    document.getElementById("order-modal").classList.remove("hidden");
}

// 🎯 FUNCTION: Show/Hide Delivery Section Based on Selection
function toggleDeliverySection() {
    let requiresDelivery = [...document.querySelectorAll('input[type="radio"]')]
        .some(radio => radio.checked && radio.value === "Physical");

    document.getElementById("delivery-section").style.display = requiresDelivery ? "block" : "none";
    document.getElementById("delivery-note").style.display = requiresDelivery ? "block" : "none";
}

// 🎯 FUNCTION: Close Modal & Reset Selection
function closeModal() {
    document.getElementById("order-modal").classList.add("hidden");
}

// 🎯 FUNCTION: Submit Order & Redirect to Google Form
function submitOrder() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let orderID = generateOrderID();
    let bookDetails = [];
    let totalPrice = 0;
    let requiresDelivery = false;

    cart.forEach((item, index) => {
        let formatRadio = document.querySelector(`input[name="format-${index}"]:checked`);
        if (!formatRadio) {
            alert("⚠️ Please select a format for all books.");
            return;
        }

        let format = formatRadio.value;
        let itemPrice = (format === "Physical") ? 700 : 350;

        bookDetails.push(`${item.name} - ${format} (₱${itemPrice})`);
        totalPrice += itemPrice;

        if (format === "Physical") requiresDelivery = true;
    });

    let customerName = document.getElementById("customer-name").value.trim();
    let customerEmail = document.getElementById("customer-email").value.trim();
    let contactNumber = document.getElementById("contact-number").value.trim();
    let deliveryAddress = document.getElementById("delivery-address").value.trim();

    if (!customerName || !customerEmail) {
        alert("⚠️ Please enter your name and email.");
        return;
    }

    if (requiresDelivery) {
        if (!contactNumber || !deliveryAddress) {
            alert("⚠️ Please enter your contact number and delivery address.");
            return;
        }
        totalPrice += 50; // Add delivery fee once
    }

    // 🔹 Google Form URL & Entry IDs
    let formURL = "https://docs.google.com/forms/d/e/1FAIpQLSc9BPxq--g3lNUQ1jtJB3rx6kYPuDrTfaQ-e1BEJ9-z9yvgOw/viewform?";
    let orderIDField = "entry.771543493=" + encodeURIComponent(orderID);
    let booksField = "&entry.271701913=" + encodeURIComponent(bookDetails.join(", "));
    let totalPriceField = "&entry.827177782=" + encodeURIComponent(totalPrice);
    let nameField = "&entry.903715558=" + encodeURIComponent(customerName);
    let emailField = "&entry.955335245=" + encodeURIComponent(customerEmail);

    // 🔹 Only include delivery details if Physical book is selected
    let contactField = requiresDelivery ? "&entry.1904338608=" + encodeURIComponent(contactNumber) : "";
    let deliveryField = requiresDelivery ? "&entry.2124188500=" + encodeURIComponent(deliveryAddress) : "";

    sessionStorage.setItem("showOrderSuccess", "true");

    // ✅ Redirect with only necessary fields
    window.location.href = formURL + orderIDField + booksField + totalPriceField + nameField + emailField + contactField + deliveryField;

    localStorage.setItem("clearCartOnReturn", "true");
}



