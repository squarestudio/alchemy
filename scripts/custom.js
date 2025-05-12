document.addEventListener("DOMContentLoaded", function () {

    /* ------------ HEADER GRADIENT ------------ */
    const header = document.querySelector(".Mobile-bar.Mobile-bar--top");
    const mobileOverlay = document.querySelector(".Mobile-overlay-menu");

    const gradientStops = [
        "#00C3B2",
        "#06E181",
        "#99ED61",
        "#FFDC00",
        "#FF8B92",
        "#BD00C6",
        "#F25E8F",
        "#FF9700",
        "#F8EC1B"
    ];

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

    function getElementScrollPercent(element) {
        const rect = element.getBoundingClientRect();
        // const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        const start = rect.top + window.scrollY;
        const end = rect.bottom + window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;

        const startPercent = Math.min(Math.max(start / docHeight, 0), 1);
        const endPercent = Math.min(Math.max(end / docHeight, 0), 1);

        return [startPercent, endPercent];
    }

    function applyGradientToElement(element) {
        const [startPercent, endPercent] = getElementScrollPercent(element);

        const startColor = getInterpolatedColor(gradientStops, startPercent);
        const endColor = getInterpolatedColor(gradientStops, endPercent);

        console.log(startColor);
        console.log(endColor);

        element.style.background = `linear-gradient(180deg, ${startColor}, ${endColor})`;
    }

    function updateGradients() {
        const isMenuOpen = document.body.classList.contains("is-mobile-overlay-active");
        if (isMenuOpen) return;

        applyGradientToElement(header);
        applyGradientToElement(mobileOverlay);
    }

    // Оновлення при скролі
    window.addEventListener("scroll", updateGradients);
    updateGradients();

    // Спостереження за відкриттям меню
    const observer = new MutationObserver(() => {
        const isMenuOpen = document.body.classList.contains("is-mobile-overlay-active");
        if (!isMenuOpen) {
            updateGradients(); // після закриття меню відновлюємо
        }
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });


    /* ------------ HERO ------------ */
    const heroSection = document.getElementById("hero");
    if (heroSection && heroSection.querySelector(".col:nth-child(2)")) {
        heroSection.querySelector(".col:nth-child(2)").classList.add("image-blur");
    }


    /* ------------ BENEFITS ------------ */
    const benefitsSection = document.getElementById("benefits");
    let benefitsOffsetTop;
    if (benefitsSection) {
        let element = benefitsSection.querySelector('.sqs-col-12');
        benefitsOffsetTop = element.getBoundingClientRect().top + window.scrollY - (window.innerHeight/1.6);
    }


    /* ------------ SANCTUARY ------------ */
    const sanctuarySection = document.getElementById("your-sweat-sanctuary");
    let sanctuaryOffsetTop;
    if (sanctuarySection) {
        let element = sanctuarySection.querySelector('.sqs-col-12 > .row:nth-child(1)');
        sanctuaryOffsetTop = element.getBoundingClientRect().top + window.scrollY;
    }


    /* ------------ A37 CLASSES ------------ */
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


    /* ------------ BLOG ------------ */
    const blogSection = document.getElementById("blog");
    if(blogSection) {
        let blogLength = blogSection.querySelectorAll('.blog-item:not(.more-is-coming)').length;
        let blogSwiper;
        let blogHeight;
        if(blogLength > 2) {
            blogSwiper = new Swiper('#blog .swiper', {
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
                blogSwiper = new Swiper('#blog .swiper', {
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


    /* ------------ A37 MANIFESTO ------------ */
    const a37ManifestoSection = document.getElementById("a37-manifesto");
    let a37ManifestoOffsetTop;
    if (a37ManifestoSection) {
        a37ManifestoOffsetTop = a37ManifestoSection.getBoundingClientRect().top + window.scrollY + (window.innerHeight/2.5);
    }


    /* ------------ WELCOME ------------ */
    const welcomeSection = document.getElementById("welcome");
    let welcomeOffsetTop;
    if (welcomeSection) {
        let element = welcomeSection.querySelector('.sqs-col-12');
        welcomeOffsetTop = element.getBoundingClientRect().top + window.scrollY
    }

    const welcomePricingSection = document.getElementById("welcome-pricing");
    let welcomePricingOffsetTop;
    if (welcomePricingSection) {
        let element = welcomePricingSection.querySelector('.sqs-col-12');
        welcomePricingOffsetTop = element.getBoundingClientRect().top + window.scrollY
    }

    const welcomeFaqSection = document.getElementById("welcome-faq");
    let welcomeFaqOffsetTop;
    if (welcomeFaqSection) {
        let element = welcomeFaqSection.querySelector('.sqs-col-12');
        welcomeFaqOffsetTop = element.getBoundingClientRect().top + window.scrollY
    }

    const welcomeConceptSection = document.getElementById("welcome-concept");
    let welcomeConceptOffsetTop;
    if (welcomeConceptSection) {
        let element = welcomeConceptOffsetTop.querySelector('.sqs-col-12');
        welcomeConceptOffsetTop = element.getBoundingClientRect().top + window.scrollY
    }


    /* ------------ PRICING ------------ */
    const pricingImagesSection = document.getElementById("pricing-images");
    let pricingImagesOffsetTop;
    if (pricingImagesSection) {
        pricingImagesOffsetTop = pricingImagesSection.getBoundingClientRect().top + window.scrollY + (window.innerHeight/2.5);
    }

    /* ------------ FAQ ------------ */
    const faqItemsSection = document.getElementById("faq-items");
    if (faqItemsSection) {
        faqItemsSection.querySelectorAll('ul li').forEach(item => {
            item.addEventListener('click', () => {
                // Toggle 'open' class
                item.classList.toggle('open');

                // Optionally, close others if you want only one open at a time
                document.querySelectorAll('#faq-items ul li').forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('open');
                    }
                });
            });
        });
    }


    /* ------------ TEAM ------------ */
    const teamSection = document.getElementById("our-team");
    if(teamSection) {
        let teamSwiper = new Swiper('#our-team .swiper', {
            slidesPerView: "auto",
            centeredSlides: true,
            spaceBetween: 24,
            initialSlide: 1
        });
        teamSwiper.on('slideChange', () => {
            const realSlideCount = teamSwiper.slides.length;
            if (teamSwiper.activeIndex === 0 || teamSwiper.activeIndex === realSlideCount - 1) {
                teamSwiper.slideTo(teamSwiper.previousIndex);
            }
        });
    }


    /* ------------ WHO WE ARE  ------------ */
    const wwaSection = document.getElementById("who-we-are-images");
    let wwaOffsetTop;
    if (wwaSection) {
        let element = wwaSection.querySelector('.sqs-col-12 > .row:nth-child(1)');
        wwaOffsetTop = element.getBoundingClientRect().top + window.scrollY - (window.innerHeight/2.5);
    }


    /* ------------ A37 CLASSES ------------ */
    const combineSection = document.getElementById("at-alchemy-37-we-combine");
    let combineOffsetTop;
    if (combineSection) {
        combineOffsetTop = combineSection.getBoundingClientRect().top + window.scrollY + (window.innerHeight/2.5);
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
        if(scrollPosition >= welcomeOffsetTop || scrollPosition >= welcomePricingOffsetTop || scrollPosition >= welcomeFaqOffsetTop || scrollPosition >= welcomeConceptOffsetTop) {
            document.body.classList.add('welcome-blur');
        }

        if(scrollPosition >= pricingImagesOffsetTop) {
            document.body.classList.add('pricing-images-blur');
        }

        if(scrollPosition >= wwaOffsetTop) {
            document.body.classList.add('wwa-blur');
        }
        if(scrollPosition >= combineOffsetTop) {
            document.body.classList.add('combine-blur');
        }

    });

});
