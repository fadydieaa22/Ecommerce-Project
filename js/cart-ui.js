// Add cart styles dynamically
const cartStyles = `
  .items_in_cart {
    max-height: calc(100vh - 280px);
    overflow-y: auto;
    padding: 10px;
  }
  
  .items_in_cart::-webkit-scrollbar {
    width: 5px;
  }
  
  .items_in_cart::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 5px;
  }
  
  .cart-item {
    display: grid;
    grid-template-columns: 60px 1fr 30px;
    gap: 10px;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
    background: #f8f9fa;
    border-radius: 8px;
    position: relative;
  }
  
  .cart-item img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 6px;
  }
  
  .cart-item .item-details {
    overflow: hidden;
  }
  
  .cart-item h4 {
    margin: 0 0 5px;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .price-qty {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .price-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .unit-price {
    font-size: 12px;
    color: #666;
    margin: 0;
  }

  .total-price {
    font-weight: 600;
    color: var(--main-color);
    margin: 0;
    font-size: 14px;
    transition: transform 0.2s ease;
  }
  
  .quantity {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #f0f0f0;
    padding: 4px;
    border-radius: 6px;
    width: fit-content;
  }
  
  .qty-btn {
    width: 24px;
    height: 24px;
    border: none;
    background: white;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #666;
    transition: all 0.2s ease;
  }
  
  .qty-btn:hover:not([style*="opacity"]) {
    background: var(--main-color);
    color: white;
  }

  .qty {
    min-width: 24px;
    text-align: center;
    font-weight: 500;
    transition: transform 0.2s ease;
  }
  
  .remove-item {
    border: none;
    background: none;
    color: #ff4444;
    cursor: pointer;
    padding: 5px;
    opacity: 0.6;
    transition: opacity 0.3s;
  }
  
  .remove-item:hover {
    opacity: 1;
  }
  
  .empty-cart {
    text-align: center;
    color: #666;
    padding: 20px;
  }
  
  .bottom_Cart {
    padding: 15px;
    background: #fff;
    border-top: 1px solid #eee;
    margin-top: auto;
  }
`;

// Add styles to document
if (!document.getElementById("cartStyles")) {
  const styleSheet = document.createElement("style");
  styleSheet.id = "cartStyles";
  styleSheet.textContent = cartStyles;
  document.head.appendChild(styleSheet);
}

