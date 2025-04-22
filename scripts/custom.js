document.addEventListener("DOMContentLoaded", function () {
    const heroImage = document.querySelector("#archive-hero .col:nth-child(2)"); // або вкажи конкретніше: .my-class, #my-id, і т.д.
    if (heroImage) {
        heroImage.classList.add("animate-image");
    }
});
