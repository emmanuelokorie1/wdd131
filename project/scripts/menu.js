/**
 * Zen Café Lagos - Interactive Menu Script
 * WDD 131 - Dynamic Web Fundamentals
 * Demonstrates: Arrays, array methods (filter, map, forEach), objects,
 * conditional branching, DOM manipulation, exclusive template literals, and localStorage.
 */

// Array of Menu Item Objects
const menuItems = [
    {
        id: "cf-1",
        name: "Taraba Highlands Pour-Over",
        category: "coffee",
        price: 4500,
        description: "Single-origin washed Arabica grown on the Mambilla Plateau of Taraba State, Nigeria. Notes of jasmine, bright citrus, and wild honey.",
        image: "images/artisan-coffee.jpg",
        dietary: ["vegan", "organic", "signature"],
        origin: "Taraba Highlands, Nigeria"
    },
    {
        id: "cf-2",
        name: "Ethiopian Yirgacheffe Cold Brew",
        category: "coffee",
        price: 4800,
        description: "Slow-steeped for 18 hours in cold filtered water. Smooth, velvety mouthfeel with delicate bergamot and blueberry undertones.",
        image: "images/artisan-coffee.jpg",
        dietary: ["vegan", "organic"],
        origin: "Yirgacheffe, Ethiopia"
    },
    {
        id: "cf-3",
        name: "Lekki Spiced Cardamom Flat White",
        category: "coffee",
        price: 5200,
        description: "Double espresso pulled through crushed green cardamom pods, steamed with velvety oat milk and a hint of raw agave nectar.",
        image: "images/artisan-coffee.jpg",
        dietary: ["vegan", "signature"],
        origin: "East Africa House Blend"
    },
    {
        id: "sm-1",
        name: "Amazonian Acai & Baobab Bowl",
        category: "smoothie",
        price: 6500,
        description: "Pure wild acai blended with organic Nigerian baobab fruit and frozen bananas. Topped with dragon fruit, chia seeds, and toasted coconut flakes.",
        image: "images/smoothie-bowl.jpg",
        dietary: ["vegan", "gf", "organic", "signature"],
        origin: "Organic Superfood Blend"
    },
    {
        id: "sm-2",
        name: "Tropical Mango & Tigernut Bliss",
        category: "smoothie",
        price: 5900,
        description: "Sweet Benue mangoes blended with homemade sweet tigernut (kunu aya) milk and spinach, crowned with fresh kiwi slices and hemp hearts.",
        image: "images/smoothie-bowl.jpg",
        dietary: ["vegan", "gf", "keto"],
        origin: "Benue State & Lagos Local"
    },
    {
        id: "sm-3",
        name: "Blue Spirulina Ocean Glow",
        category: "smoothie",
        price: 6800,
        description: "Marine blue spirulina whipped with coconut yogurt, frozen pineapple, and lime juice. Finished with cacao nibs and organic blueberries.",
        image: "images/smoothie-bowl.jpg",
        dietary: ["vegan", "gf", "organic"],
        origin: "Coastal Nutrient Blend"
    },
    {
        id: "bk-1",
        name: "Artisan Sourdough Avocado Toast",
        category: "bakery",
        price: 5500,
        description: "Locally fermented wild sourdough toast layered with crushed Hass avocado, poached organic farm egg, watermelon radish, and microgreens.",
        image: "images/artisan-bakery.jpg",
        dietary: ["organic", "signature"],
        origin: "In-House Sourdough Bakery"
    },
    {
        id: "bk-2",
        name: "Toasted Almond Croissant",
        category: "bakery",
        price: 4200,
        description: "Flaky all-butter laminated French pastry filled with rich almond frangipane cream, dusted with powdered organic cane sugar.",
        image: "images/artisan-bakery.jpg",
        dietary: ["organic"],
        origin: "French Craft Artisanal"
    },
    {
        id: "bk-3",
        name: "Grain-Free Banana Walnut Bread",
        category: "bakery",
        price: 3800,
        description: "Almond flour bread naturally sweetened with ripe plantains and dates, spiced with Nigerian nutmeg and toasted walnuts.",
        image: "images/artisan-bakery.jpg",
        dietary: ["gf", "keto"],
        origin: "Grain-Free Kitchen"
    },
    {
        id: "jc-1",
        name: "Zobo Ruby Hibiscus Elixir",
        category: "juice",
        price: 3600,
        description: "Sun-dried organic Nigerian hibiscus calyces cold-infused with ginger root, cloves, sweet oranges, and pure raw mountain honey.",
        image: "images/cold-drinks.jpg",
        dietary: ["vegan", "gf", "organic", "signature"],
        origin: "Kano & Kaduna Organic Farms"
    },
    {
        id: "jc-2",
        name: "Golden Turmeric Ginger Tonic",
        category: "juice",
        price: 3900,
        description: "Cold-pressed fresh yellow turmeric, spicy ginger root, Valencia orange juice, black pepper extract, and coconut water.",
        image: "images/cold-drinks.jpg",
        dietary: ["vegan", "gf", "organic"],
        origin: "Fresh Nigerian Cold-Press"
    },
    {
        id: "jc-3",
        name: "Green Sanctuary Detox Cold-Press",
        category: "juice",
        price: 4200,
        description: "Crisp cucumber, celery, local ugwu spinach, green Granny Smith apples, mint leaves, and fresh lime juice.",
        image: "images/cold-drinks.jpg",
        dietary: ["vegan", "gf", "keto"],
        origin: "Lekki Urban Farm Fresh"
    }
];

