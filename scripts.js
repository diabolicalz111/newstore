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

    // Ensure no discount banner is dynamically added
    const discountBanner = document.querySelector(".discount-banner");
    if (discountBanner) {
        discountBanner.remove();
    }

    // Removed code related to thumbnails

    // Flash Sale: Apply 30% discount to products 200-209 and 101-109
    const products = document.querySelectorAll(".product");
    console.log("Products found:", products); // Debugging

    products.forEach((product) => {
        const productId = product.id;
        if (productId && (/^product20[0-9]$/.test(productId) || /^product10[1-9]$/.test(productId))) {
            const originalPrice = parseFloat(product.dataset.price);
            console.log(`Original Price for ${productId}: ${originalPrice}`); // Debugging

            if (!isNaN(originalPrice)) {
                const discountedPrice = (originalPrice * 0.7).toFixed(2); // Calculate 30% off
                console.log(`Discounted Price for ${productId}: ${discountedPrice}`); // Debugging
                const discountedPriceElement = product.querySelector(".discounted-price");
                if (discountedPriceElement) {
                    discountedPriceElement.textContent = discountedPrice;
                } else {
                    console.error("Discounted price element not found for product:", productId);
                }
            } else {
                console.error("Invalid price for product:", productId);
            }
        }
    });
});
