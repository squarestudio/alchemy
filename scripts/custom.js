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
    let heroSection = document.getElementById("hero");
    if (heroSection && heroSection.querySelector(".col:nth-child(2)")) {
        heroSection.querySelector(".col:nth-child(2)").classList.add("image-blur");
    }


    /* ------------ FORMULA ------------ */
    let formulaSection = document.getElementById("formula-items");
    if(formulaSection && window.innerWidth <= 1024) {
        let formulaSwiper = new Swiper('#formula-items .swiper', {
            slidesPerView: '1',
            pagination: {
                el: '.swiper-pagination',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2
                }
            },
        });
    }


    /* ------------ MELT THE LIMITS ------------ */
    let meltLimitsSection = document.getElementById("melt-the-limits");
    if(meltLimitsSection && window.innerWidth <= 1024) {
        let meltTheLimitsSwiper = new Swiper('#melt-the-limits .swiper', {
            slidesPerView: "1",
            spaceBetween: 24,
            autoHeight: true,
            pagination: {
                el: '.swiper-pagination',
            },
        });
    }


    /* ------------ SANCTUARY ------------ */
    let sanctuarySection = document.getElementById("your-sweat-sanctuary");


    /* ------------ A37 CLASSES ------------ */
    let a37ClassesSection = document.getElementById("a37-classes");

    let classesSection = document.getElementById("classes");
    if(classesSection) {
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
    let blogSection = document.getElementById("blog");
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
    let a37ManifestoSection = document.getElementById("a37-manifesto");


    /* ------------ WELCOME ------------ */
    let welcomeSection = document.getElementById("welcome-and-join");


    /* ------------ PRICING ------------ */
    let pricingImagesSection = document.getElementById("pricing-images");


    /* ------------ FAQ ------------ */
    let faqItemsSection = document.getElementById("faq-items");
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
    let teamSection = document.getElementById("our-team");
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
    let wwaSection = document.getElementById("who-we-are-images");


    /* ------------ A37 CLASSES ------------ */
    let combineSection = document.getElementById("at-alchemy-37-we-combine");




    /* ------------ BENEFITS ------------ */
    let benefitsSection = document.getElementById("benefits");
    let benefitsHeight;
    let benefitsImageBlock;
    let benefitsSecondImage;
    let benefitsScrollRange;
    let benefitsMinWidth;
    let benefitsMaxWidth;

    if(benefitsSection) {
        benefitsHeight = benefitsSection.offsetHeight - 120;
        benefitsImageBlock = benefitsSection.querySelector(".Index-page-content .sqs-col-12>.row .col:first-child");
        benefitsSecondImage = benefitsSection.querySelector(".Index-page-content .sqs-col-12>.row .col:first-child .image-block+.image-block .image-block-wrapper>div img");
        benefitsScrollRange = 200; // діапазон у якому відбувається анімація
        benefitsMinWidth = 25; // в %
        benefitsMaxWidth = 58.333; // в %

    }

    window.onload = function() {
        document.querySelector('footer.Footer input[type="checkbox"]').checked = true;
    }
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY || window.pageYOffset;
        if(benefitsSection) {
            let benefitsTriggerPoint = benefitsSection.offsetTop - window.innerHeight + benefitsHeight;

            if (scrollPosition >= benefitsTriggerPoint) {
                const delta = scrollPosition - benefitsTriggerPoint;

                if (delta <= 0) {
                    benefitsImageBlock.style.width = `${benefitsMinWidth}%`;
                    benefitsSecondImage.style.transform = `translateX(0px)`;
                    benefitsSecondImage.style.opacity = `0`;
                } else if (delta >= benefitsScrollRange) {
                    benefitsImageBlock.style.width = `${benefitsMaxWidth}%`;
                    benefitsSecondImage.style.transform = `translateX(-50px)`;
                    benefitsSecondImage.style.opacity = `0.3`;
                } else {
                    const progress = delta / benefitsScrollRange;

                    const currentWidth = benefitsMinWidth + (benefitsMaxWidth - benefitsMinWidth) * progress;
                    const currentTranslateX = -50 * progress;
                    const currentOpacity = 0.3 * progress;
                    console.log(currentOpacity);

                    benefitsImageBlock.style.width = `${currentWidth}%`;
                    benefitsSecondImage.style.transform = `translateX(${currentTranslateX}px)`;
                    benefitsSecondImage.style.opacity = `${currentOpacity}`;
                }
            }

        }


        // if(scrollPosition >= benefitsOffsetTop) {
        //     document.body.classList.add('benefits-blur');
        // }
        // if(scrollPosition >= sanctuaryOffsetTop) {
        //     document.body.classList.add('sanctuary-blur');
        // }
        // if(scrollPosition >= a37ClassesOffsetTop) {
        //     document.body.classList.add('a37-blur');
        // }
        // if(scrollPosition >= classesOffsetTop) {
        //     document.body.classList.add('classes-blur');
        // }
        // if(scrollPosition >= a37ManifestoOffsetTop) {
        //     document.body.classList.add('manifesto-blur');
        // }
        // if(scrollPosition >= welcomeOffsetTop) {
        //     document.body.classList.add('welcome-blur');
        // }
        //
        // if(scrollPosition >= pricingImagesOffsetTop) {
        //     document.body.classList.add('pricing-images-blur');
        // }
        //
        // if(scrollPosition >= wwaOffsetTop) {
        //     document.body.classList.add('wwa-blur');
        // }
        // if(scrollPosition >= combineOffsetTop) {
        //     document.body.classList.add('combine-blur');
        // }

    });

});
