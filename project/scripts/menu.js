/**
 * Zen Café Lagos - Menu & Specials Script
 * WDD 131 - Dynamic Web Fundamentals
 * Demonstrates: Objects, arrays, array methods (.filter, .map, .forEach, .includes),
 * conditional branching, DOM interaction, exclusive template literals, and localStorage.
 */

// Array of authentic, handcrafted menu items
const menuItems = [
    {
        id: "cf-1",
        name: "Taraba Highlands Pour-Over",
        category: "coffee",
        price: 3500,
        description: "Single-origin washed Arabica grown on the Mambilla Plateau in Taraba State, Nigeria. Clean and bright with citrus and honey notes.",
        image: "images/artisan-coffee.jpg",
        dietary: ["vegan", "organic"],
        origin: "Taraba State, Nigeria"
    },
    {
        id: "cf-2",
        name: "Ethiopian Yirgacheffe Cold Brew",
        category: "coffee",
        price: 4000,
        description: "Slow-steeped for 18 hours in cold filtered water. Smooth, low-acidity cold coffee with delicate berry undertones.",
        image: "images/artisan-coffee.jpg",
        dietary: ["vegan", "organic"],
        origin: "Yirgacheffe, Ethiopia"
    },
    {
        id: "cf-3",
        name: "Classic Flat White",
        category: "coffee",
        price: 3800,
        description: "Double shot of house espresso blended with silky steamed milk or oat milk, finished with microfoam.",
        image: "images/artisan-coffee.jpg",
        dietary: ["organic"],
        origin: "East Africa House Blend"
    },
    {
        id: "sm-1",
        name: "Classic Acai Berry Bowl",
        category: "smoothie",
        price: 5500,
        description: "Wild organic acai blended with frozen bananas and house-made tigernut milk. Topped with fresh strawberries, kiwi, and coconut flakes.",
        image: "images/smoothie-bowl.jpg",
        dietary: ["vegan", "gf", "organic"],
        origin: "Superfood Kitchen"
    },
    {
        id: "sm-2",
        name: "Tropical Benue Mango Bowl",
        category: "smoothie",
        price: 4800,
        description: "Sweet Benue mangoes blended with pineapple and coconut water. Crowned with banana slices, chia seeds, and crunchy granola.",
        image: "images/smoothie-bowl.jpg",
        dietary: ["vegan", "gf"],
        origin: "Benue State Fresh"
    },
    {
        id: "sm-3",
        name: "Green Spirulina Detox Bowl",
        category: "smoothie",
        price: 5200,
        description: "Organic spinach, banana, and green spirulina whipped with almond milk. Topped with fresh blueberries and hemp seeds.",
        image: "images/smoothie-bowl.jpg",
        dietary: ["vegan", "gf", "organic"],
        origin: "Organic Greens"
    },
    {
        id: "bk-1",
        name: "Sourdough Avocado Toast",
        category: "bakery",
        price: 4500,
        description: "Toasted wild sourdough slice with fresh crushed Hass avocado, poached farm egg, olive oil, and sea salt flakes.",
        image: "images/artisan-bakery.jpg",
        dietary: ["organic"],
        origin: "House Sourdough Bakery"
    },
    {
        id: "bk-2",
        name: "Flaky Almond Croissant",
        category: "bakery",
        price: 3200,
        description: "Traditional butter croissant baked fresh each morning, filled with sweet almond frangipane cream and sliced almonds.",
        image: "images/artisan-bakery.jpg",
        dietary: ["organic"],
        origin: "In-House Pastry Kitchen"
    },
    {
        id: "bk-3",
        name: "Spiced Banana Walnut Bread",
        category: "bakery",
        price: 2800,
        description: "Moist banana bread naturally sweetened and spiced with Nigerian nutmeg and toasted walnuts. Served warm with butter.",
        image: "images/artisan-bakery.jpg",
        dietary: ["organic"],
        origin: "Daily Bakes"
    },
    {
        id: "jc-1",
        name: "Hibiscus Mint Iced Tea (Zobo)",
        category: "juice",
        price: 2500,
        description: "Sun-dried organic Nigerian hibiscus calyces brewed with fresh ginger, mint leaves, sweet orange slices, and raw honey.",
        image: "images/cold-drinks.jpg",
        dietary: ["vegan", "gf", "organic"],
        origin: "Northern Nigeria Organic"
    },
    {
        id: "jc-2",
        name: "Cold-Pressed Green Glow",
        category: "juice",
        price: 3200,
        description: "Freshly pressed crisp cucumber, celery, local spinach, green Granny Smith apple, and a squeeze of lime.",
        image: "images/cold-drinks.jpg",
        dietary: ["vegan", "gf"],
        origin: "Fresh Cold-Press"
    },
    {
        id: "jc-3",
        name: "Fresh Orange Ginger Tonic",
        category: "juice",
        price: 3000,
        description: "100% pure Valencia oranges, freshly grated ginger root, and turmeric with a dash of raw honey.",
        image: "images/cold-drinks.jpg",
        dietary: ["vegan", "gf", "organic"],
        origin: "Citrus Grove Fresh"
    }
];

