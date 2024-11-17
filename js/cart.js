// Cached cart in memory
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save cart to localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Render the cart in the modal
function renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartSubtotalElement = document.getElementById("cart-subtotal").querySelector("p:last-child");

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="text-center text-muted">Your cart is empty.</p>`;
        cartSubtotalElement.textContent = `$0.00`;
        return;
    }

    let cartHTML = "";
    let subtotal = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        subtotal += itemTotal;

        cartHTML += `
            <div class="d-flex justify-content-between align-items-center my-4 cart-item" data-index="${index}">
                <img src="./assets/images/black_mouse.png" alt="${item.name}" class="img-fluid" style="width: 100px;">
                <div>
                    <h6 class="fw-bold mb-0">${item.name}</h6>
                    <p class="text-muted mb-1">Includes: ${item.gifts.map(gift => `<span class="badge bg-secondary">${gift}</span>`).join(" ")}</p>
                    <span class="text-success fw-bold">In Stock</span>
                </div>
                <div class="d-flex align-items-center">
                    <button class="btn btn-outline-secondary btn-sm btn-decrease">-</button>
                    <input type="text" class="form-control text-center mx-1" value="${item.qty}" style="width: 50px;" readonly>
                    <button class="btn btn-outline-secondary btn-sm btn-increase">+</button>
                </div>
                <span class="fw-bold">$${itemTotal.toFixed(2)}</span>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = cartHTML;
    cartSubtotalElement.textContent = `$${subtotal.toFixed(2)}`;
}

// Update cart quantity
function updateCartQty(index, action) {
    if (cart[index]) {
        if (action === "increase") {
            cart[index].qty += 1;
        } else if (action === "decrease" && cart[index].qty > 1) {
            cart[index].qty -= 1;
        } else if (action === "decrease" && cart[index].qty === 1) {
            cart.splice(index, 1); // Remove item if quantity reaches 0
        }
    }

    saveCart();
    renderCart();
}

// Add product to cart
function addProductToCart(product) {
    const existingProductIndex = cart.findIndex(
        (item) => item.name === product.name && JSON.stringify(item.gifts) === JSON.stringify(product.gifts)
    );

    if (existingProductIndex > -1) {
        cart[existingProductIndex].qty += 1;
    } else {
        cart.push(product);
    }

    saveCart();
    renderCart();
    updateCartCount(); // Update the cart count
}

// Update the cart count in the cart icon
function updateCartCount() {
    const cartCountElement = document.querySelector(".cart-count");
    const totalItems = cart.reduce((count, item) => count + item.qty, 0);
    cartCountElement.textContent = totalItems;
}

function updateCartQty(index, action) {
    if (cart[index]) {
        if (action === "increase") {
            cart[index].qty += 1;
        } else if (action === "decrease" && cart[index].qty > 1) {
            cart[index].qty -= 1;
        } else if (action === "decrease" && cart[index].qty === 1) {
            cart.splice(index, 1); // Remove item if quantity reaches 0
        }
    }

    saveCart();
    renderCart();
    updateCartCount(); // Update the cart count
}


// Event delegation for + and - buttons
document.getElementById("cart-items").addEventListener("click", function (e) {
    const target = e.target;
    const cartItem = target.closest(".cart-item");

    if (!cartItem) return;

    const index = parseInt(cartItem.dataset.index, 10);

    if (target.classList.contains("btn-increase")) {
        updateCartQty(index, "increase");
    } else if (target.classList.contains("btn-decrease")) {
        updateCartQty(index, "decrease");
    }
});

// Initialize the cart
document.addEventListener("DOMContentLoaded", () => {
    renderCart();
    updateCartCount(); // Initialize the cart count
});

