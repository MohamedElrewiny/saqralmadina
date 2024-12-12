const languageSelect = document.querySelector('.language-select');
languageSelect.addEventListener('change', function() {
    location.reload();
});



let language=localStorage.getItem('language')
async function loadCategories(language) {
    try {
        const response = await axios.get(`https://new-work-saudi.vercel.app/category?lang=${language}`);
        const categories = response.data.name; 
        const placesDiv = document.querySelector('.places');
        placesDiv.innerHTML = ''; 
console.log(language);


        console.log(categories);

        categories.forEach((category, index) => {
            const button = document.createElement('button');
            button.className = 'btn buttonOne';
            button.textContent = category.name; 
            button.onclick = () => handleCategoryClick(category._id);  
            placesDiv.appendChild(button);
            if (index === 0) {
                handleCategoryClick(category._id);
            }
            
        });

    } catch (error) {
        // console.error('حدث خطأ أثناء تحميل الفئات:', error);
        // alert('حدث خطأ أثناء تحميل الفئات. حاول مرة أخرى.');
    }
}



async function handleCategoryClick(categoryId) {
    try {
        const response = await axios.get(`https://new-work-saudi.vercel.app/car/carByCatId/${categoryId}`);
        const cars = response.data.car;
        const dataContentDiv = document.getElementById('data-content-car');
        let htmlContent = ''; 

        if(language=='ar'){
            cars.forEach(car => {
                htmlContent += `
                <div class="col">
                        <div class="card border-0">
                            <div class=" d-flex flex-column p-3">
                                <div class="image "  >
                                    <a>
                                        <img src="${car.carImage[0].secure_url}"  alt="Car Image" class="w-100" height="200px">
                                    </a>
                                </div>
                                <div class="text">
                                    <div class="txt">
                                        <h4 class="my-2 p-0"><a" class=" main-color">${car.name} </a></h4>
                                        <p class=" dark-color overflow-auto" style="height: 100px;" >${car.description}  </p>
                                    </div>
                                    <div class="price d-flex align-items-center justify-content-between">
                                        <span class="fw-bold main-color"> ${car.prices}  </span>
                                        <button class="btn booknowBtn" onclick="storeCarIdAndRedirect('${car._id}', '${car.prices}', '${car.name}')"><a >  احجز الأن</a></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
            });
        }else if(language=='en'){
            cars.forEach(
                car => {
                    htmlContent += `
                    <div class="col">
                            <div class="card border-0">
                                <div class=" d-flex flex-column p-3">
                                    <div class="image "  >
                                        <a>
                                            <img src="${car.carImage[0].secure_url}"  alt="Car Image" class="w-100" height="200px">
                                        </a>
                                    </div>
                                    <div class="text">
                                        <div class="txt">
                                            <h4 class="my-2 p-0"><a" class=" main-color">${car.name} </a></h4>
                                            <p class=" dark-color overflow-auto" style="height: 100px;" >${car.description}  </p>
                                        </div>
                                        <div class="price d-flex align-items-center justify-content-between">
                                            <span class="fw-bold main-color"> ${car.prices}  </span>
                                            <button class="btn booknowBtn" onclick="storeCarIdAndRedirect('${car._id}', '${car.prices}', '${car.name}')"><a > Book Now</a></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                }
            );
        }




        dataContentDiv.innerHTML = htmlContent;

    } catch (error) {
        console.error('حدث خطأ أثناء جلب بيانات السيارات:', error);
        alert('حدث خطأ أثناء جلب بيانات السيارات. حاول مرة أخرى.');
    }
}

function storeCarId(carId,price,name) {
    localStorage.setItem('selectedCarId', carId);
    localStorage.setItem('carPrice', price);
    localStorage.setItem('carType', name);
}

function storeCarIdAndRedirect(carId,price,name) {
    storeCarId(carId,price,name);

    if(localStorage.getItem('token')!=null){
        window.location.href = '../Car.html';
    }
    else{
        // window.location.href = '../login.html';
        window.location.href = '../Car.html';

    }
}

