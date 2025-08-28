// Auto swiper for main slider (vanilla JS)
document.addEventListener("DOMContentLoaded", function () {
  var slider = document.querySelector(".slider-wrapper");
  if (!slider) return;
  var slides = slider.children;
  var current = 0;
  function showSlide(idx) {
    slider.style.transform = `translateX(-${idx * 100}%)`;
  }
  setInterval(function () {
    current = (current + 1) % slides.length;
    showSlide(current);
  }, 4000);
});
(function () {
  const slider = document.querySelector("#swiper_items_sale");
  const track = slider; // wrapper of slides
  const nextBtn = document.querySelector(".slide_sale .swiper-button-next");
  const prevBtn = document.querySelector(".slide_sale .swiper-button-prev");
  const slides = track.children;
  let currentIndex = 0;
  const slidesPerView = 3; // number of visible slides

  function updateSlider() {
    if (slides.length <= slidesPerView) {
      currentIndex = 0;
      track.style.transform = `translateX(0%)`;
    } else {
      if (currentIndex > slides.length - slidesPerView) {
        currentIndex = slides.length - slidesPerView;
      }
      if (currentIndex < 0) {
        currentIndex = 0;
      }
      const offset = -(currentIndex * (100 / slidesPerView));
      track.style.transform = `translateX(${offset}%)`;
      track.style.display = "flex"; // keep slides inline
      track.style.transition = "transform 0.5s ease";
    }
  }

  nextBtn.addEventListener("click", () => {
    if (currentIndex < slides.length - slidesPerView) {
      currentIndex++;
    } else {
      currentIndex = 0; // loop back
    }
    updateSlider();
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = slides.length - slidesPerView; // loop to end
    }
    updateSlider();
  });

  // autoplay
  setInterval(() => {
    nextBtn.click();
  }, 3000);

  // initialize
  updateSlider();
})();

document.querySelectorAll(".product_swip").forEach((slider) => {
  const track = slider.querySelector(".products"); // wrapper of slides
  const nextBtn = slider.querySelector(".swiper-button-next");
  const prevBtn = slider.querySelector(".swiper-button-prev");
  const slides = track.children;
  let currentIndex = 0;
  const slidesPerView = 4; // number of slides visible at once

  function updateSlider() {
    if (slides.length <= slidesPerView) {
      currentIndex = 0;
      track.style.transform = `translateX(0%)`;
    } else {
      if (currentIndex > slides.length - slidesPerView) {
        currentIndex = slides.length - slidesPerView;
      }
      if (currentIndex < 0) {
        currentIndex = 0;
      }
      const offset = -(currentIndex * (80 / slidesPerView));
      track.style.transform = `translateX(${offset}%)`;
      track.style.display = "flex"; // make them inline
      track.style.transition = "transform 0.5s ease";
    }
  }

  nextBtn.addEventListener("click", () => {
    if (currentIndex < slides.length - slidesPerView) {
      currentIndex++;
    } else {
      currentIndex = 0; // loop back
    }
    updateSlider();
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 8) {
      currentIndex--;
    } else {
      currentIndex = slides.length - slidesPerView; // loop to end
    }
    updateSlider();
  });

  // optional autoplay
  setInterval(() => {
    nextBtn.click();
  }, 3000);

  // init position
  updateSlider();
});
