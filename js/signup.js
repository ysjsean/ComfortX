// Initialize subscribed emails list if not already set
if (!localStorage.getItem("subscribedEmails")) {
    localStorage.setItem("subscribedEmails", JSON.stringify([]));
}

// Validation functions remain the same as before
function validateFullName() {
    const name = document.getElementById("name").value;
    const namePattern = /^[a-zA-Z\s]+$/;
    const nameError = document.getElementById("nameError");
    nameError.style.display = namePattern.test(name) ? "none" : "block";
}

function validateEmail() {
    const email = document.getElementById("email").value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailError = document.getElementById("emailError");
    emailError.style.display = emailPattern.test(email) ? "none" : "block";
}

function validatePasswordMatch() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const passwordError = document.getElementById("passwordError");
    passwordError.style.display = password === confirmPassword ? "none" : "block";
}

document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Re-validate all fields on submit
    validateFullName();
    validateEmail();
    validatePasswordMatch();

    // Check if there are any visible validation errors
    if ([...document.querySelectorAll(".error-message")].some(el => el.style.display === "block")) return;

    // Simulate account creation (store in localStorage)
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    localStorage.setItem("user", JSON.stringify({ name: name, email: email, password: password }));

    // Check and update subscription list
    const subscribedEmails = JSON.parse(localStorage.getItem("subscribedEmails")) || [];
    if (!subscribedEmails.includes(email)) {
        subscribedEmails.push(email);
        localStorage.setItem("subscribedEmails", JSON.stringify(subscribedEmails));
    }

    // Display success message
    document.getElementById("successMessage").style.display = "block";

    // Redirect to login page after 2 seconds
    setTimeout(() => window.location.href = "login.html", 2000);
});