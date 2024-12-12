document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("language") === null) {
    // If not set, initialize it to "ar"
    localStorage.setItem("language", "ar");
    this.location.reload();
  }
  const languageSelect = document.querySelector(".language-select");

  fetch("JSON/index.json")
    .then((response) => response.json())
    .then((translations) => {
      function updateTextsAndDirection(language) {
        document.getElementById("home").textContent =
          translations[language].home;
        document.getElementById("book").textContent =
          translations[language].book;
        document.getElementById("about").textContent =
          translations[language].about;
        document.getElementById("contact").textContent =
          translations[language].contact;
        document.getElementById("profile").textContent =
          translations[language].profile;
        document.getElementById("logout").textContent =
          translations[language].logout;
        document.getElementById("login").textContent =
          translations[language].login;

        document.getElementById("arabic").textContent =
          translations[language].arabic;

        document.getElementById("welcomee").textContent =
          translations[language].welcomee;
        document.getElementById("data1").textContent =
          translations[language].data1;

        document.getElementById("data2").textContent =
          translations[language].data2;
        document.getElementById("headding").textContent =
          translations[language].headding;
        document.getElementById("choice").textContent =
          translations[language].choice;
        document.getElementById("About").textContent =
          translations[language].About;
        document.getElementById("who").textContent = translations[language].who;
        document.getElementById("details").textContent =
          translations[language].details;
        document.getElementById("details2").textContent =
          translations[language].details2;
        document.getElementById("details1").textContent =
          translations[language].details1;
        document.getElementById("goals").textContent =
          translations[language].goals;
        document.getElementById("goal1").textContent =
          translations[language].goal1;
        document.getElementById("goal2").textContent =
          translations[language].goal2;
        document.getElementById("goal3").textContent =
          translations[language].goal3;
        document.getElementById("goal4").textContent =
          translations[language].goal4;
        document.getElementById("contactt").textContent =
          translations[language].contactt;
        document.getElementById("address").textContent =
          translations[language].address;
        document.getElementById("footing").textContent =
          translations[language].footing;
        document.getElementById("messagee").textContent =
          translations[language].messagee;
        document.getElementById("name").textContent =
          translations[language].name;
        document.getElementById("emaill").textContent =
          translations[language].emaill;
        document.getElementById("sub").textContent = translations[language].sub;
        document.getElementById("booknow").textContent =
          translations[language].booknow;

        if (language === "ar") {
          document.documentElement.setAttribute("dir", "rtl");

          // document.getElementById('name').la = 'الاسم:';
          // document.getElementById('emaill').placeholder = 'البريد الالكتروني:';
          // document.getElementById('messagee').placeholder = 'الر  :';
        } else {
          document.documentElement.setAttribute("dir", "ltr");

          // document.getElementById('name').placeholder = 'Name:';
          // document.getElementById('emaill').placeholder = 'Email:';
          // document.getElementById('messagee').placeholder = 'Message:';
        }
      }
      const storedLanguage = localStorage.getItem("language") || "en";
      updateTextsAndDirection(storedLanguage);
      languageSelect.value = storedLanguage;

      languageSelect.addEventListener("change", function () {
        const selectedLanguage = this.value;
        console.log("Language changed to:", selectedLanguage);
        localStorage.setItem("language", selectedLanguage);
        updateTextsAndDirection(selectedLanguage);
        location.reload();
      });
    });
});
