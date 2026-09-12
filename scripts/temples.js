// Select the HTML elements
const yearSpan = document.getElementById('currentyear');
const lastModifiedP = document.getElementById('lastModified');
const mainnav = document.querySelector('nav');
const hambutton = document.querySelector('#menu-button');

// Populate the current year
if (yearSpan) {
    const today = new Date();
    yearSpan.innerHTML = today.getFullYear();
}

// Populate the last modified date
if (lastModifiedP) {
    lastModifiedP.innerHTML = `Last Modification: ${document.lastModified}`;
}

// Add a click event listener to the hamburger button
if (hambutton && mainnav) {
    hambutton.addEventListener('click', () => {
        // Toggle the 'show' class on both elements
        mainnav.classList.toggle('show');
        hambutton.classList.toggle('show');
    });
}
