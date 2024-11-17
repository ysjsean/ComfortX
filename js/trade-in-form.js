
document.getElementById("tradeInForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get the value of the Condition field
    const condition = document.getElementById("condition").value;

    // Check if the condition is "Poor"
    if (condition === "Poor") {
        // Display a rejection message
        document.getElementById("confirmationMessage").innerHTML = `
            We're sorry, but items in poor condition are not eligible for trade-in discounts.
        `;
        document.getElementById("confirmationMessage").style.display = "block";
        document.getElementById("confirmationMessage").style.color = "red"; // Optional: make the message red for emphasis
        document.getElementById("confirmationMessage").style.textAlign = "center"; 
        document.getElementById("confirmationMessage").style.border = "1px solid red"; 
        document.getElementById("confirmationMessage").style.marginBottom = "20px"; 

        // Optionally clear the message after a few seconds
        setTimeout(function() {
            document.getElementById("confirmationMessage").style.display = "none";
        }, 10000);

        return; // Exit the function, preventing further code execution
    }

    // Generate a random discount code if the condition is acceptable
    const discountCode = "DISCOUNT-" + Math.random().toString(36).substring(2, 10).toUpperCase();

    // Display confirmation message with the discount code
    document.getElementById("confirmationMessage").innerHTML = `
        Thank you for your submission! Here is your discount code:
        <strong>${discountCode}</strong>
    `;
    document.getElementById("confirmationMessage").style.display = "block";
    document.getElementById("confirmationMessage").style.color = "green"; // Optional: make the message green for success
    document.getElementById("confirmationMessage").style.border = "1px solid green";
    document.getElementById("confirmationMessage").style.marginBottom = "20px"; 
    document.getElementById("confirmationMessage").style.padding = "5%"; 

    // Optionally store the discount code in localStorage for later reference
    localStorage.setItem("discountCode", discountCode);

    // Clear the form
    document.getElementById("tradeInForm").reset();

    // Hide the confirmation message after a few seconds (optional)
    setTimeout(function() {
        document.getElementById("confirmationMessage").style.display = "none";
    }, 10000);
});
