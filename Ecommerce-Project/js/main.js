// Slider functionality
document.addEventListener("DOMContentLoaded", function () {
  const sliderWrapper = document.querySelector(".slider-wrapper");
  const slides = document.querySelectorAll(".slide");
  const paginationContainer = document.querySelector(".slider-pagination");
  let currentSlide = 0;
  const autoSlideInterval = 4000; // Change slide every 4 seconds

  // Make sure we have slides
  if (!slides.length) return;

  // Clear existing pagination dots and create new ones
  paginationContainer.innerHTML = ""; // Clear existing dots

  // Only create 3 dots
  for (let index = 0; index < 3; index++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      clearInterval(slideInterval);
      goToSlide(index);
      slideInterval = setInterval(nextSlide, autoSlideInterval);
    });
    paginationContainer.appendChild(dot);
  }

  // Function to move to a specific slide
  function goToSlide(slideIndex) {
    // Ensure we stay within the bounds of 0-2 (3 slides)
    if (slideIndex < 0) slideIndex = 2;
    if (slideIndex > 2) slideIndex = 0;

    currentSlide = slideIndex;
    sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update pagination dots - only update the first 3 dots
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      if (index < 3) {
        // Only process first 3 dots
        dot.classList.remove("active");
      }
    });
    if (dots[currentSlide]) {
      dots[currentSlide].classList.add("active");
    }
  }

  // Function to move to the next slide
  function nextSlide() {
    const nextIndex = currentSlide >= 2 ? 0 : currentSlide + 1;
    goToSlide(nextIndex);
  }

  // Function to move to the previous slide
  function prevSlide() {
    const prevIndex = currentSlide <= 0 ? 2 : currentSlide - 1;
    goToSlide(prevIndex);
  }

  // Start auto-sliding
  let slideInterval = setInterval(nextSlide, autoSlideInterval);

  // Pause auto-sliding when mouse is over the slider or pagination
  const sliderContainer = document.querySelector(".slider-container");
  sliderContainer.addEventListener("mouseenter", () => {
    clearInterval(slideInterval);
  });

  // Resume auto-sliding when mouse leaves the slider or pagination
  sliderContainer.addEventListener("mouseleave", () => {
    slideInterval = setInterval(nextSlide, autoSlideInterval);
  });

  // Add keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      clearInterval(slideInterval);
      prevSlide();
      slideInterval = setInterval(nextSlide, autoSlideInterval);
    } else if (e.key === "ArrowRight") {
      clearInterval(slideInterval);
      nextSlide();
      slideInterval = setInterval(nextSlide, autoSlideInterval);
    }
  });
});

// open & close Cart
var cart = document.querySelector(".cart");

function open_cart() {
  cart.classList.add("active");
}
function close_cart() {
  cart.classList.remove("active");
}

// open & close menu

var menu = document.querySelector("#menu");

function open_menu() {
  menu.classList.add("active");
}
function close_menu() {
  menu.classList.remove("active");
}

//change item image

let bigImage = document.getElementById("bigImg");

function ChangeItemImage(img) {
  bigImage.src = img;
}

/* add itmes in cart */

var all_products_json;
var items_in_cart = document.querySelector(".items_in_cart");
let product_cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(product_cart));
}

function addToCart(id, btn) {
  // Check if product already in cart by id
  const product = all_products_json.find((p) => p.id == id);
  const existing = product_cart.find((item) => item.id == id);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    product_cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  if (btn) {
    btn.classList.add("active");
    setTimeout(() => {
      btn.classList.remove("active");
    }, 500);
  }
  getCartItems();
  if (typeof updateCartUI === "function") updateCartUI();
}

let count_item = document.querySelector(".count_item");
let count_item_cart = document.querySelector(".count_item_cart");
let price_cart_total = document.querySelector(".price_cart_total");
let price_cart_Head = document.querySelector(".price_cart_Head");

function getCartItems() {
  // Always reload from localStorage in case another tab changed it
  product_cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total_price = 0;
  let total_count = 0;
  let items_c = "";
  for (let i = 0; i < product_cart.length; i++) {
    const item = product_cart[i];
    items_c += `
      <div class="item_cart">
        <img src="${item.img || item.image}" alt="">
        <div class="content">
          <h4>${item.name}</h4>
          <p class="price_cart">$${item.price} x ${item.quantity}</p>
        </div>
        <button onClick="remove_from_cart(${i})" class="delete_item"><i class="fa-solid fa-trash-can"></i></button>
      </div>
    `;
    total_price += item.price * (item.quantity || 1);
    total_count += item.quantity || 1;
  }
  if (items_in_cart) items_in_cart.innerHTML = items_c;
  if (price_cart_Head) price_cart_Head.innerHTML = "$" + total_price;
  if (count_item) count_item.innerHTML = total_count;
  if (count_item_cart)
    count_item_cart.innerHTML = ` (${total_count}Item in Cart)`;
  if (price_cart_total) price_cart_total.innerHTML = "$" + total_price;

  // Reset all Add to Cart buttons
  let addToCartButtons = document.querySelectorAll(".fa-cart-plus");
  addToCartButtons.forEach((btn) => btn.classList.remove("active"));
  // Set active for products in cart
  product_cart.forEach((product) => {
    addToCartButtons.forEach((btn) => {
      if (
        btn.getAttribute("onclick") &&
        btn.getAttribute("onclick").includes(`addToCart(${product.id}`)
      ) {
        btn.classList.add("active");
      }
    });
  });
}

function remove_from_cart(index) {
  product_cart = JSON.parse(localStorage.getItem("cart")) || [];
  product_cart.splice(index, 1);
  saveCart();
  getCartItems();
  if (typeof updateCartUI === "function") updateCartUI();
  let addToCartButtons = document.querySelectorAll(".fa-cart-plus");
  for (let i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].classList.remove("active");
    product_cart.forEach((product) => {
      if (product.id == i) {
        addToCartButtons[i].classList.add("active");
      }
    });
  }
}

// On page load, render cart and update UI
getCartItems();
if (typeof updateCartUI === "function") updateCartUI();

// Listen for storage changes to sync cart in real time
window.addEventListener("storage", function (e) {
  if (e.key === "cart") {
    getCartItems();
    if (typeof updateCartUI === "function") updateCartUI();
  }
});

// back_to_top js

let back_to_top = document.querySelector(".back_to_top");
if (back_to_top) {
  back_to_top.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
