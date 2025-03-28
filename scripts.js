// ...existing code...
document.addEventListener("DOMContentLoaded", () => {
    const policiesButton = document.getElementById("policies-button");
    const policiesModal = document.getElementById("policies-modal");
    const closeButton = document.querySelector(".close-button");

    policiesButton.addEventListener("click", () => {
        policiesModal.style.display = "block";
    });

    closeButton.addEventListener("click", () => {
        policiesModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === policiesModal) {
            policiesModal.style.display = "none";
        }
    });
});
