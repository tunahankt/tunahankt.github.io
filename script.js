document.addEventListener('DOMContentLoaded', () => {
    // 1. Hamburger Menü İşlemleri
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        hamburger.classList.toggle('toggle');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            hamburger.classList.remove('toggle');
        });
    });

    // 2. AOS Scroll Animasyonlarını Başlatma
    AOS.init({
        duration: 800, 
        offset: 100, 
        once: true 
    });
});