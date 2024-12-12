const usernameInput = document.getElementById("usernameInput");
const userEmailInput = document.getElementById("userEmailInput");
const userPasswordInput = document.getElementById("userPasswordInput");
const userAgeInput = document.getElementById("userAgeInput");
const userPhoneInput = document.getElementById("userPhoneInput");
const userAddressInput = document.getElementById("userAddressInput");
const userMaleInput = document.getElementById("male");
const userFemaleInput = document.getElementById("female");
const signupBtn = document.getElementById("signupBtn");
const siginBtn = document.getElementById("signin");
let usersinfo;

if (localStorage.getItem("users") == null) {
  usersinfo = [];
} else {
  usersinfo = JSON.parse(localStorage.getItem("users"));
}

function signUp() {
  userInputsValidation();
  isExist();

  if (userInputsValidation() == true && isExist() == false) {
    let user = {
      name: usernameInput.value,
      email: userEmailInput.value,
      password: userPasswordInput.value,
      age: userAgeInput.value,
      phone: userPhoneInput.value,
      address: userAddressInput.value,
    };
    usersinfo.push(user);
    localStorage.setItem("users", JSON.stringify(usersinfo));
    // const signin = document.getElementById("signin")
    // signin.classList.replace("d-none", "d-block");
    tryAgainMsg.classList.replace("d-block", "d-none");
  } else {
    const tryAgainMsg = document.getElementById("tryAgainMsg");
    tryAgainMsg.classList.replace("d-none", "d-block");
    confirmMsg.classList.replace("d-block", "d-none");
  }

  let gender;
  if (userMaleInput.checked) {
    gender = userMaleInput.value;
  } else if (userFemaleInput.checked) {
    gender = userFemaleInput.value;
  }

  const data = {
    userName: usernameInput.value,
    email: userEmailInput.value,
    password: userPasswordInput.value,
    age: userAgeInput.value,
    phone: userPhoneInput.value,
    addresses: userAddressInput.value,
    gender: gender,
  };

  axios
    .post("https://new-work-saudi.vercel.app/user/signUp", data)
    .then((response) => {
      console.log("Success:", response.data);
      if (response.data.message == "user created successfully") {
        const confirmMsg = document.getElementById("confirmMsg");
        Swal.fire({
          title: "تم التسجيل بالنجاح",
          icon: "success",
          timer: 3000,
          timerProgressBar: true,
          didClose: () => {
            window.location.href = "../login.html";
          },
        });
      }
    })
    .catch((error) => {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    });
}

function usernameValidation() {
  const usernameAlert = document.getElementById("usernameAlert");

  // let regex = /^[A-Za-z ]{3,20}$/
  let regex = /^[a-zA-Z\u0600-\u06FF\s]+$/;
  if (regex.test(usernameInput.value) == true && usernameInput.value != "") {
    usernameInput.classList.add("is-valid");
    usernameInput.classList.remove("is-invalid");
    usernameAlert.classList.replace("d-block", "d-none");
    return true;
  } else {
    usernameInput.classList.add("is-invalid");
    usernameInput.classList.remove("is-valid");
    usernameAlert.classList.replace("d-none", "d-block");
    return false;
  }
}

function userPasswordValidation() {
  let regex = /^.{6,}$/;
  const userPasswordAlert = document.getElementById("userPasswordAlert");
  if (
    regex.test(userPasswordInput.value) == true &&
    userPasswordInput.value != ""
  ) {
    userPasswordInput.classList.add("is-valid");
    userPasswordInput.classList.remove("is-invalid");
    userPasswordAlert.classList.replace("d-block", "d-none");
    return true;
  } else {
    userPasswordInput.classList.add("is-invalid");
    userPasswordInput.classList.remove("is-valid");
    userPasswordAlert.classList.replace("d-none", "d-block");
    return false;
  }
}

function userEmailValidation() {
  const userEmailAlert = document.getElementById("userEmailAlert");
  let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (regex.test(userEmailInput.value) == true && userEmailInput.value != "") {
    userEmailInput.classList.add("is-valid");
    userEmailInput.classList.remove("is-invalid");
    userEmailAlert.classList.replace("d-block", "d-none");
    return true;
  } else {
    userEmailInput.classList.add("is-invalid");
    userEmailInput.classList.remove("is-valid");
    userEmailAlert.classList.replace("d-none", "d-block");
    return false;
  }
}

