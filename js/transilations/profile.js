document.addEventListener('DOMContentLoaded', function() {
    const languageSelect = document.querySelector('.language-select');

    fetch('JSON/car.json')
        .then(response => response.json())
        .then(translations => {
            function updateTextsAndDirection(language) {
                document.getElementById('home').textContent = translations[language].home;
                document.getElementById('book').textContent = translations[language].book;
                document.getElementById('about').textContent = translations[language].about;
                document.getElementById('contact').textContent = translations[language].contact;
                document.getElementById('profile').textContent = translations[language].profile;
                document.getElementById('logout').textContent = translations[language].logout;
                document.getElementById('login').textContent = translations[language].login;
                // document.getElementById('image').textContent = translations[language].image;


                document.getElementById('arabic').textContent = translations[language].arabic;
                document.getElementById('footing').textContent = translations[language].footing;



                // Update direction
                if (language === 'ar') {
                    document.documentElement.setAttribute('dir', 'rtl');
                  
                } else {
                    document.documentElement.setAttribute('dir', 'ltr');
           
                }
            }
            const storedLanguage = localStorage.getItem('language') || 'en';
            updateTextsAndDirection(storedLanguage);
            languageSelect.value = storedLanguage;

            languageSelect.addEventListener('change', function() {
                const selectedLanguage = this.value;
                console.log('Language changed to:', selectedLanguage); 
                localStorage.setItem('language', selectedLanguage);
                updateTextsAndDirection(selectedLanguage);
            });
        })
});


