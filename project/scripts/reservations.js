/**
 * Zen Café Lagos - Sanctuary & Table Reservations Script
 * WDD 131 - Dynamic Web Fundamentals
 * Handles: Form validation and submission, localStorage management,
 * conditional branching, DOM updates, and template literal generation.
 */

const STORAGE_BOOKINGS_KEY = "zenCafeBookings";

document.addEventListener("DOMContentLoaded", () => {
    initReservationForm();
    renderBookingHistory();
    setMinDateRestriction();
});

/**
 * Ensures the date picker does not allow past dates.
 */
function setMinDateRestriction() {
    const dateInput = document.getElementById("res-date");
    if (dateInput) {
        const today = new Date().toISOString().split("T")[0];
        dateInput.setAttribute("min", `${today}`);
    }
}

/**
 * Retrieves past bookings array from localStorage.
 * Demonstrates error catching and conditional fallback.
 * @returns {Array<Object>}
 */
function getStoredBookings() {
    try {
        const stored = localStorage.getItem(STORAGE_BOOKINGS_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
        return [];
    } catch (e) {
        return [];
    }
}

/**
 * Saves bookings array to localStorage.
 * @param {Array<Object>} bookings
 */
function saveBookings(bookings) {
    try {
        localStorage.setItem(STORAGE_BOOKINGS_KEY, JSON.stringify(bookings));
    } catch (e) {
        console.warn(`Error writing bookings to localStorage: ${e.message}`);
    }
}

/**
 * Generates a unique human-friendly booking code.
 * Exclusively uses template literals.
 * @returns {string}
 */
function generateBookingCode() {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const datePrefix = new Date().getFullYear().toString().slice(-2);
    return `ZEN-${datePrefix}${randomDigits}`;
}

/**
 * Initializes form submission listeners and clear history button.
 */
function initReservationForm() {
    const form = document.getElementById("reservation-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        handleFormSubmission(form);
    });

    const clearBtn = document.getElementById("btn-clear-history");
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to clear your saved booking history?")) {
                localStorage.removeItem(STORAGE_BOOKINGS_KEY);
                renderBookingHistory();
                hideConfirmationCard();
            }
        });
    }
}

/**
 * Processes form data, saves booking to localStorage, and updates UI.
 * @param {HTMLFormElement} form
 */