function userAgeValidation() {
  const userAgeAlert = document.getElementById("userAgeAlert");
  let regex = /^(1[5-9]|[2-8][0-9]|90)$/;
  if (regex.test(userAgeInput.value) == true && userAgeInput.value != "") {
    userAgeInput.classList.add("is-valid");
    userAgeInput.classList.remove("is-invalid");
    userAgeAlert.classList.replace("d-block", "d-none");
    return true;
  } else {
    userAgeInput.classList.add("is-invalid");
    userAgeInput.classList.remove("is-valid");
    userAgeAlert.classList.replace("d-none", "d-block");
    return false;
  }
}

function userPhoneValidation() {
  const userPhoneAlert = document.getElementById("userPhoneAlert");
  let regex = /^\+([1-9][0-9]{0,2})([0-9]{9,11})$/;
  if (regex.test(userPhoneInput.value) == true && userPhoneInput.value != "") {
    userPhoneInput.classList.add("is-valid");
    userPhoneInput.classList.remove("is-invalid");
    userPhoneAlert.classList.replace("d-block", "d-none");
    return true;
  } else {
    userPhoneInput.classList.add("is-invalid");
    userPhoneInput.classList.remove("is-valid");
    userPhoneAlert.classList.replace("d-none", "d-block");
    return false;
  }
}

function userAddressValidation() {
  const userAddressAlert = document.getElementById("userAddressAlert");
  // let regex = /^[A-Za-z0-9-]{4,60}$/;
  // let regex = /[^~`"=!@#$%\^&\*\(\)\-+=\\\|\}\]\{\['&quot;:?.>,</]+$/
  const addressRegex = /^[a-zA-Z0-9\u0600-\u06FF\s.,-]+$/;

  if (
    addressRegex.test(userAddressInput.value) == true &&
    userAddressInput.value != ""
  ) {
    userAddressInput.classList.add("is-valid");
    userAddressInput.classList.remove("is-invalid");
    userAddressAlert.classList.replace("d-block", "d-none");
    return true;
  } else {
    userAddressInput.classList.add("is-invalid");
    userAddressInput.classList.remove("is-valid");
    userAddressAlert.classList.replace("d-none", "d-block");
    return false;
  }
}

function isExist() {
  let accountExistMsg = document.getElementById("accountExistMsg");

  for (let i = 0; i < usersinfo.length; i++) {
    if (
      usersinfo[i].email.toLowerCase() == userEmailInput.value.toLowerCase()
    ) {
      accountExistMsg.classList.replace("d-none", "d-block");
      userEmailInput.classList.remove("is-valid");
      userPasswordInput.classList.remove("is-valid");
      return true;
    }
  }
  return false;
}

function userInputsValidation() {
  usernameValidation();
  userEmailValidation();
  userPasswordValidation();
  userAgeValidation();
  userPhoneValidation();
  userAddressValidation();

  if (
    usernameValidation() == true &&
    userEmailValidation() == true &&
    userPasswordValidation() == true &&
    userAgeValidation() == true &&
    userPhoneValidation() == true &&
    userAddressValidation() == true
  ) {
    accountExistMsg.classList.replace("d-block", "d-none");

    return true;
  } else {
    return false;
  }
}

// End SignUp

// Start Login

