let language=localStorage.getItem('language')
const languageSelect = document.querySelector('.language-select');
languageSelect.addEventListener('change', function() {
    location.reload();
});

// async function arrivalPayment() {
//   let loadingSpinner = document.getElementById("loading");
//   let container = document.getElementById("data1");
//   try {
//     loadingSpinner.classList.remove("d-none");
//     let token = localStorage.getItem("token");
//     let response = await axios.get(
//       "https://new-work-saudi.vercel.app/rent/getCurrentuserRents",
//       {
//         headers: {
//           token: token,
//         },
//       }
//     );
    
//     loadingSpinner.classList.remove("d-none");
//     if (response.data && response.data.User && response.data.User.length > 0) {
//       let latestBooking = response.data.User[response.data.User.length - 1];

//       if(language=='ar'){
//         container.innerHTML = `
//              <div class="row mb-2">
//                     <h4 class="text-center mb-3 fw-bold main-color" id="thanks"> شكرا لاستكمال  طلبك</h4>

//                         <div class="col-md-6">
//                             <p class="fw-bold main-color" id="number">رقم الطلب : <span class="text-black">${latestBooking.rentalCode}</span></p>
//                         </div>
//                         <div class="col-md-6">
//                             <p  class="fw-bold main-color" id="type">نوع السيارة : <span class="text-black">${latestBooking.car}</span></p>
//                         </div>
//                     </div>
//                     <div class="row mb-2">
//                         <div class="col-md-6">
//                             <p  class="fw-bold main-color" id="start">نقطة المغادرة  : <span class="text-black">${latestBooking.startingPoint}</span></p>
//                         </div>
//                         <div class="col-md-6">
//                             <p  class="fw-bold main-color" id="end">نقطة الوصول : <span class="text-black">${latestBooking.arrivalPoint}</span></p>
//                         </div>
//                     </div>
//                     <div class="row mb-2">
//                         <div class="col-md-6 main-color">
//                             <p  class="fw-bold" id="price">السعر : <span class="fw-bold text-black"> ${latestBooking.price}</span></p>
//                         </div>
//                     </div>
//                     <button class=" btn-basicc m-auto d-block "><a class="text-white" href="index.html" id="backhome">الرجوع للصفحة الرئيسية</a></button>
//                     `
//       }else if(language=="en"){
//         container.innerHTML = `
//         <div class="row mb-2">
//               <h4 class="text-center mb-3 fw-bold main-color" id="thanks"> Thank you for completing your Order</h4>

//                   <div class="col-md-6">
//                       <p class="fw-bold main-color" id="number">Order ID: <span class="text-black">${latestBooking.rentalCode}</span></p>
//                   </div>
//                   <div class="col-md-6">
//                       <p  class="fw-bold main-color" id="type"> Type of Car : <span class="text-black">${latestBooking.car}</span></p>
//                   </div>
//               </div>
//               <div class="row mb-2">
//                   <div class="col-md-6">
//                       <p  class="fw-bold main-color" id="start"> Departure point : <span class="text-black">${latestBooking.startingPoint}</span></p>
//                   </div>
//                   <div class="col-md-6">
//                       <p  class="fw-bold main-color" id="end"> Access point : <span class="text-black">${latestBooking.arrivalPoint}</span></p>
//                   </div>
//               </div>
//               <div class="row mb-2">
//                   <div class="col-md-6 main-color">
//                       <p  class="fw-bold" id="price">Price : <span class="fw-bold text-black"> ${latestBooking.price}</span></p>
//                   </div>
//               </div>
//               <button class=" btn-basicc m-auto d-block "><a class="text-white" href="index.html" id="backhome"> Back to Home Page </a></button>
//               `
//       }
//     }
//     loadingSpinner.classList.add("d-none");
//   } catch (err) {
//     console.log(err)
//   }
// }

