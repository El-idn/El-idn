document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('nav ul li a');
    const menuIcon = document.getElementById('menu-icon');
    const navLinksContainer = document.getElementById('nav-links');

    menuIcon.addEventListener('click', function () {
        navLinksContainer.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            targetElement.scrollIntoView({
                behavior: 'smooth'
            });

            navLinksContainer.classList.remove('active');
        });
    });

    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const carousel = document.querySelector('.carousel');
    const projects = document.querySelectorAll('.project');
    const dotIndicatorsContainer = document.querySelector('.dot-indicators');
    let currentIndex = 0;
    const totalProjects = projects.length;
    const intervalTime = 3000;
    let slideInterval;

    // Create dot indicators
    for (let i = 0; i < totalProjects; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
            currentIndex = i;
            updateCarousel();
            clearInterval(slideInterval);
            slideInterval = setInterval(autoSlide, intervalTime);
        });
        dotIndicatorsContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll('.dot');
    dots[currentIndex].classList.add('active');

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? totalProjects - 1 : currentIndex - 1;
        updateCarousel();
        clearInterval(slideInterval);
        slideInterval = setInterval(autoSlide, intervalTime);
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex === totalProjects - 1) ? 0 : currentIndex + 1;
        updateCarousel();
        clearInterval(slideInterval);
        slideInterval = setInterval(autoSlide, intervalTime);
    });

    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function autoSlide() {
        nextButton.click();
    }

    slideInterval = setInterval(autoSlide, intervalTime);

    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    carouselContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(autoSlide, intervalTime);
    });
});
