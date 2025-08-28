// auth.js - Handles user authentication UI and logic

function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

function setLoggedInUser(user) {
  localStorage.setItem("loggedInUser", JSON.stringify(user));
}

function getLoggedInUser() {
  return JSON.parse(localStorage.getItem("loggedInUser"));
}

function logoutUser() {
  localStorage.removeItem("loggedInUser");
  window.location.reload();
}

function updateAuthUI() {
  const loginBtn = document.querySelector(
    '.loging_signup a[href="login.html"]'
  );
  const signupBtn = document.querySelector(
    '.loging_signup a[href="signup_page.html"]'
  );
  let container = document.querySelector(".loging_signup");
  if (!container) return;
  let logoutBtn = container.querySelector(".logout-btn");
  const user = getLoggedInUser();
  if (user) {
    if (loginBtn) loginBtn.style.display = "none";
    if (signupBtn) signupBtn.style.display = "none";
    if (!logoutBtn) {
      logoutBtn = document.createElement("a");
      logoutBtn.className = "logout-btn";
      logoutBtn.innerHTML =
        'logout <i class="fa-solid fa-right-from-bracket"></i>';
      logoutBtn.style.cursor = "pointer";
      logoutBtn.onclick = logoutUser;
      container.appendChild(logoutBtn);
    } else {
      logoutBtn.style.display = "";
    }
  } else {
    if (loginBtn) loginBtn.style.display = "";
    if (signupBtn) signupBtn.style.display = "";
    if (logoutBtn) logoutBtn.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", updateAuthUI);
