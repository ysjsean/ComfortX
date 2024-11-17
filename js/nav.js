if(localStorage.getItem("isLoggedIn") === "true") {
    document.getElementById("logout-btn").style.display = "block";
    document.getElementById("login-btn").style.display = "none";
}

function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("discountCode");
    window.location.href = "index.html";
}