// Search functionality for index.html
document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.querySelector("form.search");
  if (!searchForm || !searchInput) return;
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const query = searchInput.value.trim().toLowerCase();
    if (!query) return;
    // Filter all products on the homepage
    fetch("js/items.json")
      .then((res) => res.json())
      .then((products) => {
        // Find all product containers
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
              // Render product card (simple version)
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
                                    <a href="product-details.html?id=${
                                      product.id
                                    }"><img src="${product.img}" alt=""></a>
                                    <a href="product-details.html?id=${
                                      product.id
                                    }"><img class="img_hover" src="${
                product.img_hover
              }" alt=""></a>
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
  });
});
fetch("js/items.json")
  .then((response) => response.json())
  .then((data) => {
    const swiper_items_sale = document.getElementById("swiper_items_sale");

    const other_product_swiper = document.getElementById(
      "other_product_swiper"
    );
    const other_product_swiper2 = document.getElementById(
      "other_product_swiper2"
    );

    all_products_json = data;

    data.forEach((product) => {
      if (product.old_price) {
        const percent_disc = Math.floor(
          ((product.old_price - product.price) / product.old_price) * 100
        );
        swiper_items_sale.innerHTML += `
                        
                        <div class="product swiper-slide">


                        <div class="icons">
                            <span><i onclick ="addToCart(${product.id}, this)" class="fa-solid fa-cart-plus"></i></span>
                            <span><i class="fa-solid fa-heart"></i></span>
                            <span><i class="fa-solid fa-share"></i></span>
                        </div>
                        <span class="sale_present">%${percent_disc}</span>

                        <div class="img_product">
                            <img src="${product.img}" alt="">
                            <img class="img_hover" src="${product.img_hover}" alt="">
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
                            <p class="old_price">$${product.old_price}</p>
                        </div>
                    </div>
                        
                        `;
      }
    });

    data.forEach((product) => {
      other_product_swiper.innerHTML += `
                        
                        <div class="product swiper-slide">


                        <div class="icons">
                            <span><i onclick ="addToCart(${product.id}, this)" class="fa-solid fa-cart-plus"></i></span>
                            <span><i class="fa-solid fa-heart"></i></span>
                            <span><i class="fa-solid fa-share"></i></span>
                        </div>

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
                        </div>
                    </div>
                        
                        `;
    });

    data.forEach((product) => {
      other_product_swiper2.innerHTML += `
                    
                    <div class="product swiper-slide">


                    <div class="icons">
                        <span><i onclick ="addToCart(${product.id}, this)" class="fa-solid fa-cart-plus"></i></span>
                        <span><i class="fa-solid fa-heart"></i></span>
                        <span><i class="fa-solid fa-share"></i></span>
                    </div>

                    <div class="img_product">
                        <a href="product-details.html?id=${product.id}"><img src="${product.img}" alt=""></a>
                        <a href="product-details.html?id=${product.id}"><img class="img_hover" src="${product.img_hover}" alt=""></a>
                    </div>
                    
                    <h3 class="name_product"><a href="#">${product.name}</a></h3>

                    <div class="stars">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>

                    <div class="price">
                        <p><span>$${product.price}</span></p>
                    </div>
                </div>
                    
                    `;
    });
  });
