document.addEventListener("DOMContentLoaded", function () {
    const heroSection = document.getElementById("hero");
    const heroImage = heroSection.querySelector(".col:nth-child(2)");
    if (heroSection && heroImage) {
        heroImage.classList.add("image-blur");
    }

    const benefitsSection = document.getElementById("benefits");
    let benefitsOffsetTop;
    if (benefitsSection) {
        const element = benefitsSection.querySelector('.sqs-col-12');
        benefitsOffsetTop = element.getBoundingClientRect().top + window.scrollY - (window.innerHeight/1.6);
    }

    window.onload = function() {
        document.querySelector('footer.Footer input[type="checkbox"]').checked = true;
    }
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY || window.pageYOffset;
        if(scrollPosition >= benefitsOffsetTop) {
            document.body.classList.add('benefits-blur');
        }
    });
});
