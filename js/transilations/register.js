document.addEventListener('DOMContentLoaded', function() {
    const languageSelect = document.querySelector('.language-select');

    fetch('/JSON/register.json')
        .then(response => response.json())
        .then(translations => {
            // Function to update texts and direction
            function updateTextsAndDirection(language) {
                document.getElementById('title').textContent = translations[language].title;
                document.getElementById('namee').textContent = translations[language].namee;
                document.getElementById('usernameAlert').textContent = translations[language].usernameAlert;
                document.getElementById('emaile').textContent = translations[language].emaile;
                document.getElementById('userEmailAlert').textContent = translations[language].userEmailAlert;
                document.getElementById('pass').textContent = translations[language].pass;
                document.getElementById('userPasswordAlert').textContent = translations[language].userPasswordAlert;
                document.getElementById('agee').textContent = translations[language].agee;
                document.getElementById('userAgeAlert').textContent = translations[language].userAgeAlert;
                document.getElementById('phonee').textContent = translations[language].phonee;
                document.getElementById('userPhoneAlert').textContent = translations[language].userPhoneAlert;
                document.getElementById('addressss').textContent = translations[language].addressss;
                document.getElementById('userAddressAlert').textContent = translations[language].userAddressAlert;
                document.getElementById('genderr').textContent = translations[language].genderr;
                document.getElementById('maleLabel').textContent = translations[language].maleLabel;
                document.getElementById('femaleLabel').textContent = translations[language].femaleLabel;
                document.getElementById('confirmMsg').textContent = translations[language].confirmMsg;
                document.getElementById('accountExistMsg').textContent = translations[language].accountExistMsg;
                document.getElementById('tryAgainMsg').textContent = translations[language].tryAgainMsg;
                document.getElementById('signupBtn').textContent = translations[language].signupBtn;

                document.getElementById('haveEmailLabel').childNodes[0].nodeValue = translations[language].haveEmailLabel + ' '
                document.getElementById('loginLink').innerText = translations[language].loginLink;
                


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


