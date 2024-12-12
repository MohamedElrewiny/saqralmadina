// Start Btn To Up
window.onscroll = function () {
  scrollFunction();
};
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("backToTopBtn").style.display = "block";
  } else {
    document.getElementById("backToTopBtn").style.display = "none";
  }
}
function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
//  End To Up

// Start Messages
async function MessageUser() {
  let name = document.getElementById("Name").value;
  let email = document.getElementById("Email").value;
  let message = document.getElementById("Message").value;

  let data = {
    name: name,
    email: email,
    description: message,
  };

  console.log(data);

  try {
    let response = await axios.post(
      `https://new-work-saudi.vercel.app/message/addMessage`,
      data
    );
    if (response.data.message === "Message Sent successfully") {
      Swal.fire({
        title: "تم إرسال الرسالة بنجاح!",
        icon: "success",
        confirmButtonText: "تأكيد",
      });
    }
  } catch (error) {
    Swal.fire({
      title: "حدث خطأ أثناء إرسال الرسالة",
      icon: "error",
      confirmButtonText: "تأكيد",
    });
    console.error("Error:", error);
  }
}

// End Messages

// start Booking
// let bookingNow=document.getElementById('bookingBtn').value;

// function Booking(){
//     if(localStorage.getItem('token')!=null){
//         window.location.href = '../Car.html';
//     }
//     else{
//         window.location.href = '../login.html';

//     }
// }
async function completeBooking() {
  var inputs = document.querySelectorAll("input[required]");
  var allFilled = true;
  var allValid = true;

  inputs.forEach(function (input) {
    if (!input.value) {
      allFilled = false;
      input.classList.add("is-invalid");
    } else {
      input.classList.remove("is-invalid");
    }

    if (!validateInput(input)) {
      allValid = false;
      input.classList.add("is-invalid");
    }
  });

  /* if (!validateReturnDate()) {
    Swal.fire({
      title: "تاريخ العودة يجب أن يكون بعد تاريخ الحجز",
      icon: "error",
      confirmButtonText: "تأكيد",
    });
    return;
  } */

  if (!allFilled || !allValid) {
    Swal.fire({
      title: "حدث خطأ يرجي إعادة إدخال البيانات",
      icon: "error",
      confirmButtonText: "تأكيد",
    });
    return;
  }

  let fristName = document.getElementById("Fname").value;
  // let lastName = document.getElementById("Lname").value;
  // let email = document.getElementById("emailInput").value;
  let phone = document.getElementById("phoneInput").value;
  // let time = document.getElementById("TimeInput").value;
  let date = document.getElementById("Date").value;
  // let address = document.getElementById("addersesss").value;
  let fPlace = document.getElementById("fPlacee").value;
  let lPlace = document.getElementById("lPlacee").value;
  // let personNum = document.getElementById("num").value;
  // let returnDate = document.getElementById("datee").value;
  let price = document.getElementById("price").value;
  let carType = document.getElementById("car").value;

  // const [hours, minutes] = time.split(":").map(Number);

  // let period = "AM";
  // let adjustedHours = hours;

  // if (hours === 0) {
  //   adjustedHours = 12; 
  // } else if (hours === 12) {
  //   period = "PM"; 
  // } else if (hours > 12) {
  //   adjustedHours = hours - 12; 
  //   period = "PM"; 
  // }

  // const formattedTime = `${String(adjustedHours).padStart(2, "0")}:${String(
  //   minutes
  // ).padStart(2, "0")} ${period}`;

  let completeData = {
    firstName: fristName,
    // lastName: lastName,
    // email: email,
    phone: phone,
    // Time: formattedTime,
    // rentDate: date,
    backDate: date,


    // address: address,
    startingPoint: fPlace,
    arrivalPoint: lPlace,
    // backDate: returnDate,
    // capacity: personNum,
    price: price,
    car: carType,
  };

  try {
    let response = await axios.post(
      "https://new-work-saudi.vercel.app/rent/addRent",
      completeData
    );

    console.log(response.data);
    if (response.data.message === "Rent created successfully") {
      Swal.fire({
        title: "تم إرسال بيانات الحجز بنجاح!",
        icon: "success",
        confirmButtonText: "تأكيد",
        didClose: () => {
          window.location.href = "../payment.html";
        },
      });
    } else {
      Swal.fire({
        title: "حدث خطأ أثناء إرسال الرسالة",
        icon: "error",
        confirmButtonText: "تأكيد",
      });
    }
    localStorage.setItem("userID", response.data.rent.addedBy);
    localStorage.setItem("bookingId", response.data.rent._id);
  } catch (err) {
    Swal.fire({
      title: "حدث خطأ أثناء إرسال الرسالة",
      icon: "error",
      confirmButtonText: "تأكيد",
    });
    console.error("Error:", err);
  }
}

// function validateReturnDate() {
//   const bookingDateInput = document.getElementById("Date");
//   const returnDateInput = document.getElementById("datee");
//   const returnDateAlert = document.getElementById("returnDateAlert");

//   if (!bookingDateInput.value || !returnDateInput.value) {
//     return false;
//   }

//   const bookingDate = new Date(bookingDateInput.value);
//   const returnDate = new Date(returnDateInput.value);

//   if (returnDate <= bookingDate) {
//     returnDateAlert.style.display = "block";
//     return false;
//   } else {
//     returnDateAlert.style.display = "none";
//     return true;
//   }
// }

// document.getElementById("Date").addEventListener("change", validateReturnDate);
// document.getElementById("datee").addEventListener("change", validateReturnDate);

function validateInput(input) {
  let regex;
  let minLength = 2;
  switch (input.id) {
    case "Fname":
    // case "Lname":
      regex = /^[a-zA-Z\u0600-\u06FF\s]+$/;
      if (!regex.test(input.value) || input.value.length < minLength) {
        return false;
      }
      break;
    // case "emailInput":
    //   regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //   if (!regex.test(input.value)) {
    //     return false;
    //   }
    //   break;

     case 'phoneInput':
            const phoneRegex = /^\+([1-9][0-9]{0,2})([0-9]{9,11})$/;
            if (!phoneRegex.test(input.value)) {
                return false;
            }
            break;
    // case "addersesss":
    case "fPlacee":
    case "lPlacee":
      if (input.value.trim().length < minLength) {
        return false;
      }
      break;
    /*  case "datee":
      return validateReturnDate(); */
    default:
      if (input.value.trim() === "") {
        return false;
      }
  }
  return true;
}

// End Booking

// Start image for profile

// End image for profile

// start Booking Data

// End Booking Data
