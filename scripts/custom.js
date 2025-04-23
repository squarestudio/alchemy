document.addEventListener("DOMContentLoaded", function () {
    const heroSection = document.getElementById("hero");
    const heroImage = heroSection.querySelector(".col:nth-child(2)");
    if (heroSection && heroImage) {
        heroImage.classList.add("image-blur");
    }

    window.onload = function() {
        const benefitsSection = document.getElementById("benefits");
        if(benefitsSection) {
            let benefitsOffsetTop = benefitsSection.querySelector('.sqs-col-12').offsetTop;
            console.log(benefitsOffsetTop);
        }

        document.querySelector('footer.Footer input[type="checkbox"]').checked = true;
    }
});
