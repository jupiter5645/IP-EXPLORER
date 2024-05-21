document.addEventListener("DOMContentLoaded", function() {
    var forgotPasswordLink = document.getElementById("forgotPassword");
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent default link behavior
            redirectToResetEmailOTP();
        });
    }
});


function resetPassword() {
    var email = document.getElementById("email").value.trim().toLowerCase();
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (email === "" || password === "" || confirmPassword === "") {
        alert("Please fill all the fields.");
        return false;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }

    // Update password in local storage
    if (!updatePassword(email, password)) {
        alert("No account found with this email.");
        return false;
    }

    // Enable the "Go back to login" button
    var goBackButton = document.getElementById("goBackButton");
    goBackButton.classList.add("enabled");

    // Display the success message
    var successMessage = document.getElementById("successMessage");
    successMessage.textContent = "Your password has been reset successfully. Congratulations!";
    successMessage.style.display = "block";

    // Disable form submission
    return false;
}

function goBackToLogin() {
    var goBackButton = document.getElementById("goBackButton");
    if (goBackButton.classList.contains("enabled")) {
        // Redirect to the login page
        window.location.href = "signin.html";
    } else {
        alert("Please reset your password first.");
    }
}

function togglePasswordVisibility(inputId) {
    var input = document.getElementById(inputId);
    var icon = input.nextElementSibling;

    if (input.type === "password") {
        input.type = "text";
        icon.textContent = "👁️";
    } else {
        input.type = "password";
        icon.textContent = "👁️";
    }
}

function updatePassword(email, newPassword) {
    var accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    var user = accounts.find(account => account.email.trim().toLowerCase() === email);

    if (user) {
        user.password = newPassword; // Update the password
        localStorage.setItem("accounts", JSON.stringify(accounts)); // Save the updated accounts array back to localStorage
        alert("Password updated successfully");
        return true;
    } else {
        alert("User not found");
        return false;
    }
}

function validateForm() {
    var email = document.getElementById("email").value.trim().toLowerCase();
    var password = document.getElementById("password").value;

    // Get user data from local storage
    var accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    // Check if there is an account with the provided email
    var user = accounts.find(account => account.email.trim().toLowerCase() === email);

    // Debug: Log the retrieved user data
    console.log("Retrieved user:", user);

    // Check if user exists and the password matches
    if (user && user.password === password) {
        console.log("Successful login for user:", user);
        alert("Signing in");

        // Add a delay before redirecting
        setTimeout(function() {
            window.location.href = "publicip.html";
        }, 1000); // Delay in milliseconds (1 second in this case)

        return false; // Prevent default form submission
    } else {
        console.log("Invalid credentials for email:", email);
        alert("Invalid credentials");
        return false;
    }
}

// Check for password reset and update the password
var urlParams = new URLSearchParams(window.location.search);
if (urlParams.has("reset")) {
    var email = urlParams.get("email");
    var newPassword = urlParams.get("password");

    updatePassword(email, newPassword);
}