function handleFormSubmission(form) {
    const fullName = document.getElementById("res-name").value.trim();
    const email = document.getElementById("res-email").value.trim();
    const phone = document.getElementById("res-phone").value.trim();
    const spaceType = document.getElementById("res-space").value;
    const bookingDate = document.getElementById("res-date").value;
    const timeSlot = document.getElementById("res-timeslot").value;
    const guestCount = document.getElementById("res-guests").value;
    const specialRequests = document.getElementById("res-notes").value.trim();

    // Collect selected amenity checkboxes using Array.from and filter
    const amenityCheckboxes = document.querySelectorAll('input[name="amenities"]:checked');
    const selectedAmenities = Array.from(amenityCheckboxes).map((box) => box.value);

    // Map spaceType values to human-friendly labels
    const spaceLabels = {
        "hot-desk": "Ergonomic Hot Desk (Co-Working Hall)",
        "quiet-booth": "Private Sound-Dampened Call Booth",
        "meeting-table": "Team Collaboration Table (4-6 Persons)",
        "tasting-table": "Artisan Coffee Tasting Lounge Table",
        "garden-patio": "Coastal Garden Patio Table"
    };

    const spaceName = spaceLabels[spaceType] || spaceType;
    const bookingCode = generateBookingCode();
    const submissionTimestamp = new Date().toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short"
    });

    // Create Booking Object
    const newBooking = {
        code: bookingCode,
        fullName: fullName,
        email: email,
        phone: phone,
        spaceType: spaceName,
        date: bookingDate,
        timeSlot: timeSlot,
        guests: guestCount,
        amenities: selectedAmenities,
        notes: specialRequests || "None specified",
        created: submissionTimestamp
    };

    // Save to localStorage
    const existingBookings = getStoredBookings();
    existingBookings.unshift(newBooking); // add to start
    saveBookings(existingBookings);

    // Display confirmation card
    displayConfirmationCard(newBooking);

    // Refresh history
    renderBookingHistory();

    // Reset form
    form.reset();
    setMinDateRestriction();

    // Scroll smoothly to confirmation banner
    const confirmEl = document.getElementById("confirmation-banner");
    if (confirmEl) {
        confirmEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

/**
 * Displays the dynamic confirmation card with booking details.
 * Exclusively uses template literals.
 * @param {Object} booking
 */
function displayConfirmationCard(booking) {
    const banner = document.getElementById("confirmation-banner");
    if (!banner) return;

    const amenitiesListHtml = booking.amenities.length > 0
        ? booking.amenities.map((item) => `<li>${item}</li>`).join("")
        : `<li>Standard high-speed Wi-Fi and power backup included</li>`;

    banner.innerHTML = `
        <div class="confirmation-header">
            <span class="confirmation-icon" aria-hidden="true">&#9989;</span>
            <div>
                <h3>Reservation Confirmed!</h3>
                <p>Thank you, <strong>${booking.fullName}</strong>. Your sanctuary space has been reserved.</p>
            </div>
        </div>

        <div class="confirmation-details-box">
            <p><strong>Booking Reference:</strong> <span class="booking-code-tag">${booking.code}</span></p>
            <p><strong>Reserved Space:</strong> ${booking.spaceType}</p>
            <p><strong>Date &amp; Time Slot:</strong> ${booking.date} &bull; ${booking.timeSlot}</p>
            <p><strong>Party Size:</strong> ${booking.guests} guest(s)</p>
            <p><strong>Included Amenities:</strong></p>
            <ul>
                ${amenitiesListHtml}
            </ul>
            <p><strong>Contact Email:</strong> ${booking.email} &bull; <strong>Phone:</strong> ${booking.phone}</p>
            <p style="margin-top: 0.75rem; font-size: 0.85rem; color: #555555;">
                A copy of this confirmation has been archived in your browser storage. Please show your reference code upon arrival at Plot 14, Admiralty Way, Lekki Phase 1.
            </p>
        </div>
    `;

    banner.style.display = "block";
}

/**
 * Hides the confirmation banner.
 */
function hideConfirmationCard() {
    const banner = document.getElementById("confirmation-banner");
    if (banner) {
        banner.style.display = "none";
    }
}

/**
 * Renders the saved bookings history list from localStorage.
 * Uses template literals exclusively.
 */
function renderBookingHistory() {
    const historyContainer = document.getElementById("bookings-history-list");
    const countBadge = document.getElementById("history-count");
    if (!historyContainer) return;

    const bookings = getStoredBookings();

    if (countBadge) {
        countBadge.textContent = `${bookings.length}`;
    }

    if (bookings.length === 0) {
        historyContainer.innerHTML = `
            <p style="color: #666; font-size: 0.9rem; font-style: italic;">
                No active bookings recorded in this browser. Complete the form above to reserve your spot!
            </p>
        `;
        return;
    }

    const itemsHtml = bookings.map((b) => {
        return `
            <div class="booking-item-card">
                <div class="booking-item-title">
                    <span>${b.spaceType}</span>
                    <span class="booking-code-tag" style="font-size: 0.85rem;">${b.code}</span>
                </div>
                <p style="font-size: 0.88rem; margin-bottom: 0.25rem;">
                    <strong>Date:</strong> ${b.date} &bull; <strong>Slot:</strong> ${b.timeSlot} &bull; <strong>Guests:</strong> ${b.guests}
                </p>
                <p style="font-size: 0.8rem; color: #666; margin-bottom: 0;">
                    Booked by: ${b.fullName} (${b.email}) &bull; Booked on: ${b.created}
                </p>
            </div>
        `;
    }).join("");

    historyContainer.innerHTML = itemsHtml;
}
