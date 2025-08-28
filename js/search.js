// search.js - Handles search bar filtering for homepage and all_products
function setupSearchBar(productRenderCallback) {
  const searchForm = document.querySelector("form.search");
  const searchInput = searchForm
    ? searchForm.querySelector('input[type="search"]')
    : null;
  if (!searchForm || !searchInput) return;
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const query = searchInput.value.trim().toLowerCase();
    if (!query) return;
    fetch("js/items.json")
      .then((res) => res.json())
      .then((products) => {
        productRenderCallback(products, query);
      });
  });
}

// For homepage (index.html)
if (document.getElementById("swiper_items_sale")) {
  setupSearchBar(function (products, query) {
    const productSections = [
      document.getElementById("swiper_items_sale"),
      document.getElementById("other_product_swiper"),
      document.getElementById("other_product_swiper2"),
    ];
    productSections.forEach((section) => {
      if (!section) return;
      section.innerHTML = "";
      products
        .filter((product) => product.name.toLowerCase().includes(query))
        .forEach((product) => {
          section.innerHTML += `
          <div class="product swiper-slide">
            <div class="icons">
              <span><i onclick ="addToCart(${
                product.id
              }, this)" class="fa-solid fa-cart-plus"></i></span>
              <span><i class="fa-solid fa-heart"></i></span>
              <span><i class="fa-solid fa-share"></i></span>
            </div>
            <div class="img_product">
              <a href="product-details.html?id=${product.id}"><img src="${
            product.img
          }" alt=""></a>
              <a href="product-details.html?id=${
                product.id
              }"><img class="img_hover" src="${product.img_hover}" alt=""></a>
            </div>
            <h3 class="name_product"><a href="product-details.html?id=${
              product.id
            }">${product.name}</a></h3>
            <div class="stars">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
            </div>
            <div class="price">
              <p><span>$${product.price}</span></p>
              ${
                product.old_price
                  ? `<p class="old_price">$${product.old_price}</p>`
                  : ""
              }
            </div>
          </div>
        `;
        });
    });
  });
}

// For all_products.html
if (document.getElementById("products_dev")) {
  setupSearchBar(function (products, query) {
    const productsDev = document.getElementById("products_dev");
    productsDev.innerHTML = "";
    products
      .filter((product) => product.name.toLowerCase().includes(query))
      .forEach((product) => {
        const old_price_pargrahp = product.old_price
          ? ` <p class="old_price">$${product.old_price}</p>`
          : "";
        const percent_disc_div = product.old_price
          ? `  <span class="sale_present">%${Math.floor(
              ((product.old_price - product.price) / product.old_price) * 100
            )}</span>`
          : "";
        productsDev.innerHTML += `
        <div class="product swiper-slide">
          <div class="icons">
            <span><i onclick ="addToCart(${product.id}, this)" class="fa-solid fa-cart-plus"></i></span>
            <span><i class="fa-solid fa-heart"></i></span>
            <span><i class="fa-solid fa-share"></i></span>
          </div>
          ${percent_disc_div}
          <div class="img_product">
            <a href="product-details.html?id=${product.id}"><img src="${product.img}" alt=""></a>
            <a href="product-details.html?id=${product.id}"><img class="img_hover" src="${product.img_hover}" alt=""></a>
          </div>
          <h3 class="name_product"><a href="product-details.html?id=${product.id}">${product.name}</a></h3>
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
      });
  });
}
