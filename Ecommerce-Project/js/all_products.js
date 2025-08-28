let allProducts = [];
let filteredProducts = [];
let currentFilters = {
  categories: new Set(),
  brands: new Set(),
  colors: new Set(),
};

// open & close filter
var filter = document.querySelector(".filter");

function open_close_filter() {
  filter.classList.toggle("active");
}

// Function to render products
function renderProducts(products) {
  const productsContainer = document.getElementById("products_dev");
  if (!products.length) {
    productsContainer.innerHTML = `
      <div class="no-products">
        <i class="fa-solid fa-filter-circle-xmark"></i>
        <p>No products found matching your criteria</p>
        <button onclick="resetFilters()" class="reset-filters">Reset Filters</button>
      </div>`;
    return;
  }
  productsContainer.innerHTML = products
    .map((product) => {
      const old_price_pargrahp = product.old_price
        ? `<p class="old_price">$${product.old_price}</p>`
        : "";
      const percent_disc_div = product.old_price
        ? `<span class="sale_present">%${Math.floor(
            ((product.old_price - product.price) / product.old_price) * 100
          )}</span>`
        : "";
      return `
      <div class="product swiper-slide">
        <div class="icons">
          <span><i onclick="addToCart(${JSON.stringify(product).replace(
            /"/g,
            "&quot;"
          )}, this)" class="fa-solid fa-cart-plus"></i></span>
          <span><i class="fa-solid fa-heart"></i></span>
          <span><i class="fa-solid fa-share"></i></span>
        </div>
        ${percent_disc_div}
        <div class="img_product">
          <a href="product-details.html?id=${product.id}"><img src="${
        product.img
      }" alt="${product.name}" /></a>
          <a href="product-details.html?id=${
            product.id
          }"><img class="img_hover" src="${product.img_hover}" alt="${
        product.name
      }" /></a>
        </div>
        <h3 class="name_product">
          <a href="product-details.html?id=${product.id}">${product.name}</a>
        </h3>
        <div class="stars">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="price">
          <p><span>$${product.price}</span></p>
          ${old_price_pargrahp}
        </div>
      </div>
    `;
    })
    .join("");
  if (typeof getCartItems === "function") getCartItems();
  if (typeof updateCartUI === "function") updateCartUI();
}

// Function to handle search and filters
function applyFilters() {
  const searchQuery = document
    .querySelector('input[type="search"]')
    ?.value.trim()
    .toLowerCase();

  // Add animation class to products container
  const productsContainer = document.getElementById("products_dev");
  productsContainer.classList.add("fade-out");

  filteredProducts = allProducts.filter((product) => {
    // Search filter
    const matchesSearch =
      !searchQuery || product.name.toLowerCase().includes(searchQuery);

    // Category filter
    const matchesCategory =
      currentFilters.categories.size === 0 ||
      (product.category &&
        currentFilters.categories.has(product.category.toLowerCase()));

    // Brand filter
    const matchesBrand =
      currentFilters.brands.size === 0 ||
      (product.brand && currentFilters.brands.has(product.brand.toLowerCase()));

    // Color filter
    const matchesColor =
      currentFilters.colors.size === 0 ||
      (product.color && currentFilters.colors.has(product.color.toLowerCase()));

    const matches =
      matchesSearch && matchesCategory && matchesBrand && matchesColor;
    return matches;
  });

  // Render after brief delay for animation
  setTimeout(() => {
    renderProducts(filteredProducts);
    productsContainer.classList.remove("fade-out");
    updateFilterCounts();
    if (typeof getCartItems === "function") getCartItems();
    if (typeof updateCartUI === "function") updateCartUI();
  }, 300);
}

