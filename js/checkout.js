new Cleave('#cardNumber', { creditCard: true });
new Cleave('#expiryDate', { date: true, datePattern: ['m', 'y'] });

function validateCardNumber() {
    const cardNumber = document.getElementById("cardNumber").value.replace(/\s+/g, '');
    const cardNumberError = document.getElementById("cardNumber_error");

    if (cardNumber.length < 13 || cardNumber.length > 16) {
        cardNumberError.textContent = "Please enter a valid card number.";
        return false;
    } else {
        cardNumberError.textContent = "";
        return true;
    }
}

function validateExpiryDate() {
    const expiryDateInput = document.getElementById("expiryDate").value;
    const expiryDateError = document.getElementById("expiryDate_error");

    // Ensure correct format MM/YY
    const match = expiryDateInput.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
    if (!match) {
        expiryDateError.textContent = "Invalid expiry date (MM/YY).";
        return false;
    }

    // Extract month and year
    const month = parseInt(match[1], 10);
    const year = parseInt("20" + match[2], 10); // Convert YY to 20YY

    // Get the current month and year
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // JavaScript months are 0-based
    const currentYear = today.getFullYear();

    // Check if the expiry date is in the past
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
        expiryDateError.textContent = "Card has expired.";
        return false;
    }

    expiryDateError.textContent = ""; // Clear any previous error
    return true;
}


function validateCVV() {
    const cvv = document.getElementById("cvv").value;
    const cvvError = document.getElementById("cvv_error");

    if (!/^\d{3}$/.test(cvv)) {
        cvvError.textContent = "Please enter a valid 3-digit CVV.";
        return false;
    } else {
        cvvError.textContent = "";
        return true;
    }
}

// Discount codes (for demonstration)
const discountCodes = {
    SAVE10: 0.1, // 10% discount
    FREESHIP: 0, // Placeholder for free shipping
};

