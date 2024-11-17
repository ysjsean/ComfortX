function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.classList.remove("hidden");

    // Hide the notification after 3 seconds
    setTimeout(() => {
        notification.classList.add("hidden");
    }, 3000);
}