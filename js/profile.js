let language = localStorage.getItem("language");
const languageSelect = document.querySelector(".language-select");
languageSelect.addEventListener("change", function () {
    location.reload();
});

async function bookingData() {
    try {
        let token = localStorage.getItem("token");
        let response = await axios.get(
        "https://new-work-saudi.vercel.app/rent/getCurrentuserRents",
        {
            headers: {
            token: token,
            },
        }
    );

    // console.log(response.data);

    let bookingsContainer = document.getElementById("bookings");
    bookingsContainer.innerHTML = "";

    if (response.data && response.data.User && response.data.User.length > 0) {
        for (let booking of response.data.User) {
            let bookingElement = document.createElement("div");
            bookingElement.className =
            "col-md-12 rounded-3 d-flex justify-content-between flex-column mb-3";
            bookingElement.id = `booking-${booking._id}`;


            if(language=='ar'){
                bookingElement.innerHTML = `
                <div style="background: linear-gradient(145deg,var(--main-color), var(--second-color));"> 
                        <div class="top py-3 px-3 dataRent d-flex justify-content-between " id="profile" >
                        <div class="w-50 p-2 d-flex justify-content-start flex-column  one">
                            <div class="text-white mb-2 fs-5">
                                <span class="fw-bold">رقم الطلب : </span>
                                <span>${booking.rentalCode}</span>
                            </div>
                            <div class="text-white mb-2 fs-5">
                                <span class="fw-bold">الاسم : </span>
                                <span>${booking.firstName} ${booking.lastName}</span>
                            </div>
                            <div class="text-white mb-2 fs-5">
                                <span class="fw-bold">السعر : </span>
                                <span>${booking.price}</span>
                            </div>
                            <div class="text-white mb-2 fs-5">
                                <span class="fw-bold">تاريخ الخدمة : </span>
                                <span>${booking.rentDate}</span>
                            </div>
                            <div class="text-white mb-2 fs-5">
                                <span class="fw-bold">اسم السيارة : </span>
                                <span>${booking.car}</span>
                            </div>
                        

                        </div>
                        <div class="w-50 p-2 d-flex justify-content-start flex-column  two">
                            <div class="text-white mb-2 fs-5">
                                <span class="fw-bold">الهاتف:</span>
                                <span>${booking.phone}</span>
                            </div>
                            <div class="text-white mb-2 fs-5">
                                <span class="fw-bold">نقطة الاقلال : </span>
                                <span>${booking.startingPoint}</span>
                            </div>
                            <div class="text-white mb-2 fs-5">
                                <span class="fw-bold">نقطة النزول : </span>
                                <span>${booking.arrivalPoint}</span>
                            </div>
                            <div class="text-white mb-2 fs-5">
                                <span class="fw-bold">عدد الاشخاص : </span>
                                <span>${booking.capacity}</span>
                            </div>
                    
                        </div>
                    
                    
                    </div>
                    <div class="text-white m-auto d-block text-center mb-3 py-2 fw-bold bg-main-color status" >
                                ${booking.status}
                        </div>
                
                
                
                
                </div>
                `;
            }else if(language=='en')
            bookingElement.innerHTML = `
                    <div style="background: linear-gradient(145deg,var(--main-color), var(--second-color));"> 
                            <div class="top py-3 px-3 dataRent d-flex justify-content-between " id="profile" >
                            <div class="w-50 p-2 d-flex justify-content-start flex-column  one">
                                <div class="text-white mb-2 fs-5">
                                    <span class="fw-bold"> Order ID : </span>
                                    <span>${booking.rentalCode}</span>
                                </div>
                                <div class="text-white mb-2 fs-5">
                                    <span class="fw-bold">Name : </span>
                                    <span>${booking.firstName} ${booking.lastName}</span>
                                </div>
                                <div class="text-white mb-2 fs-5">
                                    <span class="fw-bold">Price : </span>
                                    <span>${booking.price}</span>
                                </div>
                                <div class="text-white mb-2 fs-5">
                                    <span class="fw-bold"> Rent Date : </span>
                                    <span>${booking.rentDate}</span>
                                </div>
                                <div class="text-white mb-2 fs-5">
                                    <span class="fw-bold"> Name of Car : </span>
                                    <span>${booking.car}</span>
                                </div>
                            

                            </div>
                            <div class="w-50 p-2 d-flex justify-content-start flex-column  two">
                                <div class="text-white mb-2 fs-5">
                                    <span class="fw-bold">Phone :</span>
                                    <span>${booking.phone}</span>
                                </div>
                                <div class="text-white mb-2 fs-5">
                                    <span class="fw-bold"> Start Point : </span>
                                    <span>${booking.startingPoint}</span>
                                </div>
                                <div class="text-white mb-2 fs-5">
                                    <span class="fw-bold">End Point  : </span>
                                    <span>${booking.arrivalPoint}</span>
                                </div>
                                <div class="text-white mb-2 fs-5">
                                    <span class="fw-bold"> Number of person : </span>
                                    <span>${booking.capacity}</span>
                                </div>
                        
                            </div>
                        
                        
                        </div>
                        <div class="text-white m-auto d-block text-center mb-3 py-2 fw-bold bg-main-color status" >
                                    ${booking.status}
                            </div>
                    
                    
                    
                    
                    </div>
                    `;
            bookingsContainer.appendChild(bookingElement);
        }
        } else {
        console.log("No bookings found");
        bookingsContainer.innerHTML = `
                        <div class="bg-main-color m-auto rounded text-center py-3 my-3">
            <p class="text-white fs-4 fw-bold ">No previous reservations</p>
        </div>`;
        }
    } catch (err) {
        console.error("Error fetching bookings:", err);
    }
}
async function userData() {
    let data = document.getElementById("userData");
    let profilePic = document.getElementById("profilePic");
    try {
        let token = localStorage.getItem("token");
        let response = await axios.get(
        "https://new-work-saudi.vercel.app/user/loggedUserProfile",
        {
            headers: {
            token: token,
            },
        }
        );
        console.log(response.data);
        if (
        response.data.User.profileImage &&
        response.data.User.profileImage.secure_url
        ) {
        profilePic.src = response.data.User.profileImage.secure_url;
        }

        if (language == "ar") {
        data.innerHTML = `
            <div class="data-user flex-fill">
                            <h3 class="fs-5"><span class=" ">السيد: </span> <span>${response.data.User.userName}</span></h3>
                            <div class=" d-flex flex-column gap-1">
                                <p class="fs-5">
                                    <span >الايميل: </span> 
                                    <span>${response.data.User.email}</span> 
                                </p>
                                <p class="fs-5">
                                    <span >الهاتف المحمول: </span>
                                    <span>${response.data.User.phone}</span> 
                                </p>
                                <p class="fs-5">
                                    <span >الموقع : </span>
                                    <span>${response.data.User.addresses}</span> 
                                </p>
                            </div>
                        </div>
        `;
        } else if (language == "en") {
        data.innerHTML = `
                <div class="data-user flex-fill">
                                <h3 class="fs-5"><span class=" ">Name : </span> <span>${response.data.User.userName}</span></h3>
                                <div class=" d-flex flex-column gap-1">
                                    <p class="fs-5">
                                        <span >Email : </span> 
                                        <span>${response.data.User.email}</span> 
                                    </p>
                                    <p class="fs-5">
                                        <span > Phone : </span>
                                        <span>${response.data.User.phone}</span> 
                                    </p>
                                    <p class="fs-5">
                                        <span >Location : </span>
                                        <span>${response.data.User.addresses}</span> 
                                    </p>
                                </div>
                            </div>
            `;
        }
    } catch (err) {
        console.error("Error:", err);
    }
}

