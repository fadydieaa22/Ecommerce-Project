document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#checkoutForm");
  const orderSummary = document.querySelector(".order-summary");

  // Load and display cart items
  function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;
    let itemsHtml = "";

    cart.forEach((item) => {
      const itemTotal = item.price * (item.quantity || 1);
      total += itemTotal;
      itemsHtml += `
        <div class="cart-item">
          <img src="${item.img || item.image}" alt="${
        item.name
      }" class="item-image">
          <div class="item-details">
            <h4>${item.name}</h4>
            <p>Quantity: ${item.quantity || 1}</p>
            <p class="item-price">$${item.price} × ${
        item.quantity || 1
      } = $${itemTotal}</p>
          </div>
        </div>
      `;
    });

    // Update order summary HTML
    const summaryHtml = `
      <h2>Order Summary</h2>
      <div class="cart-items">
        ${itemsHtml}
      </div>
      <div class="order-total">
        <h3>Total: $${total}</h3>
      </div>
    `;

    if (orderSummary) {
      orderSummary.innerHTML = summaryHtml;
    }

    return cart.length > 0; // Return true if cart has items
  }

  // Initialize cart display
  if (!displayCartItems()) {
    // If cart is empty, redirect to home page
    window.location.href = "index.html";
    return;
  }

  // Handle form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate form
    const email = form.querySelector('input[type="email"]').value;
    const name = form.querySelector('input[type="text"]').value;
    const address = form.querySelector(
      'input[placeholder="enter your address"]'
    ).value;
    const phone = form.querySelector(
      'input[placeholder="enter your phone"]'
    ).value;

    if (!email || !name || !address || !phone) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all fields!",
      });
      return;
    }

    // Show success message with SweetAlert
    Swal.fire({
      icon: "success",
      title: "Order Placed Successfully!",
      text: "Thank you for your order. We'll process it right away.",
      showConfirmButton: true,
      confirmButtonText: "Continue Shopping",
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear cart
        localStorage.setItem("cart", "[]");
        // Redirect to home page
        window.location.href = "index.html";
      }
    });
  });
});
