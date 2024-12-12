document.addEventListener('DOMContentLoaded', function() {
    const languageSelect = document.querySelector('.language-select');

    fetch('/JSON/reset.json')
        .then(response => response.json())
        .then(translations => {
            // Function to update texts and direction
            function updateTextsAndDirection(language) {
                document.getElementById('changepass').textContent = translations[language].changepass;
                document.getElementById('mail').textContent = translations[language].mail;
                document.getElementById('codee').textContent = translations[language].codee;
                document.getElementById('newPassword').textContent = translations[language].newPassword;
                document.getElementById('resetMes').textContent = translations[language].resetMes;
                document.getElementById('change').textContent = translations[language].change;
                document.getElementById('login').textContent = translations[language].login;
                


                let eyeright=document.getElementById("togglePasswordright");
                let eyeleft=document.getElementById("togglePassword");

                // Update direction
                if (language === 'ar') {
                    document.documentElement.setAttribute('dir', 'rtl');
                    document.getElementById('Name').placeholder = 'الاسم:';
                    document.getElementById('Email').placeholder = 'البريد الالكتروني:';
                    document.getElementById('Message').placeholder = 'نص الرساله :';
                    eyeleft.classList.replace('d-none','d-block');
                    eyeright.classList.replace('d-block','d-none');


                } else {
                    eyeright.classList.replace('d-none','d-block');
                    eyeleft.classList.replace('d-block','d-none');

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


