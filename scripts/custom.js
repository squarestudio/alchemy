document.addEventListener("DOMContentLoaded", function () {
    const heroImage = document.querySelector("#alchemy-hero .col:nth-child(2)"); // або вкажи конкретніше: .my-class, #my-id, і т.д.
    if (heroImage) {
        heroImage.classList.add("animate-image");
    }

    document.querySelector('footer.Footer .option input[type="checkbox"]').checked = true;
});
