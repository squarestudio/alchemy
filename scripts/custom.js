window.Squarespace.onInitialize(Y, function() {

    const path = window.location.pathname;

    document.querySelectorAll('[data-navigation-link]').forEach(link => {
        if (link.getAttribute('href') === path) {
            link.classList.add('Mobile-overlay-nav-item--active');
        } else {
            link.classList.remove('Mobile-overlay-nav-item--active');
        }
    });

    if(!sessionStorage.getItem("enroll")) {
        setTimeout(function(){
            // document.body.classList.add('enroll');
        },5000)
    }
    document.addEventListener('click', function (e) {
        const enrollEl = document.getElementById('alchemyEnroll');
        const codeBlock = enrollEl.querySelector('.code-block');

        if (enrollEl.contains(e.target)) {
            // Case 1: click directly on #alchemyEnroll, but NOT its children
            if (e.target === enrollEl || codeBlock.contains(e.target)) {
                document.body.classList.remove('enroll');
                sessionStorage.setItem("enroll", "enroll");
            }
        }
    });

    /* ------------ HEADER GRADIENT ------------ */
    const header = document.querySelector(".Mobile-bar.Mobile-bar--top");
    const mobileOverlay = document.querySelector(".Mobile-overlay-menu");

    const allGradientStops = [
        "#FFDC00",
        "#FF8B92",
        "#BD00C6",
        "#F25E8F",
        "#FF9700",
        "#F8EC1B",
        "#99ED61",
        "#06E181",
        "#00C3B2"
    ];

    function getGradientColorsByHeight(allStops, pageHeight) {
        const minHeight = 1000;
        const maxHeight = 9000;
        const totalStops = allStops.length;

        let count;

        if (pageHeight <= minHeight) {
            count = 1;
        } else if (pageHeight >= maxHeight) {
            count = totalStops;
        } else {
            const percent = (pageHeight - minHeight) / (maxHeight - minHeight);
            count = Math.round(1 + percent * (totalStops - 1));
        }

        return allStops.slice(0, count);
    }

    // Replace gradientStops with result
    const pageHeight = document.body.scrollHeight;
    const gradientStops = getGradientColorsByHeight(allGradientStops, pageHeight);

    function interpolateColor(color1, color2, factor) {
        const c1 = parseInt(color1.slice(1), 16);
        const c2 = parseInt(color2.slice(1), 16);
        const r1 = (c1 >> 16) & 0xff,
            g1 = (c1 >> 8) & 0xff,
            b1 = c1 & 0xff;
        const r2 = (c2 >> 16) & 0xff,
            g2 = (c2 >> 8) & 0xff,
            b2 = c2 & 0xff;

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
        const start = rect.top + window.scrollY;
        const end = rect.bottom + window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;

        const startPercent = Math.min(Math.max(start / docHeight, 0), 1);
        const endPercent = Math.min(Math.max(end / docHeight, 0), 1);

        return [startPercent, endPercent];
    }

    function applyGradientToElement(element) {
        if (!element) return;
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

    // Delay gradient update until DOM is really ready
    function waitForRender(callback) {
        let lastHeight = 0;
        let tries = 0;
        const maxTries = 10;

        const check = () => {
            const currentHeight = document.body.scrollHeight;
            if (currentHeight !== lastHeight || tries < 2) {
                lastHeight = currentHeight;
                tries++;
                requestAnimationFrame(check);
            } else {
                callback();
            }
        };
        check();
    }

    // Initial run
    waitForRender(updateGradients);

    // Update on scroll
    window.addEventListener("scroll", updateGradients);

    // Observe menu toggle
    const observer = new MutationObserver(() => {
        const isMenuOpen = document.body.classList.contains("is-mobile-overlay-active");
        if (!isMenuOpen) {
            updateGradients();
        }
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });


    /* ------------ HERO ------------ */
    let heroSection = document.getElementById("hero");
    if (heroSection && heroSection.querySelector(".col:nth-child(2)")) {
        heroSection.querySelector(".col:nth-child(2)").classList.add("image-blur");
    }
    if(heroSection && window.innerWidth < 768) {
        heroSection.querySelector(".sqs-layout > .row:nth-child(1)").style.height = (window.innerHeight - 114) + "px";
    }


    let heroLanding = document.getElementById("hero-landing");
    if(heroLanding && window.innerWidth < 768) {
        heroLanding.style.height = (window.innerHeight - 114) + "px";
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
    let formulaLanding = document.getElementById("formula-landing");
    if(formulaLanding && window.innerWidth <= 1024) {
        let formulaSwiper = new Swiper('#formula-landing .swiper', {
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
    let meltLimitsSection = document.getElementById("benefitsofheat");
    if(meltLimitsSection && window.innerWidth <= 1024) {
        let meltTheLimitsSwiper = new Swiper('#benefitsofheat .swiper', {
            slidesPerView: "1",
            spaceBetween: 24,
            autoHeight: true,
            pagination: {
                el: '.swiper-pagination',
            },
        });
    }

    /* ------------ NEUE SEITE ------------ */
    let neueSeiteSection = document.getElementById("neue-seite");
    let neueSeiteImage;
    if(neueSeiteSection) {
        neueSeiteImage = neueSeiteSection.querySelector(".Index-page-content .sqs-col-12>.image-block:nth-child(2)");

        if(window.innerWidth < 768) {
            neueSeiteSection.querySelector(".sqs-layout .sqs-col-12").style.height = (window.innerHeight - 72) + "px";
        }
    }


    /* ------------ BLOG ------------ */
    let blogSection = document.getElementById("blog");
    if(blogSection) {
        let blogLength = blogSection.querySelectorAll('.blog-item:not(.more-is-coming)').length;
        let blogSwiper;
        let blogHeight;
        if(blogLength > 2) {
            blogSwiper = new Swiper('#blog .swiper', {
                slidesPerView: 1,
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

            blogHeight = blogSection.querySelector('.swiper-wrapper').offsetHeight;

            if(window.innerWidth >= 1025) {
                blogSwiper.on('slideChange', () => {
                    const realSlideCount = blogSwiper.slides.length;
                    if (blogSwiper.activeIndex === 0 || blogSwiper.activeIndex === realSlideCount - 1) {
                        blogSwiper.slideTo(blogSwiper.previousIndex);
                    }
                });
            }
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

        if(window.innerWidth < 1025) {
            sanctuarySection.querySelector(".Index-page-content .sqs-layout .sqs-col-12").style.height = window.innerHeight + 53 + "px";
            sanctuarySection.querySelector(".Index-page-content .sqs-layout .sqs-col-12 > .row:nth-child(2)").style.height = window.innerHeight + "px";
        }
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
        const items = classesSection.querySelectorAll('.Index-page-content > .sqs-layout > .row:nth-child(2) > .sqs-col-12 > .row > .col.item');

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
        if(window.innerWidth < 1025) {
            a37ManifestoSection.querySelector(".Index-page-content").style.height = (window.innerHeight - 72) + "px";
        }

    }


    /* ------------ WELCOME & JOIN ------------ */
    let welcomeJoinSection = document.getElementById("welcome-and-join");
    let welcomeHeight;
    let welcomeImageBlock;
    let welcomeSecondImage;
    let welcomeScrollRange;
    let welcomeMinWidth;
    let welcomeMaxWidth;
    let welcomeLayoutWidth;
    if(welcomeJoinSection) {
        welcomeImageBlock = welcomeJoinSection.querySelector("#welcomeBlock .sqs-col-12>.row .col:first-child");
        welcomeSecondImage = welcomeJoinSection.querySelector("#welcomeBlock .sqs-col-12>.row .col:first-child .image-block+.image-block .image-block-wrapper>div img");
        welcomeMinWidth = 25; // в %
        welcomeMaxWidth = 58.333; // в %

        if(welcomeJoinSection.querySelector("#welcomeBlock").length) {
            welcomeImageBlock.style.width = `${welcomeMinWidth}%`;
            welcomeSecondImage.style.transform = `translateX(0px)`;
            welcomeSecondImage.style.opacity = `0`;

            welcomeHeight = welcomeJoinSection.querySelector('#welcomeBlock').offsetHeight - 120;

            welcomeLayoutWidth = welcomeJoinSection.querySelector('.sqs-layout').offsetWidth - 24;
            let welcomeInitialWidth = (welcomeLayoutWidth/100)*25;
            let welcomeFinalWidth = (welcomeLayoutWidth/100)*58.333;
            welcomeScrollRange = Math.ceil(welcomeFinalWidth - welcomeInitialWidth);
        }

        let joinSection = welcomeJoinSection.querySelector('#joinBlock');
        let fNameInputs = joinSection.querySelectorAll('input[name="fname"]');
        fNameInputs.forEach(input => {
            input.setAttribute('placeholder', 'Full Name');
        });
        setTimeout(function(){
            let newForm = joinSection.querySelector('.form-block');

            let newsletterFirstNameInput = newForm.querySelector('fieldset div.first-name input');
            newsletterFirstNameInput.setAttribute('placeholder', 'Full Name');

            let newsletterLastNameInput = newForm.querySelector('fieldset div.last-name input');
            newsletterLastNameInput.value = '-';

            let newsletterButton = newForm.querySelector('button[type="submit"]');
            if (!newsletterButton.querySelector('svg')) {
                let joinSVG = `<svg width="203" height="69" viewBox="0 0 203 69" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="morph" d="M 27 0.5 H 176 C 190.636 0.5 202.5 12.3645 202.5 27 V 28.625 C 202.5 42.3631 191.363 53.5 177.625 53.5 H 131.684 C 128.453 53.5 125 53.5 120 53.5 C 113 53.5 113 53.5 107 53.5 L 107 53.5 C 103 53.5 99.9155 53.5 96.667 53.5 H 83.3975 C 78.7805 53.5002 77 53.5 75 53.5 L 72 53.5 C 64 53.5 64 53.5 56 53.5 C 57 53.5 47.8295 53.5 43.0273 53.5 H 25.375 C 11.6369 53.5 0.5 42.3631 0.5 28.625 V 27 C 0.5 12.3645 12.3645 0.5 27 0.5 Z" stroke="#303030" fill="#303030"/><path class="morph-hover" d="M27 0.5H176C190.636 0.500001 202.5 12.3645 202.5 27V28.625C202.5 42.3631 191.363 53.5 177.625 53.5H131.684C128.453 53.5 125.305 54.5237 122.692 56.4238C117.782 59.9953 111.15 60.0724 106.157 56.6162L105.758 56.3398C103.087 54.4908 99.9155 53.5 96.667 53.5H83.3975C78.7805 53.5002 74.6009 56.2315 72.7471 60.46L71.8926 62.4102C68.2076 70.8152 56.0424 70.0571 53.4287 61.2598C52.061 56.6566 47.8295 53.5 43.0273 53.5H25.375C11.6369 53.5 0.5 42.3631 0.5 28.625V27C0.5 12.3645 12.3645 0.5 27 0.5Z" stroke="#303030" fill="#303030"/></svg>`;
                newsletterButton.insertAdjacentHTML('afterbegin', joinSVG);
            }
            newsletterFirstNameInput.addEventListener('input', function(event) {
                console.log('yes');
                newsletterLastNameInput.value = '-';
            });
            if(window.innerWidth > 1024) {
                newsletterButton.addEventListener("mouseenter", () => {
                    TweenMax.to("#joinBlock .form-block button[type=\"submit\"] .morph", 1, {
                        ease:Power2.easeInOut, morphSVG:"#joinBlock .form-block button[type=\"submit\"] .morph-hover", yoyo: false
                    });
                });
                newsletterButton.addEventListener("mouseleave", () => {
                    TweenMax.to("#joinBlock .form-block button[type=\"submit\"] .morph", 1, {
                        ease:Power2.easeInOut, morphSVG:"#joinBlock .form-block button[type=\"submit\"] .morph", yoyo: false
                    });
                });
            }


            newForm.querySelector('div.option input[type="checkbox"]').checked = true;
        }, 1000)

        let joinButton = joinSection.querySelector('button.newsletter-form-button');
        if (!joinButton.querySelector('svg')) {
            let joinSVG = `<svg width="203" height="69" viewBox="0 0 203 69" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="morph" d="M 27 0.5 H 176 C 190.636 0.5 202.5 12.3645 202.5 27 V 28.625 C 202.5 42.3631 191.363 53.5 177.625 53.5 H 131.684 C 128.453 53.5 125 53.5 120 53.5 C 113 53.5 113 53.5 107 53.5 L 107 53.5 C 103 53.5 99.9155 53.5 96.667 53.5 H 83.3975 C 78.7805 53.5002 77 53.5 75 53.5 L 72 53.5 C 64 53.5 64 53.5 56 53.5 C 57 53.5 47.8295 53.5 43.0273 53.5 H 25.375 C 11.6369 53.5 0.5 42.3631 0.5 28.625 V 27 C 0.5 12.3645 12.3645 0.5 27 0.5 Z" stroke="#303030" fill="#303030"/><path class="morph-hover" d="M27 0.5H176C190.636 0.500001 202.5 12.3645 202.5 27V28.625C202.5 42.3631 191.363 53.5 177.625 53.5H131.684C128.453 53.5 125.305 54.5237 122.692 56.4238C117.782 59.9953 111.15 60.0724 106.157 56.6162L105.758 56.3398C103.087 54.4908 99.9155 53.5 96.667 53.5H83.3975C78.7805 53.5002 74.6009 56.2315 72.7471 60.46L71.8926 62.4102C68.2076 70.8152 56.0424 70.0571 53.4287 61.2598C52.061 56.6566 47.8295 53.5 43.0273 53.5H25.375C11.6369 53.5 0.5 42.3631 0.5 28.625V27C0.5 12.3645 12.3645 0.5 27 0.5Z" stroke="#303030" fill="#303030"/></svg>`;
            joinButton.insertAdjacentHTML('afterbegin', joinSVG);
        }

        if(window.innerWidth > 1024) {
            joinButton.addEventListener("mouseenter", () => {
                TweenMax.to("#joinBlock button.newsletter-form-button .morph", 1, {
                    ease:Power2.easeInOut, morphSVG:"#joinBlock button.newsletter-form-button .morph-hover", yoyo: false
                });
            });
            joinButton.addEventListener("mouseleave", () => {
                TweenMax.to("#joinBlock button.newsletter-form-button .morph", 1, {
                    ease:Power2.easeInOut, morphSVG:"#joinBlock button.newsletter-form-button .morph", yoyo: false
                });
            });
        }
    }


    /* ------------ PRICING IMAGES ------------ */
    let piSection = document.getElementById("pricing-images");
    let piFirstImage;
    let piSecondImage;
    if(piSection) {
        piFirstImage = piSection.querySelector(".Index-page-content .sqs-col-12 > .row > .col:first-child .image-block + .image-block");
        piSecondImage = piSection.querySelector(".Index-page-content .sqs-col-12 > .row > .col:last-child .image-block + .image-block");
    }


    /* ------------ WHO WE ARE  ------------ */
    let wwaSection = document.getElementById("who-we-are-images");
    let wwaSmallImage;
    let wwaBigImage;
    if(wwaSection) {
        wwaSmallImage = wwaSection.querySelector(".Index-page-content .sqs-col-12>.row:first-child .col:last-child");
        wwaBigImage = wwaSection.querySelector(".Index-page-content .sqs-col-12>.row:nth-child(2) .col:last-child");
    }


    /* ------------ A37 CLASSES ------------ */
    let combineSection = document.getElementById("at-alchemy-37-we-combine");
    let combineFirstImage;
    let combineSecondImage;
    if(combineSection) {
        combineFirstImage = combineSection.querySelector(".Index-page-content .sqs-col-12 > .row:last-child > .col:first-child .image-block + .image-block");
        combineSecondImage = combineSection.querySelector(".Index-page-content .sqs-col-12 > .row:last-child > .col:last-child .image-block + .image-block");
    }


    /* ------------ STUDIO ------------ */
    let studioSection = document.getElementById("studio");
    let studioImage;
    if(studioSection) {
        studioImage = studioSection.querySelector(".Index-page-content .sqs-col-12>.row .col:last-child");
    }


    /* ------------ BLOG ITEM ------------ */
    let blogItem = document.querySelector(".BlogItem");
    let blogImage;
    if(blogItem) {
        blogImage = blogItem.querySelector(".article-header .article-image img:last-child");
    }

    let footerButton = document.querySelector('.Footer button.newsletter-form-button');

    if (!footerButton.querySelector('svg')) {
        let footerSVG = `<svg width="203" height="69" viewBox="0 0 203 69" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="morph" d="M 27 0.5 H 176 C 190.636 0.5 202.5 12.3645 202.5 27 V 28.625 C 202.5 42.3631 191.363 53.5 177.625 53.5 H 131.684 C 128.453 53.5 125 53.5 120 53.5 C 113 53.5 113 53.5 107 53.5 L 107 53.5 C 103 53.5 99.9155 53.5 96.667 53.5 H 83.3975 C 78.7805 53.5002 77 53.5 75 53.5 L 72 53.5 C 64 53.5 64 53.5 56 53.5 C 57 53.5 47.8295 53.5 43.0273 53.5 H 25.375 C 11.6369 53.5 0.5 42.3631 0.5 28.625 V 27 C 0.5 12.3645 12.3645 0.5 27 0.5 Z" stroke="#303030"/><path class="morph-hover" d="M27 0.5H176C190.636 0.500001 202.5 12.3645 202.5 27V28.625C202.5 42.3631 191.363 53.5 177.625 53.5H131.684C128.453 53.5 125.305 54.5237 122.692 56.4238C117.782 59.9953 111.15 60.0724 106.157 56.6162L105.758 56.3398C103.087 54.4908 99.9155 53.5 96.667 53.5H83.3975C78.7805 53.5002 74.6009 56.2315 72.7471 60.46L71.8926 62.4102C68.2076 70.8152 56.0424 70.0571 53.4287 61.2598C52.061 56.6566 47.8295 53.5 43.0273 53.5H25.375C11.6369 53.5 0.5 42.3631 0.5 28.625V27C0.5 12.3645 12.3645 0.5 27 0.5Z" stroke="#303030"/></svg>`;
        footerButton.insertAdjacentHTML('afterbegin', footerSVG);
    }

    if(window.innerWidth > 1024) {
        footerButton.addEventListener("mouseenter", () => {
            TweenMax.to(".Footer button.newsletter-form-button .morph", 1, {
                ease:Power2.easeInOut, morphSVG:".Footer button.newsletter-form-button .morph-hover", yoyo: false
            });
        });
        footerButton.addEventListener("mouseleave", () => {
            TweenMax.to(".Footer button.newsletter-form-button .morph", 1, {
                ease:Power2.easeInOut, morphSVG:".Footer button.newsletter-form-button .morph", yoyo: false
            });
        });
    }


    const bookButton = document.getElementById("book-button");
    const heroButton = document.getElementById("hero-button");
    const sweatyButton = document.getElementById("sweaty-button");
    const timetableButton = document.getElementById("timetable-button");
    const potentialButton = document.getElementById("potential-button");

    if(bookButton && window.innerWidth > 1024) {
        bookButton.addEventListener("mouseenter", () => {
            TweenMax.to("#book-button .morph", 1, {
                ease:Power2.easeInOut, morphSVG:"#book-button .morph-hover", yoyo: false
            });
        });
        bookButton.addEventListener("mouseleave", () => {
            TweenMax.to("#book-button .morph", 1, {
                ease:Power2.easeInOut, morphSVG:"#book-button .morph", yoyo: false
            });
        });
    }
    if(heroButton && window.innerWidth > 1024) {
        heroButton.addEventListener("mouseenter", () => {
            TweenMax.to("#hero-button .morph", 1, {
                ease:Power2.easeInOut, morphSVG:"#hero-button .morph-hover", yoyo: false
            });
        });
        heroButton.addEventListener("mouseleave", () => {
            TweenMax.to("#hero-button .morph", 1, {
                ease:Power2.easeInOut, morphSVG:"#hero-button .morph", yoyo: false
            });
        });
    }
    if(sweatyButton && window.innerWidth > 1024) {
        sweatyButton.addEventListener("mouseenter", () => {
            TweenMax.to("#sweaty-button .morph", 1, {
                ease:Power2.easeInOut, morphSVG:"#sweaty-button .morph-hover", yoyo: false
            });
        });
        sweatyButton.addEventListener("mouseleave", () => {
            TweenMax.to("#sweaty-button .morph", 1, {
                ease:Power2.easeInOut, morphSVG:"#sweaty-button .morph", yoyo: false
            });
        });
    }
    if(timetableButton && window.innerWidth > 1024) {
        timetableButton.addEventListener("mouseenter", () => {
            TweenMax.to("#timetable-button .morph", 1, {
                ease:Power2.easeInOut, morphSVG:"#timetable-button .morph-hover", yoyo: false
            });
        });
        timetableButton.addEventListener("mouseleave", () => {
            TweenMax.to("#timetable-button .morph", 1, {
                ease:Power2.easeInOut, morphSVG:"#timetable-button .morph", yoyo: false
            });
        });
    }
    if(potentialButton && window.innerWidth > 1024) {
        potentialButton.addEventListener("mouseenter", () => {
            TweenMax.to("#potential-button .morph", 1, {
                ease:Power2.easeInOut, morphSVG:"#potential-button .morph-hover", yoyo: false
            });
        });
        potentialButton.addEventListener("mouseleave", () => {
            TweenMax.to("#potential-button .morph", 1, {
                ease:Power2.easeInOut, morphSVG:"#potential-button .morph", yoyo: false
            });
        });
    }

    // const waitlistTriggers = [
    //     '#book-button',
    //     '#hero-button',
    //     '.Mobile-overlay-book a'
    // ];
    //
    // waitlistTriggers.forEach(selector => {
    //     const el = document.querySelector(selector);
    //     if (el) {
    //         el.addEventListener('click', e => {
    //             e.preventDefault();
    //             e.stopPropagation();
    //             document.body.classList.add('waitlist');
    //         });
    //     }
    // });


    if(document.getElementById("faq-items")) {
        let faqButtonHref = document.querySelector("#faq-items .faq-columns > .col:first-child p:last-child a").getAttribute('href');
        let faqButtonText = document.querySelector("#faq-items .faq-columns > .col:first-child p:last-child a").innerText;
        document.querySelector("#faq-items .faq-columns > .col:first-child p:last-child").innerHTML = `<a href="${faqButtonHref}" id="faq-button" class="alchemy-button"><svg width="205" height="71" viewBox="-1 -1 205 71" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="morph" d="M 27 0.5 H 176 C 190.636 0.5 202.5 12.3645 202.5 27 V 28.625 C 202.5 42.3631 191.363 53.5 177.625 53.5 H 131.684 C 128.453 53.5 125 53.5 120 53.5 C 113 53.5 113 53.5 107 53.5 L 107 53.5 C 103 53.5 99.9155 53.5 96.667 53.5 H 83.3975 C 78.7805 53.5002 77 53.5 75 53.5 L 72 53.5 C 64 53.5 64 53.5 56 53.5 C 57 53.5 47.8295 53.5 43.0273 53.5 H 25.375 C 11.6369 53.5 0.5 42.3631 0.5 28.625 V 27 C 0.5 12.3645 12.3645 0.5 27 0.5 Z" stroke-width="2" stroke="#303030"/><path class="morph-hover" d="M27 0.5H176C190.636 0.500001 202.5 12.3645 202.5 27V28.625C202.5 42.3631 191.363 53.5 177.625 53.5H131.684C128.453 53.5 125.305 54.5237 122.692 56.4238C117.782 59.9953 111.15 60.0724 106.157 56.6162L105.758 56.3398C103.087 54.4908 99.9155 53.5 96.667 53.5H83.3975C78.7805 53.5002 74.6009 56.2315 72.7471 60.46L71.8926 62.4102C68.2076 70.8152 56.0424 70.0571 53.4287 61.2598C52.061 56.6566 47.8295 53.5 43.0273 53.5H25.375C11.6369 53.5 0.5 42.3631 0.5 28.625V27C0.5 12.3645 12.3645 0.5 27 0.5Z" stroke-width="2" stroke="#303030"/></svg><span>${faqButtonText}</span></a>`;

        let faqButton = document.getElementById("faq-button");
        if(faqButton && window.innerWidth > 1024) {
            faqButton.addEventListener("mouseenter", () => {
                TweenMax.to("#faq-button .morph", 1, {
                    ease:Power2.easeInOut, morphSVG:"#faq-button .morph-hover", yoyo: false
                });
            });
            faqButton.addEventListener("mouseleave", () => {
                TweenMax.to("#faq-button .morph", 1, {
                    ease:Power2.easeInOut, morphSVG:"#faq-button .morph", yoyo: false
                });
            });
        }
    }

    function handleScroll() {
        const scrollPosition = window.scrollY || window.pageYOffset;

        if(benefitsSection) {
            let benefitsTriggerPoint = benefitsSection.offsetTop - window.innerHeight + benefitsHeight + 100;
            if (scrollPosition >= benefitsTriggerPoint) {
                const delta = scrollPosition - benefitsTriggerPoint;
                if (delta <= 0) {
                    benefitsImageBlock.style.width = `${benefitsMinWidth}%`;
                    benefitsSecondImage.style.transform = `translateX(0px)`;
                    benefitsSecondImage.style.opacity = `0`;
                } else if (delta >= benefitsScrollRange) {
                    benefitsImageBlock.style.width = `${benefitsMaxWidth}%`;
                    benefitsSecondImage.style.transform = `translateX(-40px)`;
                    benefitsSecondImage.style.opacity = `0.3`;
                } else {
                    const progress = delta / benefitsScrollRange;

                    const currentWidth = benefitsMinWidth + (benefitsMaxWidth - benefitsMinWidth) * progress;
                    const currentTranslateX = -40 * progress;

                    benefitsImageBlock.style.width = `${currentWidth}%`;
                    benefitsSecondImage.style.transform = `translateX(${currentTranslateX}px)`;
                    benefitsSecondImage.style.opacity = `0.3`;
                }
            }
        }
        if(sanctuarySection) {
            let sanctuaryTriggerPoint = sanctuarySection.offsetTop - 120;
            let sanctuarySecondTriggerPoint = sanctuarySection.offsetTop;
            let sanctuaryThirdTriggerPoint = sanctuarySection.offsetTop + 140;
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
                    sanctuaryBigImage.style.transform = `translate(-50px, -43%)`;
                    sanctuaryBigImage.style.opacity = `0.3`;
                } else {
                    let sanctuaryProgress = sanctuarySDelta / sanctuaryScrollTwoRange;
                    let sanctuaryCurrentTranslateX = Math.ceil(-50 * sanctuaryProgress);

                    sanctuaryBigImage.style.transform = `translate(${sanctuaryCurrentTranslateX}px, -43%)`;
                    sanctuaryBigImage.style.opacity = `0.3`;
                }
            }
        }
        if(neueSeiteSection) {
            let neueTriggerPoint = neueSeiteSection.offsetTop - 120;
            let neueSecondTriggerPoint = neueSeiteSection.offsetTop;
            let neueScrollRange = Math.ceil(neueSecondTriggerPoint - neueTriggerPoint);

            if (scrollPosition >= neueTriggerPoint) {
                let neueDelta = scrollPosition - neueTriggerPoint;

                if (neueDelta <= 0) {
                    neueSeiteImage.style.transform = `translate(0px, -50%)`;
                    neueSeiteImage.style.opacity = `0`;
                } else if (neueDelta >= neueScrollRange) {
                    neueSeiteImage.style.transform = `translate(-50px, -50%)`;
                    neueSeiteImage.style.opacity = `0.3`;
                } else {
                    let neueProgress = neueDelta / neueScrollRange;
                    let neueCurrentTranslateX = Math.ceil(-50 * neueProgress);

                    neueSeiteImage.style.transform = `translate(${neueCurrentTranslateX}px, -50%)`;
                    neueSeiteImage.style.opacity = `0.3`;
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
            let a37ManifestoSecondTriggerPoint = a37ManifestoSection.offsetTop + 200;
            let a37ManifestoScrollRange = Math.ceil(a37ManifestoSecondTriggerPoint - a37ManifestoTriggerPoint);

            if (scrollPosition >= a37ManifestoTriggerPoint) {
                let a37ManifestoDelta = scrollPosition - a37ManifestoTriggerPoint;

                if (a37ManifestoDelta <= 0) {

                    a37ManifestoImage.style.transform = `translateX(0px)`;
                    a37ManifestoImage.style.opacity = `0`;
                } else if (a37ManifestoDelta >= a37ManifestoScrollRange) {
                    a37ManifestoImage.style.transform = `translateX(-50px)`;
                    a37ManifestoImage.style.opacity = `0.3`;
                } else {
                    let a37ManifestoProgress = a37ManifestoDelta / a37ManifestoScrollRange;
                    let a37ManifestoCurrentTranslateX = Math.ceil(-50 * a37ManifestoProgress);

                    a37ManifestoImage.style.transform = `translateX(${a37ManifestoCurrentTranslateX}px)`;
                    a37ManifestoImage.style.opacity = `0.3`;
                }
            }
        }
        if(welcomeJoinSection) {
            let welcomeTriggerPoint = welcomeJoinSection.offsetTop - window.innerHeight + welcomeHeight + 150;

            if (scrollPosition >= welcomeTriggerPoint) {
                const welcomeDelta = scrollPosition - welcomeTriggerPoint;
                if (welcomeDelta <= 0) {
                    welcomeImageBlock.style.width = `${welcomeMinWidth}%`;
                    welcomeSecondImage.style.transform = `translateX(0px)`;
                    welcomeSecondImage.style.opacity = `0`;
                } else if (welcomeDelta >= welcomeScrollRange) {
                    welcomeImageBlock.style.width = `${welcomeMaxWidth}%`;
                    welcomeSecondImage.style.transform = `translateX(-30px)`;
                    welcomeSecondImage.style.opacity = `0.3`;
                } else {
                    let progress = welcomeDelta / welcomeScrollRange;

                    let currentWidth = welcomeMinWidth + (welcomeMaxWidth - welcomeMinWidth) * progress;
                    let currentTranslateX = -30 * progress;

                    welcomeImageBlock.style.width = `${currentWidth}%`;
                    welcomeSecondImage.style.transform = `translateX(${currentTranslateX}px)`;
                    welcomeSecondImage.style.opacity = `0.3`;
                }
            }

        }

        if(piSection) {
            let piTriggerPoint = piSection.offsetTop - 100;
            let piSecondTriggerPoint = piSection.offsetTop;
            let piScrollRange = Math.ceil(piSecondTriggerPoint - piTriggerPoint);

            if (scrollPosition >= piTriggerPoint) {
                let piDelta = scrollPosition - piTriggerPoint;

                if (piDelta <= 0) {
                    piFirstImage.style.transform = `translateX(0px)`;
                    piSecondImage.style.transform = `translateX(0px)`;
                } else if (piDelta >= piScrollRange) {
                    piFirstImage.style.transform = `translateX(-20px)`;
                    piSecondImage.style.transform = `translateX(-20px)`;
                } else {
                    let piProgress = piDelta / piScrollRange;
                    let piCurrentTranslateX = Math.ceil(-20 * piProgress);

                    piFirstImage.style.transform = `translateX(${piCurrentTranslateX}px)`;
                    piSecondImage.style.transform = `translateX(${piCurrentTranslateX}px)`;
                }
            }
        }

        if(wwaSection) {
            let wwaTriggerPoint = wwaSection.offsetTop;
            let wwaSecondTriggerPoint = wwaSection.offsetTop + 120;
            let wwaThirdTriggerPoint = wwaSection.offsetTop + 260;
            let wwaScrollOneRange = Math.ceil(wwaSecondTriggerPoint - wwaTriggerPoint);
            let wwaScrollTwoRange = Math.ceil(wwaThirdTriggerPoint - wwaSecondTriggerPoint);

            if (scrollPosition >= wwaTriggerPoint) {
                let wwaDelta = scrollPosition - wwaTriggerPoint;

                if (wwaDelta <= 0) {
                    wwaSmallImage.style.transform = `translateX(0px)`;
                    wwaSmallImage.style.opacity = `0`;
                } else if (wwaDelta >= wwaScrollOneRange) {
                    wwaSmallImage.style.transform = `translateX(-20px)`;
                    wwaSmallImage.style.opacity = `0.3`;
                } else {
                    let wwaProgress = wwaDelta / wwaScrollOneRange;
                    let wwaCurrentTranslateX = Math.ceil(-20 * wwaProgress);

                    wwaSmallImage.style.transform = `translateX(${wwaCurrentTranslateX}px)`;
                    wwaSmallImage.style.opacity = `0.3`;
                }
            }
            if (scrollPosition > wwaSecondTriggerPoint) {
                let wwaSDelta = scrollPosition - wwaSecondTriggerPoint;

                if (wwaSDelta <= 0) {
                    wwaBigImage.style.transform = `translateX(0px)`;
                    wwaBigImage.style.opacity = `0`;
                } else if (wwaSDelta >= wwaScrollTwoRange) {
                    wwaBigImage.style.transform = `translateX(-50px)`;
                    wwaBigImage.style.opacity = `0.3`;
                } else {
                    let wwaProgress = wwaSDelta / wwaScrollTwoRange;
                    let wwaCurrentTranslateX = Math.ceil(-50 * wwaProgress);

                    wwaBigImage.style.transform = `translateX(${wwaCurrentTranslateX}px)`;
                    wwaBigImage.style.opacity = `0.3`;
                }
            }
        }
        if(combineSection) {
            let combineTriggerPoint = combineSection.offsetTop + 300;
            let combineSecondTriggerPoint = combineSection.offsetTop + 500;
            let combineScrollRange = Math.ceil(combineSecondTriggerPoint - combineTriggerPoint);

            if (scrollPosition >= combineTriggerPoint) {
                let combineDelta = scrollPosition - combineTriggerPoint;

                if (combineDelta <= 0) {
                    combineFirstImage.style.transform = `translateX(0px)`;
                    combineSecondImage.style.transform = `translateX(0px)`;
                } else if (combineDelta >= combineScrollRange) {
                    combineFirstImage.style.transform = `translateX(-20px)`;
                    combineSecondImage.style.transform = `translateX(-20px)`;
                } else {
                    let combineProgress = combineDelta / combineScrollRange;
                    let combineCurrentTranslateX = Math.ceil(-20 * combineProgress);

                    combineFirstImage.style.transform = `translateX(${combineCurrentTranslateX}px)`;
                    combineSecondImage.style.transform = `translateX(${combineCurrentTranslateX}px)`;
                }
            }
        }
        if(studioSection) {
            let studioTriggerPoint = studioSection.offsetTop;
            let studioSecondTriggerPoint = studioSection.offsetTop + 100;
            let studioScrollRange = Math.ceil(studioSecondTriggerPoint - studioTriggerPoint);

            if (scrollPosition >= studioTriggerPoint) {
                let studioDelta = scrollPosition - studioTriggerPoint;

                if (studioDelta <= 0) {
                    studioImage.style.transform = `translateX(0px)`;
                    studioImage.style.opacity = `0`;
                } else if (studioDelta >= studioScrollRange) {
                    studioImage.style.transform = `translateX(-50px)`;
                    studioImage.style.opacity = `0.3`;
                } else {
                    let studioProgress = studioDelta / studioScrollRange;
                    let studioCurrentTranslateX = Math.ceil(-50 * studioProgress);

                    studioImage.style.transform = `translateX(${studioCurrentTranslateX}px)`;
                    studioImage.style.opacity = `0.3`;
                }
            }
        }

        if(blogItem) {
            let blogScrollRange = 120;
            if (scrollPosition >= 0) {
                let blogDelta = scrollPosition;

                if (blogDelta <= 0) {
                    blogImage.style.transform = `translateX(0px)`;
                    blogImage.style.opacity = `0`;
                } else if (blogDelta >= 120) {
                    blogImage.style.transform = `translateX(-50px)`;
                    blogImage.style.opacity = `0.3`;
                } else {
                    let blogProgress = scrollPosition / blogScrollRange;
                    let blogCurrentTranslateX = Math.ceil(-50 * blogProgress);

                    blogImage.style.transform = `translateX(${blogCurrentTranslateX}px)`;
                    blogImage.style.opacity = `0.3`;
                }
            }
        }
    }
    window.addEventListener('scroll', handleScroll);;
});P
