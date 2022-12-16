export default function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const slides = document.querySelectorAll(slide);
    const slider = document.querySelector(container);
    const total = document.querySelector(totalCounter);
    const current = document.querySelector(currentCounter);
    const prev = document.querySelector(prevArrow);
    const next = document.querySelector(nextArrow);
    const slidesWrapper = document.querySelector(wrapper);
    const slidesField = document.querySelector(field);
    const width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    current.textContent = countSymbols(slideIndex);
    total.textContent = countSymbols(slides.length);

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    const dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.classList.add('active');
        }
        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', () => {
        if (offset === pxToNumber(width) * (slides.length - 1)) { //'500px' -> 500
            offset = 0 ;
        } else {
            offset += pxToNumber(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        slideIndex === slides.length ? slideIndex = 1 : slideIndex++;

        current.textContent = countSymbols(slideIndex);

        regenerateDots(dots);
    });

    prev.addEventListener('click', () => {
        if (offset === 0) {
            offset = pxToNumber(width) * (slides.length - 1);
        } else {
            offset -= pxToNumber(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        slideIndex === 1 ? slideIndex = slides.length : slideIndex--;

        current.textContent = countSymbols(slideIndex);

        regenerateDots(dots);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (event) => {
            const slideTo = event.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = +width.replace(/\D/g, '') * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            current.textContent = countSymbols(slideIndex);
            regenerateDots(dots);
        });
    });

    function countSymbols(number) {
        return number < 10 ? `0${number}` : `${number}`;
    }

    function pxToNumber(string) {
        return +string.replace(/\D/g, '');
    }

    function regenerateDots(dots) {
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        dots[slideIndex - 1].classList.add('active');
    }
}
