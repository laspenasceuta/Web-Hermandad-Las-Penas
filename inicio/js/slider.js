const slides = document.querySelectorAll('.image-slider .slide');
const nextBtn = document.querySelector('.image-slider .right');
const prevBtn = document.querySelector('.image-slider .left');

let current = 0;
let interval;
let isAnimating = false;

function goToSlide(nextIndex, direction) {
    if (isAnimating || nextIndex === current) return;
    isAnimating = true;

    const currentSlide = slides[current];
    const nextSlide = slides[nextIndex];

    // Posiciones iniciales
    nextSlide.style.transition = 'none';
    nextSlide.style.transform = direction === 'next'
        ? 'translateX(100%)'
        : 'translateX(-100%)';

    requestAnimationFrame(() => {
        nextSlide.style.transition = 'transform 2s ease';
        currentSlide.style.transition = 'transform 2s ease';

        currentSlide.style.transform = direction === 'next'
            ? 'translateX(-100%)'
            : 'translateX(100%)';

        nextSlide.style.transform = 'translateX(0)';
    });

    nextSlide.classList.add('active');
    currentSlide.classList.remove('active');

    setTimeout(() => {
        currentSlide.style.transition = 'none';
        currentSlide.style.transform = 'translateX(100%)';
        current = nextIndex;
        isAnimating = false;
    }, 2000);
}

function nextSlide() {
    const nextIndex = (current + 1) % slides.length;
    goToSlide(nextIndex, 'next');
}

function prevSlide() {
    const nextIndex = (current - 1 + slides.length) % slides.length;
    goToSlide(nextIndex, 'prev');
}

function startAuto() {
    interval = setInterval(nextSlide, 8000);
}

function resetAuto() {
    clearInterval(interval);
    startAuto();
}

nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAuto();
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAuto();
});

// Inicializar
slides.forEach((s, i) => {
    s.style.transform = i === 0 ? 'translateX(0)' : 'translateX(100%)';
});
slides[0].classList.add('active');

startAuto();