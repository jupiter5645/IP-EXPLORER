document.addEventListener("DOMContentLoaded", function() {
    var user = JSON.parse(localStorage.getItem("user")) || {};
    if (user.email && user.password) {
        // Auto-fill email and password fields if user details are stored
        document.getElementById("email").value = user.email;
        document.getElementById("password").value = user.password;
    }
});

function validateForm() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Get user data from localStorage
    var storedUser = JSON.parse(localStorage.getItem("user")) || {};

    // Check if user exists and the password matches
    if (storedUser.email === email && storedUser.password === password) {
        alert("Signing in");
        return true;
    } else {
        alert("Invalid credentials");
        return false;
    }
}

