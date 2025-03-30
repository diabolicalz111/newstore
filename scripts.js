document.addEventListener("DOMContentLoaded", () => {
    const policiesButton = document.getElementById("policies-button");
    const policiesModal = document.getElementById("policies-modal");
    const closeButton = document.querySelector(".close-button");

    policiesButton.addEventListener("click", () => {
        policiesModal.style.display = "block"; // Show the modal
        calculateShippingCost(); // Calculate and display shipping costs
    });

    closeButton.addEventListener("click", () => {
        policiesModal.style.display = "none"; // Hide the modal
    });

    window.addEventListener("click", (event) => {
        if (event.target === policiesModal) {
            policiesModal.style.display = "none"; // Hide the modal if clicked outside
        }
    });

    function calculateShippingCost() {
        const domesticShipping = 10.0; // Updated standard shipping within NZ
        const internationalShipping = {
            Australia: 25.0,
            USA_UK_Canada: 55.0,
            RestOfWorld: 65.0,
        };

        const shippingDetails = `
            <h3>Shipping Costs:</h3>
            <ul>
                <li>Domestic (New Zealand): $${domesticShipping.toFixed(2)}</li>
                <li>Australia: $${internationalShipping.Australia.toFixed(2)}</li>
                <li>USA, UK, Canada: $${internationalShipping.USA_UK_Canada.toFixed(2)}</li>
                <li>Rest of the World: $${internationalShipping.RestOfWorld.toFixed(2)}</li>
            </ul>
        `;

        const modalContent = document.querySelector(".modal-content");
        modalContent.insertAdjacentHTML("beforeend", shippingDetails);
    }
});
