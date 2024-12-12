async function carList() {
  try {
    let res = await axios.get("https://new-work-saudi.vercel.app/car");
    console.log(res.data.cars);

    let placeholder = document.querySelector("#data");
    let out = "";

    const cars = Array.isArray(res.data.cars) ? res.data.cars : [];

    if (cars.length === 0) {
      out = "<tr><td colspan='7'>لا توجد سيارات متوفرة</td></tr>"; // Display a message if no cars are available
    } else {
      cars.forEach((car, index) => {
        out += `
                  <tr>
                      <td>${car._id}</td>
                      <td>${car.name}</td>
                      <td>${car.capacity}</td>
                      <td>${car.description}</td>
                      <td>${car.addresses}</td>
                      <td>${car.prices}</td>
                      <td>
                          <button class="btn btn-danger mb-2" car-id="${
                            car._id
                          }" category-id="${
          car.categoryId || car.categoryIden
        }" onclick="deleteCar(event)">
                              <i class="fa-solid fa-trash"></i>
                          </button>
                          <button type="button" class="btn btn-info updateButton mb-2" onclick="setFormForUpdate(${index})">تعديل</button>
                      </td>
                  </tr>`;
      });
    }

    placeholder.innerHTML = out;
  } catch (error) {
    console.error(
      "Error fetching car list:",
      error.response ? error.response.data : error.message
    );
    Swal.fire({
      icon: "error",
      title: "حدث خطأ أثناء جلب قائمة السيارات",
      text: "حاول مرة أخرى.",
      confirmButtonText: "حسنًا",
    });
  }
}

async function deleteCar(event) {
  const button = event.target.closest("button");
  const row = button.closest("tr");
  const carId = button.getAttribute("car-id");
  const categoryId = button.getAttribute("category-id");
  const userToken = localStorage.getItem("token");

  const isConfirmed = await Swal.fire({
    icon: "warning",
    title: "هل أنت متأكد أنك تريد حذف هذه السيارة؟ ",
    showCancelButton: true,
    confirmButtonText: "نعم",
    cancelButtonText: "لا",
  });

  if (!isConfirmed.isConfirmed) {
    return;
  }

  try {
    const response = await axios.delete(
      `https://new-work-saudi.vercel.app/car/deleteCar/${carId}`,
      {
        headers: {
          token: userToken,
        },
        data: {
          categoryId: categoryId,
        },
      }
    );

    if (response.data.err === "You are not authorized") {
      Swal.fire({
        icon: "error",
        title: "ليس لديك الصلاحية",
        confirmButtonText: "حسنًا",
      });
    } else {
      row.remove();
      Swal.fire({
        icon: "success",
        title: "تم حذف السيارة بنجاح!",
        confirmButtonText: "حسنًا",
      });
      carList();
    }
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    Swal.fire({
      icon: "error",
      title: "حدث خطأ أثناء حذف العنصر",
      text: "حاول مرة أخرى.",
      confirmButtonText: "حسنًا",
    });
  }
}

let indexUpdate = 0;
async function setFormForUpdate(index) {
  indexUpdate = index;
  document.getElementById("updateForm").classList.replace("d-none", "d-block");
  let res = await axios.get("https://new-work-saudi.vercel.app/car");
  const car = res.data.cars[index];

  document.getElementById("IDD").value = car._id;
  document.getElementById("name").value = car.name;
  document.getElementById("capacity").value = car.capacity;
  document.getElementById("description").value = car.description;
  document.getElementById("addresses").value = car.addresses;
  document.getElementById("prices").value = car.prices;
  document.getElementById("carImage").value = "";
}

async function updateCar(event) {
  event.preventDefault();

  const id = document.getElementById("IDD").value;
  const carImage = document.getElementById("carImage").files;
  const allowedExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
  const formData = new FormData();
  formData.append("id", id);
  formData.append("name", document.getElementById("name").value);
  formData.append("capacity", document.getElementById("capacity").value);
  formData.append("description", document.getElementById("description").value);
  formData.append("addresses", document.getElementById("addresses").value);
  formData.append("prices", document.getElementById("prices").value);
  if (carImage.length > 0) {
    for (let i = 0; i < carImage.length; i++) {
      const fileName = carImage[i].name.toLowerCase();
      const fileExtension = fileName.split(".").pop();
      if (!allowedExtensions.includes(fileExtension)) {
        Swal.fire({
          icon: "warning",
          title:
            "الرجاء تحميل صورة بصيغة معتمدة فقط (jpg, jpeg, png, gif, bmp, webp).",
          confirmButtonText: "حسنًا",
        });
        return;
      }
      formData.append("carImage", carImage[i]);
    }
  }

  const userToken = localStorage.getItem("token");

  try {
    const response = await axios.patch(
      `https://new-work-saudi.vercel.app/car/updateCar/${id}`,
      formData,
      {
        headers: {
          token: userToken,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.message === "Car updated successfully") {
      Swal.fire({
        icon: "success",
        title: "تم تعديل بيانات السيارة بنجاح",
        confirmButtonText: "حسنًا",
      });
      carList();
      document
        .getElementById("updateForm")
        .classList.replace("d-block", "d-none");
    }
    console.log(response.data);
  } catch (error) {
    console.error(
      "حدث خطأ أثناء تحديث البيانات برجاء المحاوله مرة أخري:",
      error
    );
    Swal.fire({
      icon: "error",
      title: "حدث خطأ أثناء تحديث البيانات",
      text: "برجاء المحاولة مرة أخرى.",
      confirmButtonText: "حسنًا",
    });
  }
}

window.onload = function () {
  carList();
};