async function getCarName() {
    let carId = localStorage.getItem('selectedCarId');
    try {
        const response = await axios.get(`https://new-work-saudi.vercel.app/car/carById/${carId}`);
        
        let head = document.getElementById("headd");

        // Update the innerHTML of the `headd` div
        head.innerHTML = `
            <h1 class="text-center fw-bold pb-4 position-relative fs-2 main-color" id="Head">${response.data.car.name}</h1> 
        `;
        
    } catch (error) {
        // console.error('حدث خطأ أثناء تحميل السيارة:', error);
        // Optionally, you can display an alert or message if an error occurs
        // alert('حدث خطأ أثناء تحميل السيارة. حاول مرة أخرى.');
    }
}


async function loadCategoriesData() {
    let carId = localStorage.getItem('selectedCarId');
    try {
        const response = await axios.get(`https://new-work-saudi.vercel.app/car/carById/${carId}`);
        document.getElementById('price').value = response.data.car.prices;
        document.getElementById('car').value = response.data.car.name;

        const placesDiv = document.querySelector('.infoo');
        let htmlContent = ''; 
        htmlContent .innerHTML = '';
        if(language=='ar'){
            htmlContent +=`
            <p class="demo fs-5" id="One">  ${response.data.car.description} </p>
            <span class="fs-5" id="big"><span class="one" id="categ">الفئة: </span> ${response.data.car.addresses}  </span>
            <p class="fs-5" id="big3"><span class="one" id="typecar">نوع السيارة: </span>${response.data.car.name}</p>
            <p class="fs-5 fw-bold" id="big4"> <span class="one" id="salary">السعر : </span>${response.data.car.prices}  <span id="reyal">  ريال </span></p>
        `
        }else if(language=='en'){
            htmlContent +=`
            <p class="demo fs-5" id="One">  ${response.data.car.description} </p>
            <span class="fs-5" id="big"><span class="one" id="categ">Category: </span> ${response.data.car.addresses}  </span>
            <p class="fs-5" id="big3"><span class="one" id="typecar">Type of Car : </span>${response.data.car.name}</p>
            <p class="fs-5 fw-bold" id="big4"> <span class="one" id="salary">Price : </span>${response.data.car.prices}  <span id="reyal">  SAR </span></p>
        `
        }
        
        placesDiv.innerHTML=htmlContent;
    
    } catch (error) {
        // console.error('حدث خطأ أثناء تحميل الفئات:', error);
        // alert('حدث خطأ أثناء تحميل الفئات. حاول مرة أخرى.');
    }
}


async function loadCategoriesImage() {
    const carId = localStorage.getItem('selectedCarId');
    try {
        const response = await axios.get(`https://new-work-saudi.vercel.app/car/carById/${carId}`);
        const images = response.data.car.carImage;
        const data = document.querySelector('.swiper-container-wrapper');
        let htmlContent = '';
        let imageSlides = '';
        let thumbnailSlides = '';
        images.forEach(image => {




            imageSlides += `
                <swiper-slide style="height:450px">
                    <img src="${image.secure_url}" style="width: 100%;height:100%" alt="Car Image" />
                </swiper-slide>`;
            thumbnailSlides += `
                <swiper-slide>
                    <img src="${image.secure_url}" style="width: 100%;height:120px" alt="Car Image" />
                </swiper-slide>`;
        });
        htmlContent += `
            <swiper-container
                style="
                --swiper-navigation-color: #fff;
                --swiper-pagination-color: #fff;
                "
                class="mySwiper"
                thumbs-swiper=".mySwiper2"
                space-between="10"
                navigation="true"
            >
                ${imageSlides}
            </swiper-container>
            <swiper-container
                class="mySwiper2 mt-2"
                space-between="10"
                slides-per-view="4"
                free-mode="true"
                watch-slides-progress="true"
            >
                ${thumbnailSlides}
            </swiper-container>
        `;

        data.innerHTML = htmlContent;
        const swiper = new Swiper('.mySwiper', {
            navigation: true,
            thumbs: {
                swiper: new Swiper('.mySwiper2', {
                    slidesPerView: 3,
                    spaceBetween: 10,
                    freeMode: true,
                    watchSlidesProgress: true,
                })
            }
        });

    } catch (error) {
        // console.error('حدث خطأ أثناء جلب بيانات السيارة:', error);
        // alert('حدث خطأ أثناء جلب بيانات السيارة. حاول مرة أخرى.');
    }
}




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



window.onload = function() {
    loadCategories(language);
    loadCategoriesData()
    loadCategoriesImage() 
    getCarName()
    saveLinks()
};






