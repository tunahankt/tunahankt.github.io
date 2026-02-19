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

    // 3. Randevu Formu İşlemleri (Tıklandığında sayfa yenilenmesini engelleme)
    const appointmentForm = document.getElementById('appointmentForm');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Formun sayfayı yenilemesini engeller
            
            // Burada ileride WhatsApp API'ye veya Mail'e veri gönderebiliriz.
            // Şimdilik müşteriye şık bir uyarı verelim:
            alert("Randevu talebiniz başarıyla alındı! En kısa sürede sizinle iletişime geçeceğiz.");
            
            // Formu temizle
            appointmentForm.reset();
        });
    }
});