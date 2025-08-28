document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let username = document.getElementById("username").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let confirmPassword = document.getElementById("confirmPassword").value.trim();
  // reset errors
  document.getElementById("usernameError").innerText = "";
  document.getElementById("emailError").innerText = "";
  document.getElementById("passwordError").innerText = "";
  document.getElementById("confirmPasswordError").innerText = "";
  let valid = true;

  if (username.length < 3) {
    document.getElementById("usernameError").innerText =
      "Username must be at least 3 characters";
    valid = false;
  }

  let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    document.getElementById("emailError").innerText = "Enter a valid email";
    valid = false;
  }

  if (password.length < 6) {
    document.getElementById("passwordError").innerText =
      "Password must be at least 6 characters";
    valid = false;
  }

  if (password !== confirmPassword) {
    document.getElementById("confirmPasswordError").innerText =
      "Passwords do not match";
    valid = false;
  }

  if (valid) {
    // ✅ Save data to localStorage
    let user = {
      username: username,
      email: email,
      password: password,
    };

    localStorage.setItem("user", JSON.stringify(user));
    alert("✅ Registration Successful! Now you can log in.");

    // redirect to login page
    window.location.href = "index.html";
  }
});