// async function bankPayment() {
//   const loadingSpinner = document.getElementById("loading");
//   let container = document.getElementById("data");
//   try {
//     loadingSpinner.classList.remove("d-none");
//     let token = localStorage.getItem("token");
//     let response = await axios.get(
//       "https://new-work-saudi.vercel.app/rent/getCurrentuserRents",
//       {
//         headers: {
//           token: token,
//         },
//       }
//     );
    
//     loadingSpinner.classList.remove("d-none");
//     if (response.data && response.data.User && response.data.User.length > 0) {
//       let latestBooking = response.data.User[response.data.User.length - 1];


//       if(language=='ar'){
//         container.innerHTML = `
//         <div class="row mb-2">
//               <h4 class="text-center mb-3 fw-bold main-color" id="thanks"> شكرا لاستكمال  طلبك</h4>

//                   <div class="col-md-6">
//                       <p class="fw-bold main-color" id="number">رقم الطلب : <span class="text-black">${latestBooking.rentalCode}</span></p>
//                   </div>
//                   <div class="col-md-6">
//                       <p  class="fw-bold main-color" id="type">نوع السيارة : <span class="text-black">${latestBooking.car}</span></p>
//                   </div>
//               </div>
//               <div class="row mb-2">
//                   <div class="col-md-6">
//                       <p  class="fw-bold main-color" id="start">نقطة المغادرة  : <span class="text-black">${latestBooking.startingPoint}</span></p>
//                   </div>
//                   <div class="col-md-6">
//                       <p  class="fw-bold main-color" id="end">نقطة الوصول : <span class="text-black">${latestBooking.arrivalPoint}</span></p>
//                   </div>
//               </div>
//               <div class="row mb-2">
//                   <div class="col-md-6">
//                       <p  class="fw-bold main-color" id="price">السعر : <span class="fw-bold text-black">${latestBooking.price}</span></p>
//                   </div>
//               </div>
//               <div class="d-flex align-items-center gap-3 mb-2">
//                   <div class="">
//                       <p class="fs-6" id="rankwts">تم إستلام حجزك يرجى إرفاق إيصالك التحويل عبر الواتس مباشرة</p>
//                   </div>
//                   <div class="">
//                       <a href="https://wa.me/+966565545424" target="_blank"  class="fs-4 main-color">
//                           <i class="fa-brands fa-whatsapp"></i>
//                       </a>
//                   </div>
//               </div>
//               <button class=" btn-basicc m-auto d-block"><a class="text-white" href="index.html" id="backhome">الرجوع للصفحة الرئيسية</a></button>
//               `;
//       }else if(language=='en'){
//         container.innerHTML = `
//         <div class="row mb-2">
//               <h4 class="text-center mb-3 fw-bold main-color" id="thanks"> Thank you for completing your Order</h4>

//                   <div class="col-md-6">
//                       <p class="fw-bold main-color" id="number"> Order ID : <span class="text-black">${latestBooking.rentalCode}</span></p>
//                   </div>
//                   <div class="col-md-6">
//                       <p  class="fw-bold main-color" id="type">Type of Car  : <span class="text-black">${latestBooking.car}</span></p>
//                   </div>
//               </div>
//               <div class="row mb-2">
//                   <div class="col-md-6">
//                       <p  class="fw-bold main-color" id="start"> Departure point  : <span class="text-black">${latestBooking.startingPoint}</span></p>
//                   </div>
//                   <div class="col-md-6">
//                       <p  class="fw-bold main-color" id="end"> Access point : <span class="text-black">${latestBooking.arrivalPoint}</span></p>
//                   </div>
//               </div>
//               <div class="row mb-2">
//                   <div class="col-md-6">
//                       <p  class="fw-bold main-color" id="price">Price : <span class="fw-bold text-black">${latestBooking.price}</span></p>
//                   </div>
//               </div>
//               <div class="d-flex align-items-center gap-3 mb-2">
//                   <div class="">
//                       <p class="fs-6" id="rankwts">Your reservation has been received. Please attach your transfer receipt via WhatsApp directly.</p>
//                   </div>
//                   <div class="">
//                       <a href="https://wa.me/+966565545424" target="_blank"  class="fs-4 main-color">
//                           <i class="fa-brands fa-whatsapp"></i>
//                       </a>
//                   </div>
//               </div>
//               <button class=" btn-basicc m-auto d-block"><a class="text-white" href="index.html" id="backhome"> Back to Home Page </a></button>
//               `;
//       }



