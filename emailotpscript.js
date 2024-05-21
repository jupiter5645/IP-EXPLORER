function sendOTP() {
    var email = document.getElementById("email").value;
    var otp = generateOTP(); // Generate a random OTP

    // Store the OTP and its expiration time in localStorage
    var expirationTime = new Date().getTime() + 120000; // 2 minutes in milliseconds
    localStorage.setItem("otp", otp);
    localStorage.setItem("otpExpiration", expirationTime);

    // Send the OTP email
    Email.send({
        SecureToken: "751d672e-3cac-4357-882e-14c9561137bf",
        To: email,
        From: "linuxfedora38jkp@gmail.com",
        Subject: "Email OTP For Verification of Your Account",
        Body: "Your OTP is: " + otp + ". It will expire in 2 minutes."
    }).then(function(message) {
        alert("OTP sent successfully to your given email address. Please check your Inbox and spam folder.");
        document.getElementById("emailForm").style.display = "none";
        document.getElementById("otpForm").style.display = "block";
    }).catch(function(error) {
        alert("Error sending OTP. Please try again. Error: " + JSON.stringify(error));
    });
}

function generateOTP() {
    // Generate a random 6-digit OTP
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function validateOTP() {
    var otp = document.getElementById("otp").value.trim();
    var storedOTP = localStorage.getItem("otp");

    if (otp === storedOTP) {
        alert("OTP verified successfully. Your email is now verified!");
        document.getElementById("otpForm").reset(); // Reset the form
        document.getElementById("emailForm").style.display = "block"; // Show the email form again
        document.getElementById("otpForm").style.display = "none"; // Hide the OTP form

        // Display success message
        var successMessage = document.createElement("div");
        successMessage.textContent = "You will be get a message of creation of your account.";
        successMessage.style.backgroundColor = "#d4edda";
        successMessage.style.padding = "20px";
        successMessage.style.borderRadius = "5px";
        successMessage.style.marginTop = "20px";
        successMessage.style.textAlign = "center";
        document.body.appendChild(successMessage);

        // Redirect to mobile OTP verification page after a delay
        setTimeout(function() {
            window.location.href = "sucess.html";
        }, 3000); // 3 second delay before redirecting

        return false; // Prevent form submission
    } else {
        alert("Invalid OTP. Please try again.");
        return false; // Prevent form submission
    }
}

