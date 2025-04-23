document.addEventListener("DOMContentLoaded", function () {
    const heroSection = document.getElementById("hero");
    const heroImage = heroSection.querySelector(".col:nth-child(2)");
    if (heroSection && heroImage) {
        heroImage.classList.add("image-blur");
    }

    const benefitsSection = document.getElementById("benefits");
    if (benefitsSection) {
        const element = benefitsSection.querySelector('.sqs-col-12');
        const benefitsOffsetTop = element.getBoundingClientRect().top + window.scrollY - (window.innerHeight/2);
        console.log(benefitsOffsetTop);
    }

    window.onload = function() {
        document.querySelector('footer.Footer input[type="checkbox"]').checked = true;
    }
});
