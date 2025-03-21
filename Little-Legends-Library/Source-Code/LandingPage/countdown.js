// Get countdown elements
const daysEl = document.getElementById("countdown-days");
const hoursEl = document.getElementById("countdown-hours");
const minutesEl = document.getElementById("countdown-minutes");
const secondsEl = document.getElementById("countdown-seconds");

function startCountdown() {
    let countdownDate = localStorage.getItem("countdownEndTime");

    // If no countdown exists, set a new one for 10 hours
    if (!countdownDate || new Date().getTime() > countdownDate) {
        countdownDate = new Date().getTime() + 10 * 60 * 60 * 1000;
        localStorage.setItem("countdownEndTime", countdownDate);
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance <= 0) {
            // Reset countdown after finishing 10 hours
            countdownDate = new Date().getTime() + 10 * 60 * 60 * 1000;
            localStorage.setItem("countdownEndTime", countdownDate);
        }

        // Time calculations
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update HTML
        daysEl.innerText = "00"; // No days needed for a 10-hour countdown
        hoursEl.innerText = formatNumber(hours);
        minutesEl.innerText = formatNumber(minutes);
        secondsEl.innerText = formatNumber(seconds);
    }

    // Ensure numbers always have two digits
    function formatNumber(num) {
        return num < 10 ? "0" + num : num;
    }

    // Run countdown immediately and every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Start countdown on page load
document.addEventListener("DOMContentLoaded", startCountdown);
