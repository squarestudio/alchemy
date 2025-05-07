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

    const blogSection = document.getElementById("blog");
    if(blogSection) {
        let blogLength = blogSection.querySelectorAll('.blog-item:not(.more-is-coming)').length;
        let blogSwiper;
        let blogHeight;
        if(blogLength > 2) {
            blogSwiper = new Swiper('.swiper', {
                slidesPerView: "auto",
                centeredSlides: true,
                spaceBetween: 24,
                initialSlide: 1
            });

            blogHeight = blogSection.querySelector('.swiper-wrapper').offsetHeight;
            console.log(blogHeight);

            blogSwiper.on('slideChange', () => {
                const realSlideCount = blogSwiper.slides.length;
                if (blogSwiper.activeIndex === 0 || blogSwiper.activeIndex === realSlideCount - 1) {
                    blogSwiper.slideTo(blogSwiper.previousIndex);
                }
            });
        }else{
            blogSection.classList.add('blogItems'+blogLength);

            if(window.innerWidth <= 1024) {
                blogSwiper = new Swiper('.swiper', {
                    slidesPerView: 1,
                    pagination: {
                        el: '.swiper-pagination',
                    },
                });

                setTimeout(function(){
                    blogHeight = blogSection.querySelector('.swiper-wrapper').offsetHeight;
                    blogSection.querySelector('.swiper-wrapper').style.height = blogHeight+'px';
                },500)
            }else{
                blogHeight = blogSection.querySelector('.swiper-wrapper').offsetHeight;
                blogSection.querySelector('.swiper-wrapper').style.height = blogHeight+'px';
            }
        }
    }

    const a37ManifestoSection = document.getElementById("a37-manifesto");
    let a37ManifestoOffsetTop;
    if (a37ManifestoSection) {
        a37ManifestoOffsetTop = a37ManifestoSection.getBoundingClientRect().top + window.scrollY + (window.innerHeight/2.5);
    }

    const welcomeSection = document.getElementById("welcome");
    let welcomeOffsetTop;
    if (welcomeSection) {
        let element = welcomeSection.querySelector('.sqs-col-12');
        welcomeOffsetTop = element.getBoundingClientRect().top + window.scrollY
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


    const header = document.querySelector(".Mobile-bar.Mobile-bar--top");
    const mobileOverlay = document.querySelector(".Mobile-overlay-menu");

    const gradientStops = [
        "#F8EC1B",
        "#FF9700",
        "#F25E8F",
        "#BD00C6",
        "#FF8B92",
        "#FFDC00",
        "#99ED61",
        "#06E181",
        "#00C3B2"
    ];

    // Обернений масив кольорів для overlay
    const reversedGradientStops = [...gradientStops].reverse();

    function interpolateColor(color1, color2, factor) {
        const c1 = parseInt(color1.slice(1), 16);
        const c2 = parseInt(color2.slice(1), 16);

        const r1 = (c1 >> 16) & 0xff, g1 = (c1 >> 8) & 0xff, b1 = c1 & 0xff;
        const r2 = (c2 >> 16) & 0xff, g2 = (c2 >> 8) & 0xff, b2 = c2 & 0xff;

        const r = Math.round(r1 + (r2 - r1) * factor);
        const g = Math.round(g1 + (g2 - g1) * factor);
        const b = Math.round(b1 + (b2 - b1) * factor);

        return `rgb(${r}, ${g}, ${b})`;
    }

    function getInterpolatedColor(stops, percent) {
        const rangeCount = stops.length - 1;
        const exactIndex = percent * rangeCount;
        const lowerIndex = Math.floor(exactIndex);
        const upperIndex = Math.min(lowerIndex + 1, rangeCount);
        const factor = exactIndex - lowerIndex;

        const startColor = stops[lowerIndex];
        const endColor = stops[upperIndex];
        return interpolateColor(startColor, endColor, factor);
    }

    function updateGradient() {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = Math.min(scrollTop / docHeight, 1);

        const headerColor = getInterpolatedColor(reversedGradientStops, scrollPercent);
        const overlayColor = getInterpolatedColor(reversedGradientStops, scrollPercent);

        header.style.background = `linear-gradient(0deg, ${headerColor}, ${headerColor})`;
        mobileOverlay.style.background = `linear-gradient(0deg, ${overlayColor}, ${overlayColor})`;
    }

    window.addEventListener("scroll", updateGradient);
    // window.addEventListener("resize", updateGradient);
    updateGradient();
});
