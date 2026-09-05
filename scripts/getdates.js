// Get the current year and populate the #currentyear span
const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

// Get the last modified date of the document and populate the #lastModified paragraph
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;
