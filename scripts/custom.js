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
            slidesPerView: '1',
            pagination: {
                el: '.swiper-pagination',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                },
                1025: {
                    slidesPerView: "auto",
                    centeredSlides: true,
                    spaceBetween: 24,
                    initialSlide: 1,
                }
            },
        });
        if(window.innerWidth > 1024) {
            teamSwiper.on('slideChange', () => {
                const realSlideCount = teamSwiper.slides.length;
                if (teamSwiper.activeIndex === 0 || teamSwiper.activeIndex === realSlideCount - 1) {
                    teamSwiper.slideTo(teamSwiper.previousIndex);
                }
            });
        }
    }


    /* ------------ WHO WE ARE  ------------ */
    let wwaSection = document.getElementById("who-we-are-images");


    /* ------------ A37 CLASSES ------------ */
    let combineSection = document.getElementById("at-alchemy-37-we-combine");



    /* INVEST IN YOUR MOVEMENT */
    let investSection = document.getElementById('invest-in-your-movement');
    if(investSection && window.innerWidth <= 1024) {
        investSection.querySelector('.Index-page-content .sqs-col-12').classList.add('swiper');
        investSection.querySelector('.Index-page-content .sqs-col-12>.row').classList.add('swiper-wrapper');
        investSection.querySelectorAll('.Index-page-content .sqs-col-12 > .row > .col').forEach(slide => {
            slide.classList.add('swiper-slide');
        });

        const pagination = document.createElement('div');
        pagination.classList.add('swiper-pagination');
        investSection.querySelector('.Index-page-content .sqs-col-12').appendChild(pagination);

        let investSwiper = new Swiper('#invest-in-your-movement .swiper', {
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


    /* ------------ BENEFITS ------------ */
    let benefitsSection = document.getElementById("benefits");
    let benefitsHeight;
    let benefitsImageBlock;
    let benefitsSecondImage;
    let benefitsScrollRange;
    let benefitsMinWidth;
    let benefitsMaxWidth;
    let benefitsLayoutWidth;
    if(benefitsSection) {
        benefitsHeight = benefitsSection.offsetHeight - 240;
        benefitsImageBlock = benefitsSection.querySelector(".Index-page-content .sqs-col-12>.row .col:first-child");
        benefitsSecondImage = benefitsSection.querySelector(".Index-page-content .sqs-col-12>.row .col:first-child .image-block+.image-block .image-block-wrapper>div img");
        benefitsMinWidth = 25; // в %
        benefitsMaxWidth = 58.333; // в %

        benefitsLayoutWidth = benefitsSection.querySelector('.sqs-layout').offsetWidth - 24;
        let initialWidth = (benefitsLayoutWidth/100)*25;
        let finalWidth = (benefitsLayoutWidth/100)*58.333;
        benefitsScrollRange = Math.ceil(finalWidth - initialWidth);
    }


    /* ------------ SANCTUARY ------------ */
    let sanctuarySection = document.getElementById("your-sweat-sanctuary");
    let sanctuarySmallImage;
    let sanctuaryBigImage;
    if(sanctuarySection) {
        sanctuarySmallImage = sanctuarySection.querySelector(".Index-page-content .sqs-col-12>.row:first-child .col:last-child");
        sanctuaryBigImage = sanctuarySection.querySelector(".Index-page-content .sqs-col-12>.row:nth-child(2) .col:last-child");
    }


    /* ------------ A37 CLASSES ------------ */
    let a37ClassesSection = document.getElementById("a37-classes");
    let a37ClassesFirstImage;
    let a37ClassesSecondImage;
    if(a37ClassesSection) {
        a37ClassesFirstImage = a37ClassesSection.querySelector(".Index-page-content .sqs-col-12>.row:nth-child(2) > .col:first-child .image-block + .image-block");
        a37ClassesSecondImage = a37ClassesSection.querySelector(".Index-page-content .sqs-col-12>.row:nth-child(2) > .col:last-child .image-block + .image-block");
    }

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



    /* ------------ A37 MANIFESTO ------------ */
    let a37ManifestoSection = document.getElementById("a37-manifesto");
    let a37ManifestoImage;
    if(a37ManifestoSection) {
        a37ManifestoImage = a37ManifestoSection.querySelector(".manifesto-bg img+img");
    }


    /* ------------ WELCOME & JOIN ------------ */
    let welcomeSection = document.getElementById("welcome-and-join");
    let welcomeHeight;
    let welcomeImageBlock;
    let welcomeSecondImage;
    let welcomeScrollRange;
    let welcomeMinWidth;
    let welcomeMaxWidth;
    let welcomeLayoutWidth;
    if(welcomeSection) {
        welcomeHeight = welcomeSection.querySelector('#welcomeBlock').offsetHeight - 120;
        welcomeImageBlock = welcomeSection.querySelector("#welcomeBlock .sqs-col-12>.row .col:first-child");
        welcomeSecondImage = welcomeSection.querySelector("#welcomeBlock .sqs-col-12>.row .col:first-child .image-block+.image-block .image-block-wrapper>div img");
        welcomeMinWidth = 25; // в %
        welcomeMaxWidth = 58.333; // в %

        welcomeLayoutWidth = welcomeSection.querySelector('.sqs-layout').offsetWidth - 24;
        let welcomeInitialWidth = (welcomeLayoutWidth/100)*25;
        let welcomeFinalWidth = (welcomeLayoutWidth/100)*58.333;
        welcomeScrollRange = Math.ceil(welcomeFinalWidth - welcomeInitialWidth);
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
                    benefitsSecondImage.style.transform = `translateX(-20px)`;
                    benefitsSecondImage.style.opacity = `0.3`;
                } else {
                    const progress = delta / benefitsScrollRange;

                    const currentWidth = benefitsMinWidth + (benefitsMaxWidth - benefitsMinWidth) * progress;
                    const currentTranslateX = -20 * progress;

                    benefitsImageBlock.style.width = `${currentWidth}%`;
                    benefitsSecondImage.style.transform = `translateX(${currentTranslateX}px)`;
                    benefitsSecondImage.style.opacity = `0.3`;
                }
            }

        }
        if(sanctuarySection) {
            let sanctuaryTriggerPoint = sanctuarySection.offsetTop;
            let sanctuarySecondTriggerPoint = sanctuarySection.offsetTop + 120;
            let sanctuaryThirdTriggerPoint = sanctuarySection.offsetTop + 260;
            let sanctuaryScrollOneRange = Math.ceil(sanctuarySecondTriggerPoint - sanctuaryTriggerPoint);
            let sanctuaryScrollTwoRange = Math.ceil(sanctuaryThirdTriggerPoint - sanctuarySecondTriggerPoint);

            if (scrollPosition >= sanctuaryTriggerPoint) {
                let sanctuaryDelta = scrollPosition - sanctuaryTriggerPoint;

                if (sanctuaryDelta <= 0) {
                    sanctuarySmallImage.style.transform = `translateX(0px)`;
                    sanctuarySmallImage.style.opacity = `0`;
                } else if (sanctuaryDelta >= sanctuaryScrollOneRange) {
                    sanctuarySmallImage.style.transform = `translateX(-20px)`;
                    sanctuarySmallImage.style.opacity = `0.3`;
                } else {
                    let sanctuaryProgress = sanctuaryDelta / sanctuaryScrollOneRange;
                    let sanctuaryCurrentTranslateX = Math.ceil(-20 * sanctuaryProgress);

                    sanctuarySmallImage.style.transform = `translateX(${sanctuaryCurrentTranslateX}px)`;
                    sanctuarySmallImage.style.opacity = `0.3`;
                }
            }
            if (scrollPosition > sanctuarySecondTriggerPoint) {
                let sanctuarySDelta = scrollPosition - sanctuarySecondTriggerPoint;

                if (sanctuarySDelta <= 0) {
                    sanctuaryBigImage.style.transform = `translateX(0px)`;
                    sanctuaryBigImage.style.opacity = `0`;
                } else if (sanctuarySDelta >= sanctuaryScrollTwoRange) {
                    sanctuaryBigImage.style.transform = `translateX(-50px)`;
                    sanctuaryBigImage.style.opacity = `0.3`;
                } else {
                    let sanctuaryProgress = sanctuarySDelta / sanctuaryScrollTwoRange;
                    let sanctuaryCurrentTranslateX = Math.ceil(-50 * sanctuaryProgress);

                    sanctuaryBigImage.style.transform = `translateX(${sanctuaryCurrentTranslateX}px)`;
                    sanctuaryBigImage.style.opacity = `0.3`;
                }
            }
        }
        if(a37ClassesSection) {
            let a37ClassesTriggerPoint = a37ClassesSection.offsetTop + 120;
            let a37ClassesSecondTriggerPoint = a37ClassesSection.offsetTop + 320;
            let a37ClassesScrollRange = Math.ceil(a37ClassesSecondTriggerPoint - a37ClassesTriggerPoint);

            if (scrollPosition >= a37ClassesTriggerPoint) {
                let a37ClassesDelta = scrollPosition - a37ClassesTriggerPoint;

                if (a37ClassesDelta <= 0) {
                    a37ClassesFirstImage.style.transform = `translateX(0px)`;
                    a37ClassesSecondImage.style.transform = `translateX(0px)`;
                } else if (a37ClassesDelta >= a37ClassesScrollRange) {
                    a37ClassesFirstImage.style.transform = `translateX(-20px)`;
                    a37ClassesSecondImage.style.transform = `translateX(-20px)`;
                } else {
                    let a37ClassesProgress = a37ClassesDelta / a37ClassesScrollRange;
                    let a37ClassesCurrentTranslateX = Math.ceil(-20 * a37ClassesProgress);

                    a37ClassesFirstImage.style.transform = `translateX(${a37ClassesCurrentTranslateX}px)`;
                    a37ClassesSecondImage.style.transform = `translateX(${a37ClassesCurrentTranslateX}px)`;
                }
            }
        }
        if(a37ManifestoSection) {
            let a37ManifestoTriggerPoint = a37ManifestoSection.offsetTop;
            let a37ManifestoSecondTriggerPoint = a37ManifestoSection.offsetTop + 120;
            let a37ManifestoScrollRange = Math.ceil(a37ManifestoSecondTriggerPoint - a37ManifestoTriggerPoint);

            if (scrollPosition >= a37ManifestoTriggerPoint) {
                let a37ManifestoDelta = scrollPosition - a37ManifestoTriggerPoint;

                if (a37ManifestoDelta <= 0) {

                    a37ManifestoImage.style.transform = `translateX(0px)`;
                    a37ManifestoImage.style.opacity = `0`;
                } else if (a37ManifestoDelta >= a37ManifestoScrollRange) {
                    a37ManifestoImage.style.transform = `translateX(-20px)`;
                    a37ManifestoImage.style.opacity = `0.3`;
                } else {
                    let a37ManifestoProgress = a37ManifestoDelta / a37ManifestoScrollRange;
                    let a37ManifestoCurrentTranslateX = Math.ceil(-20 * a37ManifestoProgress);

                    a37ManifestoImage.style.transform = `translateX(${a37ManifestoCurrentTranslateX}px)`;
                    a37ManifestoImage.style.opacity = `0.3`;
                }
            }
        }
        if(welcomeSection) {
            let welcomeTriggerPoint = welcomeSection.offsetTop - window.innerHeight + welcomeHeight;

            if (scrollPosition >= welcomeTriggerPoint) {
                const welcomeDelta = scrollPosition - welcomeTriggerPoint;

                if (welcomeDelta <= 0) {
                    welcomeImageBlock.style.width = `${welcomeMinWidth}%`;
                    welcomeSecondImage.style.transform = `translateX(0px)`;
                    welcomeSecondImage.style.opacity = `0`;
                } else if (welcomeDelta >= welcomeScrollRange) {
                    welcomeImageBlock.style.width = `${welcomeMaxWidth}%`;
                    welcomeSecondImage.style.transform = `translateX(-20px)`;
                    welcomeSecondImage.style.opacity = `0.3`;
                } else {
                    let progress = welcomeDelta / welcomeScrollRange;

                    let currentWidth = welcomeMinWidth + (welcomeMaxWidth - welcomeMinWidth) * progress;
                    let currentTranslateX = -20 * progress;

                    welcomeImageBlock.style.width = `${currentWidth}%`;
                    welcomeSecondImage.style.transform = `translateX(${currentTranslateX}px)`;
                    welcomeSecondImage.style.opacity = `0.3`;
                }
            }

        }
    });

});
