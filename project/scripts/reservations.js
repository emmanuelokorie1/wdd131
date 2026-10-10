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

    banner.innerHTML = `
        <h3 style="color: #1B4332; margin-bottom: 0.5rem;">Reservation Confirmed</h3>
        <p style="margin-bottom: 1rem;">Thank you, <strong>${booking.fullName}</strong>. Your reservation reference is <strong>${booking.code}</strong>.</p>
        <div style="background: #ffffff; border: 1px solid #c7ddcb; border-radius: 6px; padding: 1rem; font-size: 0.92rem;">
            <p style="margin-bottom: 0.35rem;"><strong>Space:</strong> ${booking.spaceType}</p>
            <p style="margin-bottom: 0.35rem;"><strong>Date &amp; Time:</strong> ${booking.date} (${booking.timeSlot})</p>
            <p style="margin-bottom: 0.35rem;"><strong>Party Size:</strong> ${booking.guests} guest(s)</p>
            <p style="margin-bottom: 0.35rem;"><strong>Amenities:</strong> ${booking.amenities.length > 0 ? booking.amenities.join(", ") : "Standard seating and Wi-Fi"}</p>
            <p style="margin-bottom: 0;"><strong>Contact:</strong> ${booking.email} &bull; ${booking.phone}</p>
        </div>
        <p style="font-size: 0.85rem; color: #555; margin-top: 0.75rem; margin-bottom: 0;">
            A confirmation has been saved to your browser. Please mention reference <strong>${booking.code}</strong> upon arrival at Plot 14, Admiralty Way.
        </p>
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
            <p style="color: #666; font-size: 0.88rem; font-style: italic; margin-bottom: 0;">
                No bookings saved in this browser yet. Fill out the form to reserve a spot.
            </p>
        `;
        return;
    }

    const itemsHtml = bookings.map((b) => {
        return `
            <div class="history-entry">
                <div style="display: flex; justify-content: space-between; font-weight: 600; color: #1B4332; margin-bottom: 0.2rem;">
                    <span>${b.spaceType}</span>
                    <span style="font-family: monospace; font-size: 0.85rem;">${b.code}</span>
                </div>
                <p style="margin-bottom: 0.2rem; font-size: 0.86rem; color: #444;">
                    ${b.date} &bull; ${b.timeSlot} &bull; ${b.guests} guest(s)
                </p>
                <p style="margin-bottom: 0; font-size: 0.78rem; color: #777;">
                    ${b.fullName} &bull; ${b.created}
                </p>
            </div>
        `;
    }).join("");

    historyContainer.innerHTML = itemsHtml;
}
