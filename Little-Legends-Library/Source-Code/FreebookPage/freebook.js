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
                showAddedMessage("\u2705 Added to Cart!");
            } else {
                showAddedMessage("\u26A0\ufe0f Item is already in the cart!");
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


// Book Slide
let bookIndex = 0;
const books = [
    { img: "https://res.cloudinary.com/du0ijg1nu/image/upload/v1742303467/1_ggliia.png", link: "book-preview1.html" },
    { img: "https://res.cloudinary.com/du0ijg1nu/image/upload/v1742303460/2_swbioi.png", link: "book-preview2.html" },
    { img: "https://res.cloudinary.com/du0ijg1nu/image/upload/v1742303466/3_a5gbhu.png", link: "book-preview3.html" },
    { img: "https://res.cloudinary.com/du0ijg1nu/image/upload/v1742303465/4_b3oiio.png", link: "book-preview4.html" },
    { img: "https://res.cloudinary.com/du0ijg1nu/image/upload/v1742303464/5_xqyfza.png", link: "book-preview5.html" },
    { img: "https://res.cloudinary.com/du0ijg1nu/image/upload/v1742303461/6_mflbyw.png", link: "book-preview6.html" },
    { img: "https://res.cloudinary.com/du0ijg1nu/image/upload/v1742303461/7_sutn1d.png", link: "book-preview6.html" }
];

function updateBooks() {
    const bookList = document.querySelector(".book-list");
    bookList.innerHTML = "";

    for (let i = bookIndex; i < bookIndex + 3; i++) {
        if (i >= books.length) break;

        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");

        // Book Image Link
        const bookLink = document.createElement("a");
        bookLink.href = books[i].link;

        const bookImg = document.createElement("img");
        bookImg.src = books[i].img;
        bookImg.alt = `Book ${i + 1}`;

        bookLink.appendChild(bookImg);
        bookDiv.appendChild(bookLink);

        // FREE Button (Clickable)
        const freeSticker = document.createElement("a");
        freeSticker.href = books[i].link;
        freeSticker.classList.add("free-sticker");
        freeSticker.textContent = "FREE";

        bookDiv.appendChild(freeSticker);
        bookList.appendChild(bookDiv);
    }
}

function nextBooks() {
    if (bookIndex + 3 < books.length) {
        bookIndex += 3;
    } else {
        bookIndex = 0; // Loop back to the first set of books
    }
    updateBooks();
}

function prevBooks() {
    if (bookIndex > 0) {
        bookIndex -= 3;
    } else {
        bookIndex = books.length - 3; // Jump to the last set of books
    }
    updateBooks();
}

document.addEventListener("DOMContentLoaded", updateBooks);

