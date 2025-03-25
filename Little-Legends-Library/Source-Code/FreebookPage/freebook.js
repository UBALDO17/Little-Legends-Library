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
    { img: "https://res.cloudinary.com/du0ijg1nu/image/upload/v1742303467/1_ggliia.png", link: "https://heyzine.com/flip-book/e38e304573.html" },
    { img: "https://res.cloudinary.com/du0ijg1nu/image/upload/v1742303460/2_swbioi.png", link: "https://heyzine.com/flip-book/b65a85dfb5.html" },
    { img: "https://res.cloudinary.com/du0ijg1nu/image/upload/v1742303466/3_a5gbhu.png", link: "https://heyzine.com/flip-book/a0ebefb2cc.html" },
    { img: "https://res.cloudinary.com/du0ijg1nu/image/upload/v1742303465/4_b3oiio.png", link: "book-preview4.html" },
    { img: "https://res.cloudinary.com/du0ijg1nu/image/upload/v1742303464/5_xqyfza.png", link: "https://heyzine.com/flip-book/8bdc0f2f8c.html" },
    { img: "https://res.cloudinary.com/du0ijg1nu/image/upload/v1742303461/6_mflbyw.png", link: "https://heyzine.com/flip-book/2a7fb4c219.html" },
    { img: "https://res.cloudinary.com/du0ijg1nu/image/upload/v1742303461/7_sutn1d.png", link: "https://heyzine.com/flip-book/6d949c168e.html" },
];

function updateBooks() {
    const bookList = document.querySelector(".book-list");
    bookList.innerHTML = "";

    let booksPerSlide = window.innerWidth <= 768 ? 1 : 3; // 1 book per slide on mobile

    for (let i = bookIndex; i < bookIndex + booksPerSlide; i++) {
        if (i >= books.length) break;

        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");

        const bookLink = document.createElement("a");
        bookLink.href = books[i].link;

        const bookImg = document.createElement("img");
        bookImg.src = books[i].img;
        bookImg.alt = `Book ${i + 1}`;

        bookLink.appendChild(bookImg);
        bookDiv.appendChild(bookLink);

        const freeSticker = document.createElement("a");
        freeSticker.href = books[i].link;
        freeSticker.classList.add("free-sticker");
        freeSticker.textContent = "FREE";

        bookDiv.appendChild(freeSticker);
        bookList.appendChild(bookDiv);
    }
}

function nextBooks() {
    let booksPerSlide = window.innerWidth <= 768 ? 1 : 3;
    if (bookIndex + booksPerSlide < books.length) {
        bookIndex += booksPerSlide;
    } else {
        bookIndex = 0;
    }
    updateBooks();
}

function prevBooks() {
    let booksPerSlide = window.innerWidth <= 768 ? 1 : 3;
    if (bookIndex > 0) {
        bookIndex -= booksPerSlide;
    } else {
        bookIndex = books.length - booksPerSlide;
    }
    updateBooks();
}

document.addEventListener("DOMContentLoaded", updateBooks);
window.addEventListener("resize", updateBooks);

