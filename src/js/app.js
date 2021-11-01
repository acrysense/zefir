document.addEventListener('DOMContentLoaded', function () {
    // INPUTMASK
    Inputmask().mask(document.querySelectorAll('input'));

    // HEIGHT 100VH FIX FOR IOS
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        document.documentElement.style.setProperty('--height', `${panel.getBoundingClientRect().height}px`);
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
        if (document.querySelector('.header')) {
            stopY = elmYPosition(eID) - Number(document.querySelector('.header').clientHeight);
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
    
    function smoothScrollCoord(coord) {
        let startY = currentYPosition();
        let stopY = coord;
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
        
                if (item.getAttribute('href').length > 1) {
                    smoothScroll(item.getAttribute('href').slice(1))
                }
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

    // MODAL
    const modalBtn = document.querySelectorAll('.modal-btn')
    const modalClose = document.querySelectorAll('.modal__close, .modal__btn--close')
    const overlay = document.querySelector('.overlay')
    
    if (modalBtn) {
        modalBtn.forEach((item) => {
            item.addEventListener('click', (event) => {
                event.preventDefault();

                const modalID = item.dataset.id

                if (modalID) {
                    if (!overlay.classList.contains('overlay--active')) {
                        overlay.classList.add('overlay--active')
                    }
    
                    document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                    document.getElementById(modalID).classList.add('modal--active')
                    document.body.classList.add('scroll-disabled')
                }
            });
        });
    }

    document.body.addEventListener('keyup', (event) => {
        let key = event.keyCode;

        if (key == 27) {
            if (overlay.classList.contains('overlay--active')) {
                document.body.classList.remove('scroll-disabled')
                document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                overlay.classList.remove('overlay--active')
            }
        };
    }, false);

    if (modalClose) {
        modalClose.forEach((item) => {
            item.addEventListener('click', () => {
                if (overlay.classList.contains('overlay--active')) {
                    document.body.classList.remove('scroll-disabled')
                    document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                    overlay.classList.remove('overlay--active')
                }
            });
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            if (overlay.classList.contains('overlay--active')) {
                document.body.classList.remove('scroll-disabled')
                document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                overlay.classList.remove('overlay--active')
                swipeOverlay.classList.remove('swipe--active')
            }
        });
    }

    // PANEL
    const panel = document.querySelector('.panel')

    document.documentElement.style.setProperty('--height', `${panel.getBoundingClientRect().height}px`);

    // MOBILE MENU
    const hamburger = document.getElementById('hamburger-toggle')
    const navMenu = document.querySelector('.nav-menu')

    if (hamburger) {
        hamburger.addEventListener('click', (event) => {
            event.preventDefault()

            if (hamburger.classList.contains('hamburger--active')) {
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

    // SWIPER
    const howitworksSlider = document.querySelector('.howitworks__slider .swiper-container')  

    if (howitworksSlider) {
        const mySwiperHowitworks = new Swiper(howitworksSlider, {
            slidesPerView: 'auto',
            centeredSlides: true,
            centeredSlidesBounds: true,
            breakpoints: {
                768: {
                    slidesPerView: '1',
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
        if (document.querySelector('.panel') && window.innerWidth >= 768) {
            const panelHeight = document.querySelector('.panel').getBoundingClientRect().height;
            const sectionWhite = document.querySelector('.section--white')
            const sectionWhiteNext = document.querySelector('.section--white + .section--black')

            let currentScrollPos = window.pageYOffset;
            if (prevScrollpos > currentScrollPos || prevScrollpos <= 0) { // If up
                if (window.pageYOffset <= (getCoords(sectionWhite).top - document.documentElement.clientHeight)) {
                    document.querySelector('.hamburger').classList.remove('hamburger--black')
                }
            } else { // If down
                if (window.pageYOffset >= (getCoords(sectionWhite).top - document.documentElement.clientHeight)) {
                    if (getCoords(sectionWhite).top <= getCoords(document.querySelector('.hamburger')).top) {
                        document.querySelector('.hamburger').classList.add('hamburger--black')
                    }
                } else if (window.pageYOffset >= (getCoords(sectionWhiteNext).top - document.documentElement.clientHeight)) {
                    document.querySelector('.hamburger').classList.remove('hamburger--black')
                }
                console.log(window.pageYOffset, (getCoords(sectionWhiteNext).top - document.documentElement.clientHeight))
            }
            prevScrollpos = currentScrollPos;
        }
    })
});