document.addEventListener('DOMContentLoaded', () => {
    // 1. HAMBURGER MENÜ
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

    // 2. SCROLL ANİMASYONU
    AOS.init({
        duration: 800, 
        offset: 100, 
        once: true 
    });

    // 3. AKILLI TARİH VE SAAT SİSTEMİ
    const tarihInput = document.getElementById('tarih');
    const saatSelect = document.getElementById('saat');

    // Geçmiş tarihi engelle (Bugünün tarihini alıp input'un min özelliğine atıyoruz)
    const bugun = new Date();
    // Türkiye saat dilimine göre ayarlama
    bugun.setMinutes(bugun.getMinutes() - bugun.getTimezoneOffset());
    const bugunTarih = bugun.toISOString().split('T')[0];
    tarihInput.setAttribute('min', bugunTarih);

    // Saat Seçeneklerini Doldur (09:00 - 21:00 arası 30 dk aralıklarla)
    const baslangicSaati = 9 * 60; // 09:00 (dakika cinsinden)
    const bitisSaati = 21 * 60; // 21:00

    for (let sure = baslangicSaati; sure <= bitisSaati; sure += 30) {
        let saat = Math.floor(sure / 60).toString().padStart(2, '0');
        let dakika = (sure % 60).toString().padStart(2, '0');
        let zamanMetni = `${saat}:${dakika}`;
        
        let option = document.createElement('option');
        option.value = zamanMetni;
        option.textContent = zamanMetni;
        saatSelect.appendChild(option);
    }

    // Tarih değiştiğinde saatleri kontrol et (Bugün seçildiyse geçmiş saatleri gizle)
    tarihInput.addEventListener('change', () => {
        const secilenTarih = tarihInput.value;
        const suAn = new Date();
        const suAnToplamDakika = suAn.getHours() * 60 + suAn.getMinutes();

        Array.from(saatSelect.options).forEach(option => {
            if(option.value === "") return; // "Saat Seçiniz" kısmını atla
            
            let [optSaat, optDakika] = option.value.split(':').map(Number);
            let optToplamDakika = optSaat * 60 + optDakika;

            // Eğer bugün seçildiyse ve saatin vakti geçtiyse
            if (secilenTarih === bugunTarih && optToplamDakika <= suAnToplamDakika) {
                option.disabled = true;
                option.style.display = "none";
            } else {
                // İleri bir tarih veya henüz gelmemiş bir saatse aktif et
                option.disabled = false;
                option.style.display = "block";
            }
        });
        
        // Eğer müşterinin daha önce seçtiği saat pasife düştüyse seçimi sıfırla
        if(saatSelect.options[saatSelect.selectedIndex]?.disabled) {
            saatSelect.value = "";
        }
    });

    // 4. FORM DOĞRULAMA (Rastgele Veri Engelleme)
    const appointmentForm = document.getElementById('appointmentForm');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            const isim = document.getElementById('isim').value.trim();
            const telefon = document.getElementById('telefon').value.trim();
            const plaka = document.getElementById('plaka').value.trim().toUpperCase();
            const model = document.getElementById('model').value.trim();
            const seciliSaat = saatSelect.value;
            const seciliTarih = tarihInput.value;

            // KURAL 1: İsim Doğrulama (Sadece harf ve boşluk, min 3 karakter)
            const isimRegex = /^[a-zA-ZçÇğĞıİöÖşŞüÜ\s]{3,}$/;
            if(!isimRegex.test(isim)) {
                alert("Lütfen geçerli bir Ad Soyad giriniz. Sayı veya özel karakter kullanmayınız.");
                return;
            }

            // KURAL 2: Telefon Doğrulama (Sadece rakamları sayar, min 10 hane olmalı)
            const telTemiz = telefon.replace(/\D/g, ''); 
            if(telTemiz.length < 10) {
                alert("Lütfen geçerli bir telefon numarası giriniz (En az 10 hane).");
                return;
            }

            // KURAL 3: Plaka Doğrulama (Örn: 74 ABC 123)
            // (1 veya 2 rakam) + (1, 2 veya 3 harf) + (2, 3 veya 4 rakam) formatına uymak zorunda
            const plakaRegex = /^(0[1-9]|[1-7][0-9]|8[0-1])\s*[A-Z]{1,3}\s*[0-9]{2,4}$/;
            if(!plakaRegex.test(plaka)) {
                alert("Lütfen geçerli bir Türkiye plakası formatı giriniz (Örn: 74 ABC 123).");
                return;
            }

            // KURAL 4: Model Doğrulama (Asdasd vs. yazmayı engellemek için min 3 karakter)
            if(model.length < 3) {
                alert("Lütfen aracınızın markasını ve modelini eksiksiz giriniz.");
                return;
            }

            // Tüm testlerden geçerse başarı mesajını göster
            alert(`Harika! ${seciliTarih} tarihinde, saat ${seciliSaat}'te ${plaka} plakalı ${model} aracınız için randevu talebiniz başarıyla alındı. Sizinle iletişime geçeceğiz.`);
            
            // Formu sıfırla
            appointmentForm.reset();
        });
    }
});