// State variables
let currentCategory = "all";
let searchQuery = "";
let selectedDietary = [];
const STORAGE_FAVORITES_KEY = "zenCafeFavorites";

document.addEventListener("DOMContentLoaded", () => {
    initMenuControls();
    filterAndRenderMenu();
    updateFavoriteCountBadge();
});

/**
 * Retrieves saved favorite IDs from localStorage.
 * @returns {Array<string>}
 */
function getStoredFavorites() {
    try {
        const stored = localStorage.getItem(STORAGE_FAVORITES_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
        return [];
    } catch (e) {
        return [];
    }
}

/**
 * Saves favorite IDs array to localStorage.
 * @param {Array<string>} favorites
 */
function saveFavorites(favorites) {
    try {
        localStorage.setItem(STORAGE_FAVORITES_KEY, JSON.stringify(favorites));
    } catch (e) {
        console.warn(`Could not save favorites: ${e.message}`);
    }
}

/**
 * Toggles an item's favorite state in localStorage.
 * Demonstrates array methods (.includes, .filter) and conditional branching.
 * @param {string} itemId
 */
function toggleFavorite(itemId) {
    let favorites = getStoredFavorites();

    if (favorites.includes(itemId)) {
        favorites = favorites.filter((id) => id !== itemId);
    } else {
        favorites.push(itemId);
    }

    saveFavorites(favorites);
    updateFavoriteCountBadge();
    filterAndRenderMenu();
}

/**
 * Updates the favorite count banner in the UI.
 * Exclusively uses template literals.
 */
function updateFavoriteCountBadge() {
    const favCountEl = document.getElementById("fav-count");
    if (!favCountEl) return;

    const favorites = getStoredFavorites();
    favCountEl.textContent = `${favorites.length}`;
}

/**
 * Formats a number to Nigerian Naira using template literals.
 * @param {number} amount
 * @returns {string}
 */
function formatNaira(amount) {
    return `₦${amount.toLocaleString()}`;
}

/**
 * Renders menu cards into the DOM.
 * Uses template literals exclusively.
 * @param {Array<Object>} items
 */
function renderMenuCards(items) {
    const container = document.getElementById("menu-grid");
    const countLabel = document.getElementById("showing-count");

    if (!container) return;

    if (countLabel) {
        countLabel.textContent = `Showing ${items.length} of ${menuItems.length} items`;
    }

    if (items.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem; background: #fff; border: 1px solid #E5E3DE; border-radius: 8px;">
                <h3 style="margin-bottom: 0.5rem; color: #1B4332;">No Items Found</h3>
                <p style="color: #666; margin-bottom: 1rem;">No menu items matched your current search or dietary filters.</p>
                <button type="button" class="btn btn-outline" id="reset-filters-btn">Clear Filters</button>
            </div>
        `;

        const resetBtn = document.getElementById("reset-filters-btn");
        if (resetBtn) {
            resetBtn.addEventListener("click", resetAllFilters);
        }
        return;
    }

    const favorites = getStoredFavorites();

    // Map each item into clean template literals
    const cardsMarkup = items.map((item) => {
        const isFavorited = favorites.includes(item.id);
        const heartSymbol = isFavorited ? `♥` : `♡`;
        const favoriteClass = isFavorited ? `btn-fav-heart favorited` : `btn-fav-heart`;
        const favoriteAria = isFavorited ? `Remove ${item.name} from favorites` : `Add ${item.name} to favorites`;

        const tagsHtml = item.dietary.map((tag) => {
            const labels = {
                vegan: "Vegan",
                gf: "Gluten-Free",
                organic: "Organic"
            };
            const labelText = labels[tag] || tag;
            return `<span class="tag">${labelText}</span>`;
        }).join("");

        return `
            <article class="food-card" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" loading="lazy" width="400" height="300">
                <button type="button" class="${favoriteClass}" aria-label="${favoriteAria}" title="${favoriteAria}" data-item-id="${item.id}">
                    ${heartSymbol}
                </button>
                <div class="food-body">
                    <div class="food-header">
                        <h3 class="food-title">${item.name}</h3>
                        <span class="food-price">${formatNaira(item.price)}</span>
                    </div>
                    <p class="food-desc">${item.description}</p>
                    <div class="food-tags">
                        ${tagsHtml}
                    </div>
                </div>
            </article>
        `;
    }).join("");

    container.innerHTML = cardsMarkup;

    // Attach click listeners to favorite heart buttons
    const favoriteButtons = container.querySelectorAll(".btn-fav-heart");
    favoriteButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const id = btn.getAttribute("data-item-id");
            if (id) {
                toggleFavorite(id);
            }
        });
    });
}

/**
 * Filters the menu item array based on category, search query, and dietary checkboxes.
 * Demonstrates array methods (.filter, .includes, .toLowerCase, .every).
 */
function filterAndRenderMenu() {
    let filtered = menuItems;

    // Category Filter
    if (currentCategory === "favorites") {
        const favorites = getStoredFavorites();
        filtered = filtered.filter((item) => favorites.includes(item.id));
    } else if (currentCategory !== "all") {
        filtered = filtered.filter((item) => item.category === currentCategory);
    }

    // Search Query Filter
    if (searchQuery.trim() !== "") {
        const query = searchQuery.trim().toLowerCase();
        filtered = filtered.filter((item) => {
            const nameMatch = item.name.toLowerCase().includes(query);
            const descMatch = item.description.toLowerCase().includes(query);
            const originMatch = item.origin.toLowerCase().includes(query);
            return nameMatch || descMatch || originMatch;
        });
    }

    // Dietary Filter Checkboxes
    if (selectedDietary.length > 0) {
        filtered = filtered.filter((item) => {
            return selectedDietary.every((diet) => item.dietary.includes(diet));
        });
    }

    renderMenuCards(filtered);
}

/**
 * Resets all filters back to default.
 */
function resetAllFilters() {
    currentCategory = "all";
    searchQuery = "";
    selectedDietary = [];

    const searchInput = document.getElementById("menu-search");
    if (searchInput) searchInput.value = "";

    const categoryBtns = document.querySelectorAll(".category-btn");
    categoryBtns.forEach((btn) => {
        if (btn.dataset.category === "all") {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    const checkboxes = document.querySelectorAll(".dietary-checkbox");
    checkboxes.forEach((cb) => {
        cb.checked = false;
    });

    filterAndRenderMenu();
}

/**
 * Sets up event listeners for search input, category tabs, and dietary checkboxes.
 */
function initMenuControls() {
    const categoryBtns = document.querySelectorAll(".category-btn");
    categoryBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            categoryBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            currentCategory = btn.dataset.category || "all";
            filterAndRenderMenu();
        });
    });

    const searchInput = document.getElementById("menu-search");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value;
            filterAndRenderMenu();
        });
    }

    const checkboxes = document.querySelectorAll(".dietary-checkbox");
    checkboxes.forEach((cb) => {
        cb.addEventListener("change", () => {
            selectedDietary = Array.from(checkboxes)
                .filter((box) => box.checked)
                .map((box) => box.value);
            filterAndRenderMenu();
        });
    });
}
