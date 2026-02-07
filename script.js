function checkPassword() {
    // HTML'den gerekli elemanları seçiyoruz
    const input = document.getElementById('password').value;
    const content = document.getElementById('main-content');
    const loginScreen = document.getElementById('login-screen');
    const errorMsg = document.getElementById('error-msg');

    // --- ŞİFREYİ BURADAN DEĞİŞTİR ---
    // tırnak içindeki "1234" kısmını istediğin şifre yap.
    const dogruSifre = "0709"; 

    if (input === dogruSifre) {
        // Şifre doğruysa:
        
        // 1. Giriş ekranını yavaşça saydamlaştır
        loginScreen.style.opacity = '0';
        
        // 2. Yarım saniye sonra giriş ekranını tamamen kaldır ve içeriği aç
        setTimeout(() => {
            loginScreen.style.display = 'none';
            content.style.display = 'block';
            
            // 3. İçeriği yavaşça görünür yap (fade-in efekti)
            setTimeout(() => {
                content.style.opacity = '1';
            }, 50);
        }, 500);
        
    } else {
        // Şifre yanlışsa hata mesajını göster
        errorMsg.style.display = 'block';
        
        // Hata mesajını biraz sallayabiliriz (opsiyonel basit animasyon)
        const inputField = document.getElementById('password');
        inputField.style.borderColor = "red";
    }
}

// --- AKILLI VİDEO OYNATICI ---
document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById("ozurVideosu");

    // "Gözlemci" oluşturuyoruz
    let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // Eğer video ekranda görünüyorsa (%50'si)
            if (entry.isIntersecting) {
                video.play().catch(error => {
                    // Otomatik oynatma engellenirse sessizce geç
                    console.log("Otomatik oynatma tarayıcı tarafından engellendi.");
                });
            } else {
                // Video ekrandan çıktıysa durdur
                video.pause();
            }
        });
    }, { threshold: 0.5 }); // Videonun yarısı görünce tetiklenir

    observer.observe(video);
});