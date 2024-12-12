document.addEventListener('DOMContentLoaded', function() {
    const languageSelect = document.querySelector('.language-select');

    fetch('/JSON/forgetPage.json')
        .then(response => response.json())
        .then(translations => {
            // Function to update texts and direction
            function updateTextsAndDirection(language) {
                document.getElementById('mail').textContent = translations[language].mail;
                document.getElementById('subbtn').textContent = translations[language].subbtn;
                



        


        
                // Update direction
                if (language === 'ar') {
                    document.documentElement.setAttribute('dir', 'rtl');
                    document.getElementById('Name').placeholder = 'الاسم:';
                    document.getElementById('Email').placeholder = 'البريد الالكتروني:';
                    document.getElementById('Message').placeholder = 'نص الرساله :';
                } else {
                    document.documentElement.setAttribute('dir', 'ltr');
                    document.getElementById('Name').placeholder = 'Name:';
                    document.getElementById('Email').placeholder = 'Email:';
                    document.getElementById('Message').placeholder = 'Message:';
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