//     }
//     loadingSpinner.classList.add("d-none");
//   } catch (err) {
//     console.log(err)
//   }
// }
window.onload = function () {
  saveLinks()
  // bankPayment();
  // arrivalPayment();
};


async function handlePaymentChoice() {
  const bank = document.getElementById("bank");
  const arrival = document.getElementById("arrival");
  const token = localStorage.getItem("token");
  const bookingId = localStorage.getItem("bookingId");


  if (!bank.checked && !arrival.checked) {
    Swal.fire({
      title: "يرجى اختيار نوع الدفع من فضلك!",
      icon: "error",
      confirmButtonText: "تأكيد",
    });
    return;
  }

  console.log(bookingId);

  const paymentType = bank.checked ? "bank" : "arrival";
  console.log(paymentType);
  

  try {
    const response = await axios.patch(
      `https://new-work-saudi.vercel.app/rent/addPayment/${bookingId}`,
      { paymentType }
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //     token: token,
      //   },
      // }
    );
    console.log(response);

    if (response.data.message === "Payment Added successfully") {  
          if (bank.checked) {
        Swal.fire({
              title: "تم إستلام حجزك بنجاح يرجى إرفاق إيصال التحويل عبر الواتس مباشرة",
              icon: "success",
              confirmButtonText: "تأكيد",
            });
      } else if (arrival.checked) {
        Swal.fire({
          title: "تم إستلام حجزك بنجاح يرجى التواصل والمتابعة عبر الواتس مباشرة",
          icon: "success",
          confirmButtonText: "تأكيد",
        });
      }
    }
  } catch (error) {
    Swal.fire({
      title: "حدث خطأ يرجى إعادة المحاولة!",
      icon: "error",
      confirmButtonText: "تأكيد",
    });
  }
}

// async function handlePaymentChoice() {
//   const bank = document.getElementById("bank");
//   const arrival = document.getElementById("arrival");
//   const token = localStorage.getItem("token");
//   const bookingId = localStorage.getItem("bookingId");

//   if (!bank.checked && !arrival.checked) {
//     Swal.fire({
//       title: "يرجى اختيار نوع الدفع من فضلك!",
//       icon: "error",
//       confirmButtonText: "تأكيد",
//     });
//     return;
//   }

//   console.log(bookingId);
  

//   const paymentType = bank.checked ? "bank" : "arrival";
//   console.log(paymentType);
  
//   try {
//     const response = await axios.patch(
//       `https://new-work-saudi.vercel.app/rent/addPayment/${bookingId}`,
//       { paymentType },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           token: token,
//         },
//       }
//     );
//     console.log(response);
    
//     if (response.data.message === "Payment Added Successfully") {
//       if (bank.checked) {
//         window.location.href = "bank.html";
//       } else if (arrival.checked) {
//         window.location.href = "arrival.html";
//       }
//     }
//   } catch (error) {
//     Swal.fire({
//       title: "حدث خطأ يرجى إعادة المحاولة!",
//       icon: "error",
//       confirmButtonText: "تأكيد",
//     });
//   }
// }

function saveLinks() {
  const token = localStorage.getItem("token");
  const loginList = document.getElementById("loginList");
  const logoutList = document.getElementById("logoutList");

  if (token !== null) {
    loginList.classList.replace("d-block", "d-none");
    logoutList.classList.replace("d-none", "d-block");
  } else {
    loginList.classList.replace("d-none", "d-block");
    logoutList.classList.replace("d-block", "d-none");
  }
}

