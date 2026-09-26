// Temple data array
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // Additional temples added by student
    {
        templeName: "Logan Utah",
        location: "Logan, Utah, United States",
        dedicated: "1884, May, 17",
        area: 119619,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/logan-utah/400x250/logan-temple-768119-wallpaper.jpg"
    },
    {
        templeName: "St. George Utah",
        location: "St. George, Utah, United States",
        dedicated: "1877, April, 6",
        area: 143969,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/st-george-utah/400x250/st-george-temple-lds-149536-wallpaper.jpg"
    },
    {
        templeName: "Salt Lake Utah",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253015,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/2018/400x250/slctemple5.jpg"
    },
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 41010,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/2019/400x250/1-Rome-Temple-2160936.jpg"
    }
];

// DOM Element References
const gallery = document.querySelector(".gallery");
const pageTitle = document.querySelector("#page-title");
const mainnav = document.querySelector("nav");
const hambutton = document.querySelector("#menu-button");
const navLinks = document.querySelectorAll("nav ul li a");
const homeLink = document.querySelector("#home");
const oldLink = document.querySelector("#old");
const newLink = document.querySelector("#new");
const largeLink = document.querySelector("#large");
const smallLink = document.querySelector("#small");

// Function to generate and render temple cards
function createTempleCard(filteredTemples) {
    if (!gallery) return;
    gallery.innerHTML = "";

    filteredTemples.forEach((temple) => {
        const card = document.createElement("section");
        card.classList.add("temple-card");

        const name = document.createElement("h3");
        name.textContent = temple.templeName;

        const location = document.createElement("p");
        location.innerHTML = `<span class="label">Location:</span> ${temple.location}`;

        const dedicated = document.createElement("p");
        dedicated.innerHTML = `<span class="label">Dedicated:</span> ${temple.dedicated}`;

        const area = document.createElement("p");
        area.innerHTML = `<span class="label">Size:</span> ${temple.area} sq ft`;

        const img = document.createElement("img");
        img.setAttribute("src", temple.imageUrl);
        img.setAttribute("alt", `${temple.templeName} Temple`);
        img.setAttribute("loading", "lazy");
        img.setAttribute("width", "400");
        img.setAttribute("height", "250");

        card.appendChild(name);
        card.appendChild(location);
        card.appendChild(dedicated);
        card.appendChild(area);
        card.appendChild(img);

        gallery.appendChild(card);
    });
}

// Function to update active navigation state
function setActiveLink(activeElement) {
    navLinks.forEach((link) => link.classList.remove("active"));
    activeElement.classList.add("active");
    if (mainnav && mainnav.classList.contains("show")) {
        mainnav.classList.remove("show");
        hambutton.classList.remove("show");
    }
}

// Navigation Filter Event Listeners
if (homeLink) {
    homeLink.addEventListener("click", (event) => {
        event.preventDefault();
        pageTitle.textContent = "Home";
        setActiveLink(homeLink);
        createTempleCard(temples);
    });
}

if (oldLink) {
    oldLink.addEventListener("click", (event) => {
        event.preventDefault();
        pageTitle.textContent = "Old";
        setActiveLink(oldLink);
        const oldTemples = temples.filter((temple) => {
            const year = parseInt(temple.dedicated.split(",")[0].trim(), 10);
            return year < 1900;
        });
        createTempleCard(oldTemples);
    });
}

if (newLink) {
    newLink.addEventListener("click", (event) => {
        event.preventDefault();
        pageTitle.textContent = "New";
        setActiveLink(newLink);
        const newTemples = temples.filter((temple) => {
            const year = parseInt(temple.dedicated.split(",")[0].trim(), 10);
            return year > 2000;
        });
        createTempleCard(newTemples);
    });
}

if (largeLink) {
    largeLink.addEventListener("click", (event) => {
        event.preventDefault();
        pageTitle.textContent = "Large";
        setActiveLink(largeLink);
        const largeTemples = temples.filter((temple) => temple.area > 90000);
        createTempleCard(largeTemples);
    });
}

if (smallLink) {
    smallLink.addEventListener("click", (event) => {
        event.preventDefault();
        pageTitle.textContent = "Small";
        setActiveLink(smallLink);
        const smallTemples = temples.filter((temple) => temple.area < 10000);
        createTempleCard(smallTemples);
    });
}

// Hamburger menu toggle for mobile
if (hambutton && mainnav) {
    hambutton.addEventListener("click", () => {
        mainnav.classList.toggle("show");
        hambutton.classList.toggle("show");
    });
}

// Footer current year and last modified date
const yearSpan = document.getElementById("currentyear");
const lastModifiedP = document.getElementById("lastModified");

if (yearSpan) {
    const today = new Date();
    yearSpan.textContent = today.getFullYear();
}

if (lastModifiedP) {
    lastModifiedP.textContent = `Last Modification: ${document.lastModified}`;
}

// Initial render of all temples
createTempleCard(temples);
