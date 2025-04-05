document.addEventListener("DOMContentLoaded", () => {
    const policiesButton = document.getElementById("policies-button");
    const policiesModal = document.getElementById("policies-modal");
    const closeButton = document.querySelector(".close-button");

    // Log to verify elements are correctly selected
    console.log("policiesButton:", policiesButton);
    console.log("policiesModal:", policiesModal);
    console.log("closeButton:", closeButton);

    if (!policiesButton || !policiesModal || !closeButton) {
        console.error("One or more elements (policiesButton, policiesModal, closeButton) are missing in the DOM.");
        return;
    }

    policiesButton.addEventListener("click", () => {
        console.log("Policies button clicked"); // Log to confirm event firing
        policiesModal.style.display = "block"; // Show the modal
    });

    closeButton.addEventListener("click", () => {
        console.log("Close button clicked"); // Log to confirm event firing
        policiesModal.style.display = "none"; // Hide the modal
    });

    window.addEventListener("click", (event) => {
        if (event.target === policiesModal) {
            console.log("Clicked outside the modal"); // Log to confirm event firing
            policiesModal.style.display = "none"; // Hide the modal if clicked outside
        }
    });

    // Removed code related to thumbnails

    // Flash Sale: Apply 30% discount to all products
    const products = document.querySelectorAll(".product");
    products.forEach((product) => {
        const originalPrice = parseFloat(product.dataset.price);
        if (!isNaN(originalPrice)) {
            const discountedPrice = (originalPrice * 0.7).toFixed(2); // Calculate 30% off
            product.querySelector(".discounted-price").textContent = discountedPrice;
        } else {
            console.error("Invalid price for product:", product);
        }
    });
});
