document.addEventListener('DOMContentLoaded', function() {
    const languageSelect = document.querySelector('.language-select');

    fetch('/JSON/login.json')
        .then(response => response.json())
        .then(translations => {
            // Function to update texts and direction
            function updateTextsAndDirection(language) {
                document.getElementById('sign').textContent = translations[language].sign;
                document.getElementById('mail').textContent = translations[language].mail;
                document.getElementById('passwordd').textContent = translations[language].passwordd;
                document.getElementById('fillMsg').textContent = translations[language].fillMsg;
                document.getElementById('wrongMsg').textContent = translations[language].wrongMsg;
                document.getElementById('loginBtn').textContent = translations[language].loginBtn;
                document.getElementById('never').childNodes[0].nodeValue = translations[language].never + ' '
                document.getElementById('registerr').innerText = translations[language].registerr;
                document.getElementById('forget').innerText = translations[language].forget;
                


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


