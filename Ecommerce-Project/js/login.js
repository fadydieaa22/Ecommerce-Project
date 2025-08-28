// login.js - Handles login form logic

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value.trim();
    const password = form.querySelector('input[type="password"]').value.trim();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.email !== email || user.password !== password) {
      alert("Invalid email or password!");
      return;
    }
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    alert("Login successful!");
    window.location.href = "index.html";
  });
});