async function login() {
  let loginEmail = document.getElementById("loginEmail");
  let loginPassword = document.getElementById("userPasswordInput");
  let loginBtn = document.getElementById("loginBtn");
  let wrongMsg = document.getElementById("wrongMsg");

  const dataLogin = {
    email: loginEmail.value,
    password: loginPassword.value,
  };

  if (loginEmail.value == "" || loginPassword.value == "") {
    let fillMsg = document.getElementById("fillMsg");
    fillMsg.classList.replace("d-none", "d-block");
    return false;
  }
  try {
    let response = await axios.post(
      "https://new-work-saudi.vercel.app/user/logIn",
      dataLogin
    );
    localStorage.setItem("token", response.data.token);
    console.log("Success:", response.data);
    if (response.data.message == "you logged in successfully") {
      if (response.data.payload.role === "admin") {
        window.location.href = "../dashboard.html";
        localStorage.setItem('role','admin')
        
      }
      else if(response.data.payload.role === "superAdmin"){
        window.location.href = "../dashboard.html";
        localStorage.setItem('role','superAdmin')
      } 
      else {
        window.location.href = "../index.html";
      }
    } else {
      wrongMsg.classList.replace("d-none", "d-block");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// End Login

async function logOut() {
  try {
    const userToken = localStorage.getItem("token");

    if (!userToken) {
      console.warn("No token found, user is already logged out.");
      window.location.href = "../login.html"; // Redirect if no token
      return;
    }

    const response = await axios.put(
      "https://new-work-saudi.vercel.app/user/logout",
      {}, 
      {
        headers: {
          token: userToken,
        },
      }
    );

    console.log(response.data);

    if (response.data.message === "logout Successfully") {
      localStorage.removeItem("token"); // Remove the token if logout was successful
      window.location.href = "../login.html"; // Redirect to login
    } else {
      console.error("Logout failed:", response.data.message);
    }
  } catch (error) {
    console.error("Error during logout:", error.response ? error.response.data : error.message);
  }
}

/* async function logOut() {
    try {
        const userToken = localStorage.getItem("token");

        // Ensure that the token is being fetched correctly
        if (!userToken) {
            console.log("No token found in localStorage.");
            return; // Exit if no token is present
        }

        // Sending token in headers
        let response = await axios.put('https://new-work-saudi.vercel.app/user/logout', {
            headers: {
                token: userToken,
            },
        });


        // If logout is successful, remove the token from localStorage
        if (response.data.message === "logout Successfully") {
            localStorage.removeItem('token');  
        console.log(response.data);

            // window.location.href = '../login.html'; // Redirect to login page
        }
    } catch (error) {
        console.error("Error during logout:", error);
    }
} */

async function forgetPassword() {
  let email = document.getElementById("forgetEmail").value;

  const forgetdata = {
    email: email,
  };

  try {
    let { data } = await axios.patch(
      `https://new-work-saudi.vercel.app/user/forget_code`,
      forgetdata
    );
    if (data === "you can reset your password now") {
      Swal.fire({
        title: "تم إرسال كود الي ايميلك بنجاح!",
        icon: "success",
        confirmButtonText: "تأكيد",
        didClose: () => {
          window.location.href = "../reset.html";
        },
      });
    }

    console.log(data);
  } catch (error) {
    console.error("Error:", error);
    Swal.fire({
      title: "حدث خطأيرجي إعادة المحاولة",
      icon: "error",
      confirmButtonText: "تأكيد",
    });
  }
}

async function resetPassword() {
  let email = document.getElementById("resetEmail").value;
  let code = document.getElementById("resetCode").value;
  let password = document.getElementById("userPasswordInput").value;

  const resetdata = {
    email: email,
    code: code,
    password: password,
  };

  try {
    let { data } = await axios.put(
      `https://new-work-saudi.vercel.app/user/reset_password`,
      resetdata
    );
    if (data.success === true) {
      Swal.fire({
        title: "تم  تغير كلمة المرور بنجاح حاول التسجيل مرة أخري!",
        icon: "success",
        confirmButtonText: "تأكيد",
        didClose: () => {
          window.location.href = "../login.html";
        },
      });
    } else {
      Swal.fire({
        title: "حدث خطأ، يرجى إعادة المحاولة",
        icon: "error",
        confirmButtonText: "تأكيد",
      });
    }
  } catch (error) {
    Swal.fire({
      title: "حدث خطأ أثناء إعادة تعيين كلمة المرور",
      text: "يرجى التحقق من البريد الإلكتروني أو الرمز وإعادة المحاولة.",
      icon: "error",
      confirmButtonText: "تأكيد",
    });
    console.error("Error:", error);
  }
}

let eyeright=document.getElementById("togglePasswordright")
let eyeleft=document.getElementById("togglePassword")
eyeright.addEventListener("click", eyeClick);
eyeleft.addEventListener("click", eyeClick);



  function eyeClick () {
    const passwordInput = document.getElementById("userPasswordInput");
    const toggleIcon = document.getElementById("togglePassword");
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    if (type === "password") {
      toggleIcon.classList.add("fa-eye-slash");
      toggleIcon.classList.remove("fa-eye");
    } else {
      toggleIcon.classList.add("fa-eye");
      toggleIcon.classList.remove("fa-eye-slash");
    }
  }





  
