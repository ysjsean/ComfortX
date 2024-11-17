function validateName() {
    const name = document.getElementById("name").value;
    const nameError = document.getElementById("nameError");
    nameError.classList.toggle("d-none", /^[a-zA-Z\s]+$/.test(name));
}

function validateEmail() {
    const email = document.getElementById("email").value;
    const emailError = document.getElementById("emailError");
    emailError.classList.toggle("d-none", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
}

function validateSubject() {
    const subject = document.getElementById("subject").value;
    const subjectError = document.getElementById("subjectError");
    subjectError.classList.toggle("d-none", subject !== "");
}

function validateMessage() {
    const message = document.getElementById("message").value;
    const messageError = document.getElementById("messageError");
    messageError.classList.toggle("d-none", message.trim() !== "");
}

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    validateName();
    validateEmail();
    validateSubject();
    validateMessage();

    const nameErrorVisible = !document.getElementById("nameError").classList.contains("d-none");
    const emailErrorVisible = !document.getElementById("emailError").classList.contains("d-none");
    const subjectErrorVisible = !document.getElementById("subjectError").classList.contains("d-none");
    const messageErrorVisible = !document.getElementById("messageError").classList.contains("d-none");

    if (!nameErrorVisible && !emailErrorVisible && !subjectErrorVisible && !messageErrorVisible) {
        const name = document.getElementById("name").value;
        document.getElementById("formMessage").innerHTML = `<p class="text-success">Thank you, ${name}! Your message has been sent.</p>`;
        document.getElementById("contactForm").reset();
        setTimeout(() => { document.getElementById("formMessage").innerHTML = ""; }, 5000);
    }
});