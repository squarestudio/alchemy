document.addEventListener("DOMContentLoaded", function () {
    const heroSection = document.getElementById("hero");
    const heroImage = heroSection.querySelector(".col:nth-child(2)");
    if (heroSection && heroImage) {
        heroImage.classList.add("image-blur");
    }

    const benefitsSection = document.getElementById("benefits");
    let benefitsOffsetTop;
    if (benefitsSection) {
        let element = benefitsSection.querySelector('.sqs-col-12');
        benefitsOffsetTop = element.getBoundingClientRect().top + window.scrollY - (window.innerHeight/1.6);
    }

    const sanctuarySection = document.getElementById("your-sweat-sanctuary");
    let sanctuaryOffsetTop;
    if (sanctuarySection) {
        let element = sanctuarySection.querySelector('.sqs-col-12 > .row:nth-child(1)');
        sanctuaryOffsetTop = element.getBoundingClientRect().top + window.scrollY;
    }

    const a37ClassesSection = document.getElementById("a37-classes");
    let a37ClassesOffsetTop;
    if (a37ClassesSection) {
        a37ClassesOffsetTop = a37ClassesSection.getBoundingClientRect().top + window.scrollY + (window.innerHeight/2.5);
    }

    const classesSection = document.getElementById("classes");
    let classesOffsetTop;
    if(classesSection) {
        classesOffsetTop = classesSection.getBoundingClientRect().top + window.scrollY;

        const cols = classesSection.querySelectorAll('.Index-page-content > .sqs-layout > .row:nth-child(1) .col');
        const items = classesSection.querySelectorAll('.Index-page-content > .sqs-layout > .row:nth-child(2) > .sqs-col-12 > .row.item');

        cols.forEach((col, index) => {
            col.addEventListener('click', () => {
                cols.forEach(c => c.classList.remove('active'));
                items.forEach(item => item.classList.remove('active'));

                // Add 'active' class to the clicked col and the corresponding item
                col.classList.add('active');
                if (items[index]) {
                    items[index].classList.add('active');
                }
            });
        });
        cols[0].click();
    }

    const a37ManifestoSection = document.getElementById("a37-manifesto");
    let a37ManifestoOffsetTop;
    if (a37ManifestoSection) {
        a37ManifestoOffsetTop = a37ManifestoSection.getBoundingClientRect().top + window.scrollY + (window.innerHeight/2.5);
    }

    const welcomeSection = document.getElementById("benefits");
    let welcomeOffsetTop;
    if (welcomeSection) {
        let element = welcomeSection.querySelector('.sqs-col-12');
        welcomeOffsetTop = element.getBoundingClientRect().top + window.scrollY - (window.innerHeight/1.6);
    }

    window.onload = function() {
        document.querySelector('footer.Footer input[type="checkbox"]').checked = true;
    }
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY || window.pageYOffset;
        if(scrollPosition >= benefitsOffsetTop) {
            document.body.classList.add('benefits-blur');
        }
        if(scrollPosition >= sanctuaryOffsetTop) {
            document.body.classList.add('sanctuary-blur');
        }
        if(scrollPosition >= a37ClassesOffsetTop) {
            document.body.classList.add('a37-blur');
        }
        if(scrollPosition >= classesOffsetTop) {
            document.body.classList.add('classes-blur');
        }
        if(scrollPosition >= a37ManifestoOffsetTop) {
            document.body.classList.add('manifesto-blur');
        }
        if(scrollPosition >= welcomeOffsetTop) {
            document.body.classList.add('welcome-blur');
        }
    });
});
