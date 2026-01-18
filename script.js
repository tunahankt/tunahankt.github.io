document.addEventListener('DOMContentLoaded', () => {
    
    const roles = ["Community Managerım", "Web Geliştiriciyim", "Tasarımcıyım", "3D Model Üreticisiyim"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeTarget = document.getElementById('typewriter');

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typeTarget.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typeTarget.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(type, 2000); 
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(type, 500); 
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }

    type();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

// script.js dosyasının en altına ekle:

// ---------------------------------------------------------
// 3. İLETİŞİM BUTONU (Mail Kopyalama & Geri Bildirim)
// ---------------------------------------------------------
const contactBtn = document.getElementById('contact-btn');
const originalText = contactBtn.innerText;

contactBtn.addEventListener('click', (e) => {
    // Mail adresini panoya kopyala
    navigator.clipboard.writeText('tunahan.kt74@gmail.com').then(() => {
        
        // Butonun metnini değiştir ve yeşil yap
        contactBtn.innerText = 'Mail Kopyalandı!';
        contactBtn.classList.add('bg-cyan-500', 'text-white'); // Arka planı dolu yap
        
        // 2 saniye sonra eski haline döndür
        setTimeout(() => {
            contactBtn.innerText = originalText;
            contactBtn.classList.remove('bg-cyan-500', 'text-white');
        }, 2000);

    }).catch(err => {
        console.error('Kopyalama hatası:', err);
    });
    
    // Not: e.preventDefault() kullanmadık, böylece mail uygulaması varsa yine de açılmaya çalışır.
    // Hem maili açar hem kopyalar (Garanti yöntem).
});