// Render the Order Summary
function renderOrderSummary() {
    const orderItemsContainer = document.getElementById("order-items");
    const subtotalElement = document.getElementById("subtotal");
    const discountElement = document.getElementById("discount");
    const totalElement = document.getElementById("total");

    if (cart.length === 0) {
        orderItemsContainer.innerHTML = `<p class="text-muted text-center">Your cart is empty.</p>`;
        subtotalElement.textContent = `$0.00`;
        discountElement.textContent = `-$0.00`;
        totalElement.textContent = `$0.00`;
        return;
    }

    let subtotal = 0;

    // Generate HTML for each cart item
    let itemsHTML = cart.map(item => {
        const itemTotal = item.price * item.qty;
        subtotal += itemTotal;

        return `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="image-container">
                    <img src="./assets/images/black_mouse.png" 
                        alt="${item.name}" 
                        class="img-fluid rounded" 
                        style="max-width: 100px; height: auto;">
                </div>
                <div class="flex-grow-1 ms-3">
                    <h5>${item.name}</h5>
                    <p class="text-muted mb-1">Includes: ${item.gifts.join(", ")}</p>
                    <p class="text-muted mb-1">Qty: ${item.qty}</p>
                    <p class="text-success mb-0">In Stock</p>
                </div>
                <p class="fw-bold">$${itemTotal.toFixed(2)}</p>
            </div>
        `;
    }).join("");

    // Populate the container with items
    orderItemsContainer.innerHTML = itemsHTML;

    // Calculate totals
    const discountCode = localStorage.getItem("appliedDiscountCode");
    const discount = discountCode ? discountCodes[discountCode.toUpperCase()] || 0 : 0;
    const discountValue = subtotal * discount;
    const total = subtotal - discountValue;

    // Update totals
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    discountElement.textContent = `-$${discountValue.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

// Initialize Order Summary
document.addEventListener("DOMContentLoaded", renderOrderSummary);


let selectedPaymentMethod = null; // To store the selected payment method

// Highlight the selected payment method
function selectPaymentMethod(button) {
    const allButtons = document.querySelectorAll(".payment-method");
    allButtons.forEach(btn => btn.classList.remove("active")); // Remove active class
    button.classList.add("active"); // Add active class to the selected button
    selectedPaymentMethod = button.getAttribute("data-payment-method");
}

// Validate and apply discount code
function validateDiscountCode() {
    const enteredCode = document.getElementById("discountCodeInput").value.trim(); // Code user entered
    const storedCode = localStorage.getItem("discountCode"); // Retrieve generated code
    const discountMessage = document.getElementById("discountMessage");

    // Check if the trade-in code exists
    if (!storedCode) {
        discountMessage.textContent = "No discount code available. Please complete a trade-in to receive one.";
        discountMessage.classList.add("text-danger");
        discountMessage.classList.remove("text-success");
        updateTotals(); // Recalculate totals without discount
        return false;
    }

    if (!enteredCode) {
        discountMessage.textContent = "Please enter a discount code.";
        discountMessage.classList.add("text-danger");
        discountMessage.classList.remove("text-success");
        updateTotals(); // Recalculate totals without discount
        return false;
    }

    if (enteredCode === storedCode) {
        discountMessage.textContent = "Discount code applied successfully!";
        discountMessage.classList.remove("text-danger");
        discountMessage.classList.add("text-success");
        localStorage.setItem("appliedDiscountCode", enteredCode); // Save the validated code
        updateTotals(); // Recalculate totals with discount
        return true;
    } else {
        discountMessage.textContent = "Invalid discount code. Please try again.";
        discountMessage.classList.add("text-danger");
        discountMessage.classList.remove("text-success");
        updateTotals(); // Recalculate totals without discount
        return false;
    }
}

// Render order summary and calculate totals
function calculateTotals() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let subtotal = 0;

    // Calculate the subtotal
    cart.forEach(item => {
        subtotal += item.price * item.qty;
    });

    // Check for applied discount code and stored trade-in code
    const appliedDiscountCode = localStorage.getItem("appliedDiscountCode");
    const storedDiscountCode = localStorage.getItem("discountCode");

    // Only apply the discount if both codes exist and match
    let discountRate = 0;
    if (appliedDiscountCode && storedDiscountCode && appliedDiscountCode === storedDiscountCode) {
        discountRate = 0.2; // Example: 20% discount
    }

    const discount = discountRate === 0 ? 0 : subtotal * discountRate;
    const total = subtotal - discount;

    return { subtotal, discount, total, appliedDiscountCode };
}

// Dynamically update the UI with recalculated totals
function updateTotals() {
    const { subtotal, discount, total, appliedDiscountCode } = calculateTotals();

    // Update the UI
    document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("discount").textContent = appliedDiscountCode
        ? `-$${discount.toFixed(2)}`
        : `-$0.00`;
    document.getElementById("total").textContent = `$${total.toFixed(2)}`;
}

// Process payment
function processPayment() {
    const email = document.getElementById("email").value.trim();
    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const address = document.getElementById("address").value.trim();
    const postalCode = document.getElementById("postalCode").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const cardName = document.getElementById("cardName").value.trim();
    const cardNumber = document.getElementById("cardNumber").value.trim();
    const expiryDate = document.getElementById("expiryDate").value.trim();
    const cvv = document.getElementById("cvv").value.trim();

    // Validate required fields
    if (
        !email || 
        !firstName || 
        !lastName || 
        !address || 
        !postalCode || 
        !phone || 
        !cardName || 
        !cardNumber || 
        !expiryDate || 
        !cvv
    ) {
        alert("Please fill in all required fields.");
        return false;
    }

    // Validate card number
    if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ""))) {
        alert("Invalid card number.");
        return false;
    }

    // Validate expiry date
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        alert("Invalid expiry date format. Use MM/YY.");
        return false;
    }

    // Validate CVV
    if (!/^\d{3}$/.test(cvv)) {
        alert("Invalid CVV.");
        return false;
    }

    // Validate payment method
    if (!selectedPaymentMethod) {
        alert("Please select a payment method (Visa or Mastercard).");
        return false;
    }

    // Calculate totals dynamically
    const { subtotal, discount, total, appliedDiscountCode } = calculateTotals();

    // Generate a unique Order ID
    const orderId = `ORD-${Math.random().toString(36).slice(2, 11).toUpperCase()}`;

    // Simulate order submission
    alert("Processing your order...");

    const orderDetails = {
        orderId,
        email,
        name: `${firstName} ${lastName}`,
        address,
        postalCode,
        phone,
        paymentMethod: selectedPaymentMethod,
        cardName,
        subtotal: `$${subtotal.toFixed(2)}`,
        discount: appliedDiscountCode
            ? `${appliedDiscountCode.toUpperCase()} (-$${discount.toFixed(2)})`
            : "No Discount",
        total: `$${total.toFixed(2)}`,
        items: JSON.parse(localStorage.getItem("cart")) || [],
    };

    // Save order details to localStorage
    localStorage.setItem("lastOrder", JSON.stringify(orderDetails));

    // Clear form and cart
    clearForm();
    localStorage.removeItem("cart");
    localStorage.removeItem("appliedDiscountCode");
    localStorage.removeItem("discountCode");

    // Redirect to confirmation page or show success message
    alert(`Order successfully placed!`);
    return true;
}


// Clear form
function clearForm() {
    document.getElementById("email").value = "";
    document.getElementById("first-name").value = "";
    document.getElementById("last-name").value = "";
    document.getElementById("address").value = "";
    document.getElementById("postalCode").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("cardName").value = "";
    document.getElementById("cardNumber").value = "";
    document.getElementById("expiryDate").value = "";
    document.getElementById("cvv").value = "";

    // Remove active state from payment buttons
    const allButtons = document.querySelectorAll(".payment-method");
    allButtons.forEach(btn => btn.classList.remove("active"));

    selectedPaymentMethod = null;
}

