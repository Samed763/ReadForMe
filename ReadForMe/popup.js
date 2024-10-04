let words = [];
let currentWordIndex = 0;

// Metni seçip başlatma butonuna basıldığında
document.getElementById('startBtn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript(
            {
                target: { tabId: tabs[0].id },
                func: () => window.getSelection().toString()
            },
            (results) => {
                if (results && results[0] && results[0].result) {
                    // Metni kelimelere ayır ve sıfırdan başlat
                    words = results[0].result.split(" ");
                    currentWordIndex = 0;
                    console.log("Kelime sayısı:", words.length);
                    
                    // "Devam" butonunu göster
                    document.getElementById('continueBtn').style.display = 'block';
                } else {
                    alert("Lütfen bir metin seçin.");
                }
            }
        );
    });
});

// Devam butonuna basıldığında
document.getElementById('continueBtn').addEventListener('click', () => {
    if (currentWordIndex < words.length) {
        const word = words[currentWordIndex];
        chrome.tts.speak(word, {
            lang: "tr-TR",
            rate: 1.0
        });
        currentWordIndex++;  // Sonraki kelimeye geç
    } else {
        console.log("Tüm kelimeler okundu.");
        alert("Tüm kelimeler okundu.");
        // "Devam" butonunu gizle
        document.getElementById('continueBtn').style.display = 'none';
    }
});

// Durdur butonu
document.getElementById('stopBtn').addEventListener('click', () => {
    chrome.tts.stop();
});
