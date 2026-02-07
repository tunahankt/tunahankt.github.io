/* --- 1. ANA GİRİŞ SİSTEMİ --- */
function checkPassword() {
    const input = document.getElementById('password').value;
    const content = document.getElementById('main-content');
    const loginScreen = document.getElementById('login-screen');
    const errorMsg = document.getElementById('error-msg');

    // --- ANA ŞİFRE ---
    const dogruSifre = "0709"; 

    if (input === dogruSifre) {
        // Şifre doğruysa:
        
        // Giriş ekranını yavaşça saydamlaştır
        loginScreen.style.opacity = '0';
        
        // Yarım saniye sonra giriş ekranını tamamen kaldır ve içeriği aç
        setTimeout(() => {
            loginScreen.style.display = 'none';
            content.style.display = 'block';
            
            // İçeriği yavaşça görünür yap (fade-in efekti)
            setTimeout(() => {
                content.style.opacity = '1';
            }, 50);
        }, 500);
        
    } else {
        // Şifre yanlışsa
        errorMsg.style.display = 'block';
        const inputField = document.getElementById('password');
        inputField.style.borderColor = "red";
    }
}

/* --- 2. AKILLI VİDEO YÖNETİCİSİ (Çoklu Video Desteği) --- */
document.addEventListener("DOMContentLoaded", function() {
    // Sayfadaki TÜM videoları seç
    const videos = document.querySelectorAll('video');

    // Gözlemci (Observer) oluştur
    let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // Video ekrana girdiyse
            if (entry.isIntersecting) {
                // Videoyu oynatmayı dene
                entry.target.play().catch(error => {
                    console.log("Otomatik oynatma engellendi, kullanıcı tıklamalı.");
                });
            } else {
                // Video ekrandan çıktıysa DURDUR (Ses karışmaması için önemli)
                entry.target.pause();
            }
        });
    }, { threshold: 0.5 }); // Videonun yarısı görünce işlem yap

    // Her bir videoyu gözlemciye ekle
    videos.forEach(video => {
        observer.observe(video);
    });

    // --- KLAVYE DESTEĞİ (ENTER TUŞU) ---
    
    // Ana şifre kutusunda Enter'a basınca giriş yap
    document.getElementById("password").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            checkPassword();
        }
    });

    // Gizli şifre kutusunda Enter'a basınca giriş yap
    document.getElementById("secret-password").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            checkSecretPassword();
        }
    });
});

/* --- 3. GİZLİ BÖLÜM MANTIĞI --- */

// Gizli şifre ekranını aç
function openSecretLogin() {
    document.getElementById('secret-login-screen').style.display = 'flex';
}

// Gizli şifre ekranını kapat
function closeSecretLogin() {
    document.getElementById('secret-login-screen').style.display = 'none';
}

// Gizli Mesaj ekranını kapat
function closeSecretContent() {
    document.getElementById('secret-content-screen').style.display = 'none';
}

// Gizli Şifreyi Kontrol Et
function checkSecretPassword() {
    const secretInput = document.getElementById('secret-password').value;
    const errorMsg = document.getElementById('secret-error-msg');
    
    // --- GİZLİ ŞİFRE ---
    const gizliSifre = "bıdıkvecıvık"; 

    if (secretInput === gizliSifre) {
        document.getElementById('secret-login-screen').style.display = 'none';
        document.getElementById('secret-content-screen').style.display = 'flex';
    } else {
        errorMsg.style.display = 'block';
    }
}