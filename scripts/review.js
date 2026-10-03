// Review Confirmation Script - localStorage Counter and Footer Dates
document.addEventListener("DOMContentLoaded", () => {
    // Retrieve, increment, and store reviews count in localStorage
    const STORAGE_KEY = "numReviews";
    let reviewCount = parseInt(localStorage.getItem(STORAGE_KEY), 10);

    if (isNaN(reviewCount) || reviewCount < 0) {
        reviewCount = 0;
    }

    // Increment count for this submission
    reviewCount += 1;
    localStorage.setItem(STORAGE_KEY, reviewCount);

    // Display the count on the confirmation page
    const counterElement = document.getElementById("review-count");
    if (counterElement) {
        counterElement.textContent = reviewCount;
    }

    // Populate Footer Current Year and Last Modified Date
    const currentYearEl = document.getElementById("currentyear");
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    const lastModifiedEl = document.getElementById("lastModified");
    if (lastModifiedEl) {
        lastModifiedEl.textContent = `Last Modification: ${document.lastModified}`;
    }
});
