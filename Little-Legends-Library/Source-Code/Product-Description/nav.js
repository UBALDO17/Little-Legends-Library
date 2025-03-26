document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");
    const overlay = document.createElement("div"); 
    overlay.classList.add("overlay");
    document.body.appendChild(overlay); 

    function toggleMenu() {
        const isActive = mobileMenu.classList.contains("active");

        if (isActive) {
            mobileMenu.classList.remove("active");
            overlay.classList.remove("active");
            document.body.classList.remove("no-scroll"); // Restore scrolling
        } else {
            mobileMenu.classList.add("active");
            overlay.classList.add("active");
            document.body.classList.add("no-scroll"); // Prevent scrolling
        }
    }

    menuToggle.addEventListener("click", function (event) {
        event.stopPropagation(); 
        toggleMenu();
    });

    overlay.addEventListener("click", toggleMenu);

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && mobileMenu.classList.contains("active")) {
            toggleMenu();
        }
    });
});

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

// Example: Simulating cart count update
document.addEventListener("DOMContentLoaded", function () {
    let cartCount = localStorage.getItem("cartCount") || 0; // Get saved count
    updateCartCount(cartCount); // Apply it to both elements
});


document.addEventListener("DOMContentLoaded", function () {
    let currentPage = window.location.pathname.split("/").pop().replace(".html", "");

    document.querySelectorAll(".nav-link").forEach(link => {
        if (link.dataset.page === currentPage) {
            link.classList.add("active");
        }
    });
});