// Elements
const profilePic = document.getElementById("profilePic");
const fileInput = document.getElementById("fileInput");
const uploadImageBtn = document.getElementById("uploadImageBtn");

uploadImageBtn.addEventListener("click", () => {
    fileInput.click();
    });

    fileInput.addEventListener("change", async function () {
    const file = fileInput.files[0];

    if (file && file.type.startsWith("image/")) {
        const formData = new FormData();
        formData.append("ProfilePicture", file);

        const token = localStorage.getItem("token");

        try {
        const response = await axios.post(
            "https://new-work-saudi.vercel.app/user/profilePic",
            formData,
            {
            headers: {
                "Content-Type": "multipart/form-data",
                token: token,
            },
            }
        );
        console.log(response.data);

        if (response.status === 200) {
            const reader = new FileReader();
            reader.onload = function (e) {
            profilePic.src = e.target.result;
            // localStorage.setItem('profilePic', e.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert("Failed to upload image. Please try again.");
        }
        } catch (error) {
        console.error("Error uploading the image:", error);
        alert("Error uploading the image.");
        }
    } else {
        alert("Please select a valid image file.");
    }
});

function saveLinks(){
    const token = localStorage.getItem('token');
    const loginList = document.getElementById("loginList");
    const logoutList = document.getElementById("logoutList");

    if (token!==null) {
        loginList.classList.replace("d-block", "d-none");
        logoutList.classList.replace("d-none", "d-block");
    } else {
        loginList.classList.replace("d-none", "d-block");
        logoutList.classList.replace("d-block", "d-none");
    }

}

window.onload = function () {
    bookingData();
    userData();
    // const savedImage = localStorage.getItem('profilePic');
    // if (savedImage) {
    //     profilePic.src = savedImage;
    // }
    saveLinks()
};
