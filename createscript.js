function validateForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var confirmEmail = document.getElementById("confirmEmail").value;
    var mobile = document.getElementById("mobile").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    var passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;

    if (!passwordPattern.test(password)) {
        alert("Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.");
        return false;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }

    if (email !== confirmEmail) {
        alert("Emails do not match.");
        return false;
    }

    // Check if email already exists
    var accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    if (accounts.some(account => account.email === email)) {
        alert("Email already exists.");
        return false;
    }

    // Store account details in localStorage
    accounts.push({ name: name, email: email, mobile: mobile, password: password });
    localStorage.setItem("accounts", JSON.stringify(accounts));
    
    // Log the accounts array to console for debugging
    console.log("Updated accounts:", accounts);

    // Display success message
    var successMessage = document.getElementById("successMessage");
    successMessage.style.display = "block";

    // Redirect to OTP verification page after a delay
    setTimeout(function() {
        window.location.href = "emailotp.html";
    }, 3000); // 3 second delay before redirecting

    return false; // Prevent form submission
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

