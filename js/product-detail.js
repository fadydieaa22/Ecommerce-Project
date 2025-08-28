// Get product ID from URL
function getProductIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Elements
const addToCartBtn = document.querySelector(".add-to-cart-btn");
const quantityInput = document.querySelector("#quantity");
const cartCount = document.querySelector("#cart-count");
const cartTotal = document.querySelector("#cart-total");
const cartTotalPopup = document.querySelector("#cart-total-popup");
const mainImage = document.getElementById("mainImage");
const productTitle = document.querySelector(".product-title");
const productPrice = document.querySelector(".product-price");
const productDesc = document.querySelector(".product-desc");

// Set default quantity
if (quantityInput) {
  quantityInput.value = "1";
  quantityInput.addEventListener("change", () => {
    if (parseInt(quantityInput.value) < 1) {
      quantityInput.value = "1";
    }
  });
}

// Load cart from localStorage (avoid conflict with global 'cart')
let productDetailCart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count and total in navbar and popup
function updateCartUI() {
  const totalItems = productDetailCart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const totalPrice = productDetailCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  if (cartCount) cartCount.textContent = totalItems;
  if (cartTotal) cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
  if (cartTotalPopup) cartTotalPopup.textContent = `$${totalPrice.toFixed(2)}`;
  const countItemCart = document.querySelector(".count_item_cart");
  if (countItemCart)
    countItemCart.textContent = `(${totalItems} Item${
      totalItems !== 1 ? "s" : ""
    } in Cart)`;
}
updateCartUI();

// Load product data and render
function loadProductDetails() {
  const productId = getProductIdFromUrl();
  if (!productId) {
    if (productTitle) productTitle.textContent = "No product selected.";
    if (productPrice) productPrice.textContent = "";
    if (mainImage) mainImage.style.display = "none";
    if (productDesc)
      productDesc.textContent =
        "Please select a product from the homepage or products list.";
    // Optionally hide details section
    const detailsSection = document.querySelector(".product-details");
    if (detailsSection) detailsSection.style.display = "none";
    return;
  }
  fetch("js/items.json")
    .then((res) => res.json())
    .then((products) => {
      const product = products.find((p) => p.id === parseInt(productId));
      if (!product) {
        if (productTitle) productTitle.textContent = "Product Not Found";
        if (productPrice) productPrice.textContent = "";
        if (mainImage) mainImage.style.display = "none";
        if (productDesc)
          productDesc.textContent =
            "This product does not exist. Please select another product.";
        const detailsSection = document.querySelector(".product-details");
        if (detailsSection) detailsSection.style.display = "none";
        return;
      }
      if (mainImage) {
        mainImage.src = product.img;
        mainImage.alt = product.name;
        mainImage.style.display = "block";
        mainImage.onerror = function () {
          this.src = "img/product/product1.jpg";
        };
      }
      if (productTitle) productTitle.textContent = product.name;
      if (productPrice) productPrice.textContent = `$${product.price}`;
      if (productDesc)
        productDesc.textContent =
          product.description || product.desc || "No description.";
      // Brand
      const brandDiv = document.querySelector(".product-brand");
      if (brandDiv) brandDiv.textContent = "Brand: " + (product.brand || "N/A");
      // Category
      const catDiv = document.querySelector(".product-category");
      if (catDiv)
        catDiv.textContent = "Category: " + (product.category || "N/A");
      // Colors
      const colorsDiv = document.querySelector(".product-colors");
      if (colorsDiv && product.colors && product.colors.length) {
        colorsDiv.innerHTML =
          "Colors: " +
          product.colors
            .map(
              (c) =>
                `<span style=\"display:inline-block;width:18px;height:18px;border-radius:50%;background:${c};margin-right:6px;border:1px solid #ccc;\"></span>`
            )
            .join("");
      }
      // Show details section if hidden
      const detailsSection = document.querySelector(".product-details");
      if (detailsSection) detailsSection.style.display = "block";
    });
}
loadProductDetails();

// Add to Cart with style feedback
if (addToCartBtn) {
  addToCartBtn.addEventListener("click", () => {
    const quantity = parseInt(quantityInput.value) || 1;
    const productId = getProductIdFromUrl();
    fetch("js/items.json")
      .then((res) => res.json())
      .then((products) => {
        const product = products.find(
          (p) => p.id == productId || p.id === parseInt(productId)
        );
        if (!product) return;
        // Check if already in cart
        const existing = productDetailCart.find(
          (item) => item.id == product.id
        );
        if (existing) {
          existing.quantity += quantity;
        } else {
          productDetailCart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            image: product.img,
          });
        }
        localStorage.setItem("cart", JSON.stringify(productDetailCart));
        updateCartUI();
        getCartItems(); // Update cart items in popup if function exists
        // Button feedback
        addToCartBtn.textContent = "Added!";
        addToCartBtn.style.background = "#388e3c";
        setTimeout(() => {
          addToCartBtn.textContent = "Add to Cart ";
          addToCartBtn.style.background = "#4CAF50";
          addToCartBtn.innerHTML =
            'Add to Cart <i class="fa-solid fa-cart-plus"></i>';
        }, 1200);
      });
  });
}