// Handle filter changes
function handleFilterChange(e) {
  const checkbox = e.target;
  const label = checkbox.closest(".item").querySelector("span");
  const filterValue = label
    ? label.textContent.split("(")[0].trim().toLowerCase()
    : "";
  const filterGroup = checkbox.closest(".filter_item");
  const filterType = filterGroup
    ? filterGroup.querySelector("h4").textContent.toLowerCase()
    : "";

  // Update filter sets
  if (checkbox.checked) {
    if (filterType === "category") currentFilters.categories.add(filterValue);
    if (filterType === "brand") currentFilters.brands.add(filterValue);
    if (filterType === "color") currentFilters.colors.add(filterValue);
  } else {
    if (filterType === "category")
      currentFilters.categories.delete(filterValue);
    if (filterType === "brand") currentFilters.brands.delete(filterValue);
    if (filterType === "color") currentFilters.colors.delete(filterValue);
  }

  applyFilters();
}

// Reset all filters
function resetFilters() {
  currentFilters.categories.clear();
  currentFilters.brands.clear();
  currentFilters.colors.clear();

  // Uncheck all checkboxes
  document
    .querySelectorAll('.filter_item .item input[type="checkbox"]')
    .forEach((checkbox) => {
      checkbox.checked = false;
    });

  // Clear search if exists
  const searchInput = document.querySelector('input[type="search"]');
  if (searchInput) searchInput.value = "";

  applyFilters();
}

// Update filter counts
function updateFilterCounts() {
  const counts = {
    categories: {},
    brands: {},
    colors: {},
  };

  // Count filtered products for each option
  filteredProducts.forEach((product) => {
    // Categories
    counts.categories[product.category] =
      (counts.categories[product.category] || 0) + 1;
    // Brands
    counts.brands[product.brand] = (counts.brands[product.brand] || 0) + 1;
    // Colors
    counts.colors[product.color] = (counts.colors[product.color] || 0) + 1;
  });

  // Update count displays
  updateFilterGroupCounts("Category", counts.categories);
  updateFilterGroupCounts("Brand", counts.brands);
  updateFilterGroupCounts("Color", counts.colors);
}

// Update counts for a filter group
function updateFilterGroupCounts(groupTitle, counts) {
  const filterGroup = Array.from(
    document.querySelectorAll(".filter_item")
  ).find((item) => item.querySelector("h4").textContent === groupTitle);

  if (filterGroup) {
    filterGroup.querySelectorAll(".item").forEach((item) => {
      const spanElement = item.querySelector("span");
      if (!spanElement) return;

      // Get the base label without the count
      const baseLabel = spanElement.textContent.split("(")[0].trim();

      // Get the count for this label
      const count = Object.keys(counts).find(
        (key) => key.toLowerCase() === baseLabel.toLowerCase()
      );

      // Update the text with the new count
      const countValue = count ? counts[count] : 0;
      spanElement.textContent = `${baseLabel} (${countValue})`;
    });
  }
}

// Add styles for animations and no-products message
document.addEventListener("DOMContentLoaded", () => {
  const style = document.createElement("style");
  style.textContent = `
        #products_dev {
            transition: opacity 0.3s ease;
        }
        #products_dev.fade-out {
            opacity: 0;
        }
        .no-products {
            text-align: center;
            padding: 40px;
            color: #666;
        }
        .no-products i {
            font-size: 3em;
            color: #ddd;
            margin-bottom: 15px;
        }
        .reset-filters {
            background: var(--main-color);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 15px;
            transition: transform 0.2s ease;
        }
        .reset-filters:hover {
            transform: scale(1.05);
        }
    `;
  document.head.appendChild(style);
});

// Initialize the page
fetch("js/items.json")
  .then((response) => response.json())
  .then((data) => {
    allProducts = data;
    all_products_json = data; // For cart compatibility
    filteredProducts = [...data];

    // Setup search
    const searchInput = document.querySelector('input[type="search"]');
    if (searchInput) {
      searchInput.addEventListener("input", applyFilters);
      document.querySelector("form.search")?.addEventListener("submit", (e) => {
        e.preventDefault();
        applyFilters();
      });
    }

    // Setup filters
    document
      .querySelectorAll('.filter_item input[type="checkbox"]')
      .forEach((checkbox) => {
        checkbox.addEventListener("change", handleFilterChange);
      });

    // Initial render
    renderProducts(filteredProducts);
    updateFilterCounts();
    if (typeof getCartItems === "function") getCartItems();
    if (typeof updateCartUI === "function") updateCartUI();
  });
