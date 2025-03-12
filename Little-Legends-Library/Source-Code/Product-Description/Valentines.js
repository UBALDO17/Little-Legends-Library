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