document.addEventListener('DOMContentLoaded', function () {
    // INPUTMASK
    Inputmask().mask(document.querySelectorAll('input'));

    // HEIGHT 100VH FIX FOR IOS
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // CALCULATION HEIGHT's
    const panel = document.querySelector('.panel')
    const products = document.querySelector('.products')
    const productsInnerTop = document.querySelector('.products__inner--top')

    if (panel) {
        document.documentElement.style.setProperty('--height', `${panel.getBoundingClientRect().height}px`);
    }
    if (products && productsInnerTop) {
        products.style.setProperty('--topHeight', `${productsInnerTop.getBoundingClientRect().height}px`);
    }

    // RESIZE
    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        if (panel) {
            document.documentElement.style.setProperty('--height', `${panel.getBoundingClientRect().height}px`);
        }
        if (products && productsInnerTop) {
            products.style.setProperty('--topHeight', `${productsInnerTop.getBoundingClientRect().height}px`);
        }
    });
    
    // SMOOTH SCROLL
    function currentYPosition() {
        // Firefox, Chrome, Opera, Safari
        if (self.pageYOffset) return self.pageYOffset;

        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop)
            return document.documentElement.scrollTop;
        
        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop) return document.body.scrollTop;

        return 0;
    } 
    
    function elmYPosition(eID) {
        let elm = document.getElementById(eID);
        let y = elm.offsetTop;
        let node = elm;
        while (node.offsetParent && node.offsetParent != document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
        } return y;
    }
    
    function smoothScroll(eID) {
        let startY = currentYPosition();
        let stopY = elmYPosition(eID);
        let paddingTop = Number(getComputedStyle(document.getElementById(eID)).paddingTop.replace('px', ''));
        if (paddingTop > 0) {
            stopY = elmYPosition(eID) + paddingTop;
        }
        let distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        let speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        let step = Math.round(distance / 25);
        let leapY = stopY > startY ? startY + step : startY - step;
        let timer = 0;
        if (stopY > startY) {
            for (let i = startY; i < stopY; i += step ) {
                setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for (let i = startY; i > stopY; i -= step ) {
            setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
    }

    // ALL LINKS SMOOTH SCROLL
    const allLinks = document.querySelectorAll('a[href^="#"]')

    if (allLinks) {
        allLinks.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault()
        
                setTimeout(() => {
                    if (item.getAttribute('href').length > 1) {
                        smoothScroll(item.getAttribute('href').slice(1))
                    }
                }, 500);
            })
        })
    }

    // SLIDE UP
    let slideUpQna = (target, duration = 400) => {
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.previousElementSibling.style.pointerEvents = 'none';
        window.setTimeout(() => {
            target.style.display = 'none';
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.previousElementSibling.style.pointerEvents = 'auto';
        }, duration);
        target.parentNode.classList.remove('is--open');
    }
    // SLIDE DOWN
    let slideDownQna = (target, duration = 400) => {
        target.style.removeProperty('display');
        let display = window.getComputedStyle(target).display;
        if (display === 'none') display = 'block';
        target.style.display = display;
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        target.previousElementSibling.style.pointerEvents = 'none';
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.previousElementSibling.style.pointerEvents = 'auto';
        }, duration);
        target.parentNode.classList.add('is--open');
    }
    // SLIDE TOGGLE
    let slideToggleQna = (target, duration = 400) => {
        if (window.getComputedStyle(target).display === 'none') {
            return slideDownQna(target, duration);
        } else {
            return slideUpQna(target, duration);
        }
    }

    // RIPPLE EFFECT
    function createRipple(event) {
        const button = event.currentTarget;

        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');
        
        const ripple = button.getElementsByClassName('ripple')[0];
        
        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
    }
      
    const buttons = document.querySelectorAll('.btn:not(.btn--transparent)');
    
    for (const button of buttons) {
        button.addEventListener('click', createRipple);
    }
    
    // EYE PASSWORD
    const inputEye = document.querySelectorAll('.input-group__eye-btn')
    const inputPassword = document.querySelectorAll('.input-group__input[type=password]')

    document.addEventListener('mousedown', evt => {
        if (evt.target.classList.contains('input-group__eye-btn')) {
            evt.preventDefault()
        }
    })
    
    if (inputEye) {
        inputEye.forEach((item) => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                const inputGroupControl = item.closest('.input-group__control')
                const inputCurrent = inputGroupControl.querySelector('input')

                if (inputCurrent.type == 'password') {
                    inputCurrent.type = 'text'

                    item.classList.add('input-group__eye-btn--show')
                } else {
                    inputCurrent.type = 'password'

                    item.classList.remove('input-group__eye-btn--show')
                }
            })
        })
    }

    // MOBILE MENU
    const hamburger = document.getElementById('hamburger-toggle')
    const navMenu = document.querySelector('.nav-menu')
    const navMenuLink = document.querySelectorAll('.nav-menu__link')

    if (hamburger) {
        hamburger.addEventListener('click', (event) => {
            event.preventDefault()

            if (hamburger.classList.contains('hamburger--active') && navMenu.classList.contains('nav-menu--active')) {
                hamburger.classList.remove('hamburger--active')
                navMenu.classList.remove('nav-menu--active')
                document.body.classList.remove('scroll-disabled')
            } else {
                hamburger.classList.add('hamburger--active')
                navMenu.classList.add('nav-menu--active')
                document.body.classList.add('scroll-disabled')
            }
        })
    }

    if (navMenuLink) {
        navMenuLink.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault()
    
                if (hamburger.classList.contains('hamburger--active') && navMenu.classList.contains('nav-menu--active')) {
                    hamburger.classList.remove('hamburger--active')
                    navMenu.classList.remove('nav-menu--active')
                    document.body.classList.remove('scroll-disabled')
                }
            })
        })
    }

    // DIFFERENCE TABLE
    const differenceTableBtn = document.querySelector('.table-btn')
    const differenceTableWrapper = document.querySelector('.difference-table')
    const differenceTableClose = document.querySelector('.difference-table__close')

    if (differenceTableBtn) {
        differenceTableBtn.addEventListener('click', (event) => {
            event.preventDefault()

            if (differenceTableWrapper.classList.contains('difference-table--active')) {
                differenceTableWrapper.classList.remove('difference-table--active')
                document.body.classList.remove('scroll-disabled')
            } else {
                differenceTableWrapper.classList.add('difference-table--active')
                document.body.classList.add('scroll-disabled')
            }
        })
    }

    if (differenceTableClose) {
        differenceTableClose.addEventListener('click', (event) => {
            event.preventDefault()

            if (differenceTableWrapper.classList.contains('difference-table--active')) {
                differenceTableWrapper.classList.remove('difference-table--active')
                document.body.classList.remove('scroll-disabled')
            }
        })
    }

    // SWIPER
    const productsSlider = document.querySelector('.products__slider .swiper-container')
    const advantagesSlider = document.querySelector('.advantages__slider .swiper-container')
    const howitworksSlider = document.querySelector('.howitworks__slider .swiper-container')

    if (productsSlider) {
        const productsItems = [...document.querySelectorAll('.products__item')]
        const productsLine = document.querySelectorAll('.products__line')
        const productsButtonPrev = document.querySelector('.swiper-button-prev')
        const productsButtonNext = document.querySelector('.swiper-button-next')

        const mySwiperProducts = new Swiper(productsSlider, {
            slidesPerView: 1,
            allowTouchMove: false,
            speed: 0,
        })

        function getMaxElementsHeight(elements) {

            const heights = elements.map(elements => {
                return elements.getBoundingClientRect().height;
            });              
            
            return Math.max.apply(null, heights);
        }

        let maxCellHeight = getMaxElementsHeight(productsItems)

        productsItems.forEach(item => {
            item.style.minHeight = maxCellHeight + 'px'
        })

        mySwiperProducts.on('slideChange', function () {
            if (mySwiperProducts.realIndex === 0) {
                document.querySelector('.swiper-button-prev').classList.add('swiper-button-disabled')
            } else if (mySwiperProducts.realIndex === mySwiperProducts.slides.length - 1) {
                document.querySelector('.swiper-button-next').classList.add('swiper-button-disabled')
            } else {
                if (document.querySelector('.swiper-button-prev').classList.contains('swiper-button-disabled')) {
                    document.querySelector('.swiper-button-prev').classList.remove('swiper-button-disabled')
                }
                if (document.querySelector('.swiper-button-next').classList.contains('swiper-button-disabled')) {
                    document.querySelector('.swiper-button-next').classList.remove('swiper-button-disabled')
                }
            }
        });

        productsButtonPrev.addEventListener('click', (event) => {
            event.preventDefault()

            if (productsButtonPrev.classList.contains('enabled') && mySwiperProducts.activeIndex > 0) {
                // Disable swiper buttons so user doesnt click again
                productsButtonPrev.classList.remove('enabled');
    
                // Hidden active slide
                document.querySelectorAll('.products__item').forEach((child) => child.classList.remove('products__item--active'))
                productsLine.forEach((child) => child.classList.remove('active'))
        
                setTimeout(() => {
                    mySwiperProducts.slidePrev()
    
                    // Visible slide
                    document.querySelectorAll('.products__item')[mySwiperProducts.activeIndex].classList.add('products__item--active')
                    productsLine.forEach((child) => child.classList.add('active'))

                }, 600);
    
                setTimeout(() => {
                    // Re-enable swiper buttons
                    productsButtonPrev.classList.add('enabled');

                }, 800);
            }
        });

        productsButtonNext.addEventListener('click', (event) => {
            event.preventDefault()

            if (productsButtonNext.classList.contains('enabled') && mySwiperProducts.activeIndex != mySwiperProducts.slides.length - 1) {
                // Disable swiper buttons so user doesnt click again
                productsButtonNext.classList.remove('enabled');
    
                // Hidden active slide
                document.querySelectorAll('.products__item').forEach((child) => child.classList.remove('products__item--active'))
                productsLine.forEach((child) => child.classList.remove('active'))
        
                setTimeout(() => mySwiperProducts.slideNext(), 600);
                setTimeout(() => {
                    // Re-enable swiper buttons
                    productsButtonNext.classList.add('enabled');
    
                    // Visible slide
                    document.querySelectorAll('.products__item')[mySwiperProducts.activeIndex].classList.add('products__item--active')
                    productsLine.forEach((child) => child.classList.add('active'))
                    
                }, 800);
            }
        });
    }

    if (advantagesSlider) {
        if (window.innerWidth >= 768) {
            const mySwiperAdvantages = new Swiper(advantagesSlider, {
                freeMode: true,
                slidesPerView: 'auto',
                centeredSlides: true,
                centeredSlidesBounds: true,
                spaceBetween: 30,
                breakpoints: {
                    1024: {
                        spaceBetween: 30,
                    },
                    768: {
                        spaceBetween: 20,
                    },
                },
            })
        }
    }

    if (howitworksSlider) {
        const mySwiperHowitworks = new Swiper(howitworksSlider, {
            slidesPerView: 'auto',
            centeredSlides: true,
            centeredSlidesBounds: true,
            speed: 1200,
            breakpoints: {
                768: {
                    slidesPerView: 1,
                    direction: 'vertical',
                    centeredSlidesBounds: false,
                },
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        })
    }
    
    // ANIMATIONS
    AOS.init({
        duration: 1200,
        once: true,
    })
    
    // SCROLL
    let prevScrollpos = window.pageYOffset;

    function getCoords(elem) {
        let box = elem.getBoundingClientRect();
        
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }

    window.addEventListener('scroll', () => {
        if (document.querySelector('.panel--scroll') && window.innerWidth >= 768) {
            const panelHeight = document.querySelector('.panel').getBoundingClientRect().height;
            const sectionWhite = document.querySelector('.section--white')
            const sectionWhiteNext = sectionWhite.nextElementSibling
            const panelLogotype = document.querySelector('.logotype')
            const top = document.querySelector('.top')

            let currentScrollPos = window.pageYOffset;
            if (prevScrollpos > currentScrollPos || prevScrollpos <= 0) { // If up
                if (window.pageYOffset <= getCoords(sectionWhite).top) {
                    if (getCoords(panelLogotype).top <= getCoords(sectionWhite).top) {
                        panelLogotype.classList.remove('logotype--black')
                    }
                    if (getCoords(document.querySelector('.hamburger')).top <= getCoords(sectionWhite).top) {
                        document.querySelector('.hamburger').classList.remove('hamburger--black')
                    }
                
                } else if (window.pageYOffset >= getCoords(sectionWhite).top && window.pageYOffset <= getCoords(sectionWhiteNext).top) {
                    if (getCoords(panelLogotype).top <= getCoords(sectionWhiteNext).top) {
                        panelLogotype.classList.add('logotype--black')
                    }
                    if (getCoords(document.querySelector('.hamburger')).top <= getCoords(sectionWhiteNext).top) {
                        document.querySelector('.hamburger').classList.add('hamburger--black')
                    }

                }
            } else { // If down
                if (window.pageYOffset >= (getCoords(sectionWhite).top - document.documentElement.clientHeight) && window.pageYOffset <= (getCoords(sectionWhiteNext).top - document.documentElement.clientHeight)) { // Second section 
                    if (getCoords(sectionWhite).top <= getCoords(panelLogotype).top) {
                        panelLogotype.classList.add('logotype--black')
                    }
                    if (getCoords(sectionWhite).top <= getCoords(document.querySelector('.hamburger')).top) {
                        document.querySelector('.hamburger').classList.add('hamburger--black')
                    }
                    //if (getCoords(sectionWhite).top <= (getCoords(top).top + top.getBoundingClientRect().height)) {
                    //    top.classList.add('top--transparent')
                    //}
                } else if (window.pageYOffset >= (getCoords(sectionWhiteNext).top - document.documentElement.clientHeight)) { // Last section
                    if (getCoords(sectionWhiteNext).top <= getCoords(panelLogotype).top) {
                        panelLogotype.classList.remove('logotype--black')
                    }
                    if (getCoords(sectionWhiteNext).top <= getCoords(document.querySelector('.hamburger')).top) {
                        document.querySelector('.hamburger').classList.remove('hamburger--black')
                    }
                }
            }
            prevScrollpos = currentScrollPos;
        }
    })
});