// Cart management functions
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    // If item exists, increment quantity
    existingItem.quantity = (existingItem.quantity || 1) + 1;

    // Show success toast
    Swal.fire({
      toast: true,
      icon: "success",
      title: "Item quantity increased!",
      text: `${product.name} (${existingItem.quantity}x)`,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      showClass: {
        popup: "animate__animated animate__fadeInRight",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutRight",
      },
    });
  } else {
    // If item is new, add it with quantity 1
    cart.push({
      ...product,
      quantity: 1,
    });

    // Show success toast
    Swal.fire({
      toast: true,
      icon: "success",
      title: "Item added to cart!",
      text: product.name,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      showClass: {
        popup: "animate__animated animate__fadeInRight",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutRight",
      },
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

// Keep cart UI in sync on all pages
function updateCartUI() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");
  const cartTotalPopup = document.getElementById("cart-total-popup");
  const countItemCart = document.querySelector(".count_item_cart");
  const itemsInCart = document.querySelector(".items_in_cart");

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  // Update cart indicators
  if (cartCount) cartCount.textContent = totalItems;
  if (cartTotal) cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
  if (cartTotalPopup) cartTotalPopup.textContent = `$${totalPrice.toFixed(2)}`;
  if (countItemCart)
    countItemCart.textContent = `(${totalItems} Item${
      totalItems !== 1 ? "s" : ""
    } in Cart)`;

  // Update cart items display
  if (itemsInCart) {
    if (cart.length === 0) {
      itemsInCart.innerHTML = `
        <div class="empty-cart">
          <i class="fa-solid fa-cart-plus" style="font-size: 3em; color: #ddd; margin-bottom: 15px;"></i>
          <p>Your cart is empty</p>
        </div>
      `;
    } else {
      const cartHTML = cart
        .map((item) => {
          const itemTotal = item.price * (item.quantity || 1);
          return `
          <div class="cart-item" data-id="${item.id}">
            <img 
              src="${item.img || item.image}" 
              alt="${item.name}" 
              onerror="this.src='img/product/default.jpg'"
              loading="lazy"
            >
            <div class="item-details">
              <h4 title="${item.name}">${item.name}</h4>
              <div class="price-qty">
                <div class="price-info">
                  <p class="unit-price">$${item.price.toFixed(2)} each</p>
                  <p class="total-price">Total: $${itemTotal.toFixed(2)}</p>
                </div>
                <div class="quantity">
                  <button 
                    class="qty-btn minus" 
                    onclick="event.preventDefault(); event.stopPropagation(); updateQuantity(${
                      item.id
                    }, -1)"
                    ${item.quantity <= 1 ? 'style="opacity: 0.5;"' : ""}
                  >
                    <i class="fa-solid fa-minus"></i>
                  </button>
                  <span class="qty">${item.quantity || 1}</span>
                  <button 
                    class="qty-btn plus" 
                    onclick="event.preventDefault(); event.stopPropagation(); updateQuantity(${
                      item.id
                    }, 1)"
                  >
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <button 
              class="remove-item" 
              onclick="event.preventDefault(); event.stopPropagation(); removeFromCart(${
                item.id
              })"
              title="Remove item"
            >
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        `;
        })
        .join("");
    }
  }
}

// Handle cart item quantity updates
function updateQuantity(itemId, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const itemIndex = cart.findIndex((item) => item.id === itemId);

  if (itemIndex !== -1) {
    const newQuantity = (cart[itemIndex].quantity || 1) + change;

    if (newQuantity < 1) {
      // If quantity would go below 1, ask for confirmation to remove
      Swal.fire({
        title: "Remove Item?",
        text: "Do you want to remove this item from your cart?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#ff4444",
        cancelButtonColor: "#fcb703",
        confirmButtonText: "Yes, remove it",
        cancelButtonText: "No, keep it",
      }).then((result) => {
        if (result.isConfirmed) {
          removeFromCart(itemId);
        }
      });
      return;
    }

    // Update quantity
    cart[itemIndex].quantity = newQuantity;
    localStorage.setItem("cart", JSON.stringify(cart));

    // Animate the quantity change
    const qtyElement = document.querySelector(`[data-id="${itemId}"] .qty`);
    const priceElement = document.querySelector(
      `[data-id="${itemId}"] .total-price`
    );

    if (qtyElement && priceElement) {
      // Flash animation
      qtyElement.style.transform = "scale(1.2)";
      priceElement.style.transform = "scale(1.1)";

      setTimeout(() => {
        qtyElement.style.transform = "";
        priceElement.style.transform = "";
      }, 200);
    }

    updateCartUI();
  }
}

// Handle removing items from cart
function removeFromCart(itemId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const itemToRemove = cart.find((item) => item.id === itemId);

  if (itemToRemove) {
    // Animate item removal
    const itemElement = document.querySelector(`[data-id="${itemId}"]`);
    if (itemElement) {
      itemElement.style.transform = "translateX(100%)";
      itemElement.style.opacity = "0";

      setTimeout(() => {
        // Remove item from cart
        cart = cart.filter((item) => item.id !== itemId);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartUI();

        // Show notification
        Swal.fire({
          toast: true,
          icon: "success",
          title: "Item removed from cart",
          text: itemToRemove.name,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      }, 300);
    }
  }
}

// Handle checkout process
document.addEventListener("click", function (e) {
  if (
    e.target.matches(".btn_cart:not(.trans_bg)") ||
    e.target.closest(".btn_cart:not(.trans_bg)")
  ) {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      Swal.fire({
        icon: "info",
        title: "Empty Cart",
        text: "Your cart is empty. Add some items before checking out!",
        confirmButtonColor: "#fcb703",
        customClass: {
          confirmButton: "swal2-confirm",
        },
      });
      return;
    }

    const totalItems = cart.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0
    );
    const totalAmount = cart.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );

    Swal.fire({
      icon: "success",
      title: "Order Placed Successfully!",
      html: `
        <div style="text-align:left; padding:20px; background:#f8f9fa; border-radius:8px; margin:20px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <div style="margin-bottom:15px; padding-bottom:15px; border-bottom:1px dashed #ddd;">
            <p style="margin:5px 0; font-size:16px;">
              <i class="fa-solid fa-box-open" style="color:#fcb703; margin-right:8px;"></i>
              Total Items: ${totalItems}
            </p>
            <p style="margin:5px 0; font-size:18px; font-weight:bold; color:#fcb703;">
              <i class="fa-solid fa-receipt" style="margin-right:8px;"></i>
              Total Amount: $${totalAmount.toFixed(2)}
            </p>
          </div>
          <p style="margin:0; text-align:center; color:#28a745;">
            <i class="fa-solid fa-circle-check" style="margin-right:8px;"></i>
            Thank you for your purchase!
          </p>
        </div>
      `,
      confirmButtonText: "Continue Shopping",
      confirmButtonColor: "#fcb703",
      allowOutsideClick: false,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear cart
        localStorage.setItem("cart", "[]");
        // Update UI
        updateCartUI();
        // Close cart popup if open
        if (typeof close_cart === "function") {
          close_cart();
        }
      }
    });
  }
});
document.addEventListener("DOMContentLoaded", updateCartUI);
window.addEventListener("storage", updateCartUI);