// State Management
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
 * Retrieves stored favorite IDs from localStorage.
 * Demonstrates conditional branching and error fallback.
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
 * Saves favorites array to localStorage.
 * @param {Array<string>} favorites
 */
function saveFavorites(favorites) {
    try {
        localStorage.setItem(STORAGE_FAVORITES_KEY, JSON.stringify(favorites));
    } catch (e) {
        console.warn(`Unable to save favorites to localStorage: ${e.message}`);
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
        // Remove from favorites using array filter method
        favorites = favorites.filter((id) => id !== itemId);
    } else {
        // Add to favorites
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
    const count = favorites.length;
    favCountEl.textContent = `${count}`;
}

/**
 * Formats a numeric price into Nigerian Naira currency string using template literals.
 * @param {number} amount
 * @returns {string}
 */
function formatNaira(amount) {
    return `₦${amount.toLocaleString()}`;
}

/**
 * Renders the menu item cards to the DOM.
 * Uses template literals exclusively for all HTML construction.
 * @param {Array<Object>} items
 */
function renderMenuCards(items) {
    const container = document.getElementById("menu-grid");
    const countLabel = document.getElementById("showing-count");

    if (!container) return;

    if (countLabel) {
        countLabel.textContent = `Showing ${items.length} of ${menuItems.length} handcrafted items`;
    }

    if (items.length === 0) {
        container.innerHTML = `
            <div class="empty-menu-message">
                <h3>No Menu Items Found</h3>
                <p>We could not find any culinary offerings matching your current filter selections.</p>
                <button type="button" class="btn btn-outline" id="reset-filters-btn">Reset All Filters</button>
            </div>
        `;

        const resetBtn = document.getElementById("reset-filters-btn");
        if (resetBtn) {
            resetBtn.addEventListener("click", resetAllFilters);
        }
        return;
    }

    const favorites = getStoredFavorites();

    // Map items to HTML card template literals and join
    const cardsMarkup = items.map((item) => {
        const isFavorited = favorites.includes(item.id);
        const heartSymbol = isFavorited ? `♥` : `♡`;
        const favoriteClass = isFavorited ? `btn-favorite favorited` : `btn-favorite`;
        const favoriteAria = isFavorited ? `Remove ${item.name} from favorites` : `Add ${item.name} to favorites`;

        // Generate dietary tags via map
        const tagsHtml = item.dietary.map((tag) => {
            const labelMap = {
                vegan: "Vegan",
                gf: "Gluten-Free",
                keto: "Keto",
                organic: "100% Organic",
                signature: "Chef Signature"
            };
            const labelText = labelMap[tag] || tag;
            return `<span class="tag-badge tag-${tag}">${labelText}</span>`;
        }).join("");

        return `
            <article class="menu-card" data-id="${item.id}">
                <div class="menu-card-img-wrapper">
                    <img src="${item.image}" alt="${item.name}" loading="lazy" width="400" height="300">
                    <button type="button" class="${favoriteClass}" aria-label="${favoriteAria}" title="${favoriteAria}" data-item-id="${item.id}">
                        ${heartSymbol}
                    </button>
                </div>
                <div class="menu-card-body">
                    <div class="menu-card-header">
                        <h3>${item.name}</h3>
                        <span class="menu-price">${formatNaira(item.price)}</span>
                    </div>
                    <p class="menu-card-desc">${item.description}</p>
                    <div class="menu-tags">
                        ${tagsHtml}
                    </div>
                </div>
            </article>
        `;
    }).join("");

    container.innerHTML = cardsMarkup;

    // Attach event listeners to favorite buttons
    const favoriteButtons = container.querySelectorAll(".btn-favorite");
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
 * Filters the menu item array based on category, search input, and dietary preferences.
 * Demonstrates array methods (.filter, .includes, .toLowerCase, .some).
 */
function filterAndRenderMenu() {
    let filtered = menuItems;

    // Filter by Category
    if (currentCategory === "favorites") {
        const favorites = getStoredFavorites();
        filtered = filtered.filter((item) => favorites.includes(item.id));
    } else if (currentCategory !== "all") {
        filtered = filtered.filter((item) => item.category === currentCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim() !== "") {
        const query = searchQuery.trim().toLowerCase();
        filtered = filtered.filter((item) => {
            const matchesName = item.name.toLowerCase().includes(query);
            const matchesDesc = item.description.toLowerCase().includes(query);
            const matchesOrigin = item.origin.toLowerCase().includes(query);
            return matchesName || matchesDesc || matchesOrigin;
        });
    }

    // Filter by Selected Dietary Tags (must satisfy all checked tags)
    if (selectedDietary.length > 0) {
        filtered = filtered.filter((item) => {
            return selectedDietary.every((dietTag) => item.dietary.includes(dietTag));
        });
    }

    renderMenuCards(filtered);
}

/**
 * Resets all filters to initial view.
 */
function resetAllFilters() {
    currentCategory = "all";
    searchQuery = "";
    selectedDietary = [];

    const searchInput = document.getElementById("menu-search");
    if (searchInput) searchInput.value = "";

    const categoryBtns = document.querySelectorAll(".filter-btn");
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
 * Sets up listeners for interactive category tabs, search input, and dietary checkboxes.
 */
function initMenuControls() {
    // Category Buttons
    const categoryBtns = document.querySelectorAll(".filter-btn");
    categoryBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            categoryBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            currentCategory = btn.dataset.category || "all";
            filterAndRenderMenu();
        });
    });

    // Search Input with real-time feedback
    const searchInput = document.getElementById("menu-search");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value;
            filterAndRenderMenu();
        });
    }

    // Dietary Filter Checkboxes
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
