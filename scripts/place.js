// Set current year
const yearElement = document.getElementById('currentYear');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Set last modified date
const lastModifiedElement = document.getElementById('lastModified');
if (lastModifiedElement) {
    lastModifiedElement.textContent = document.lastModified;
}

// Wind Chill Calculation
const tempElement = document.getElementById('temperature');
const windElement = document.getElementById('windSpeed');
const windChillElement = document.getElementById('windChill');

if (tempElement && windElement && windChillElement) {
    const temperature = parseFloat(tempElement.textContent);
    const windSpeed = parseFloat(windElement.textContent);

    function calculateWindChill(temp, speed) {
        return (13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16)).toFixed(1);
    }

    if (temperature <= 10 && windSpeed > 4.8) {
        windChillElement.innerHTML = calculateWindChill(temperature, windSpeed) + " &deg;C";
    } else {
        windChillElement.textContent = "N/A";
    }
}
