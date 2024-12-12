async function addCategoryAr(event) {
  event.preventDefault();

  const categoryName = document.getElementById("name").value;

  if (!categoryName) {
    Swal.fire({
      icon: "warning",
      title: "يرجى ملء جميع الحقول.",
      confirmButtonText: "حسنًا",
    });
    return;
  }

  const data = {
    name: categoryName,
  };

  let userToken = localStorage.getItem("token");

  try {
    const response = await axios.post(
      "https://new-work-saudi.vercel.app/category/addCategory",
      data,
      {
        headers: {
          token: userToken,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.message === "Category created successfully") {
      Swal.fire({
        icon: "success",
        title: "تمت إضافة الفئة بنجاح",
        confirmButtonText: "حسنًا",
      });
      loadCategories();
    } else {
      Swal.fire({
        icon: "error",
        title: "حدث خطأ أثناء إضافة الفئة",
        text: "حاول مرة أخرى.",
        confirmButtonText: "حسنًا",
      });
    }
    console.log(response.data);
  } catch (error) {
    console.error("حدث خطأ أثناء إضافة الفئة:", error);
    Swal.fire({
      icon: "error",
      title: "حدث خطأ أثناء إضافة الفئة",
      text: error.response ? error.response.data.message : "حاول مرة أخرى.",
      confirmButtonText: "حسنًا",
    });
  }
}

async function addCategoryEn(event) {
  event.preventDefault();

  const categoryName = document.getElementById("name").value;

  if (!categoryName) {
    Swal.fire({
      icon: "warning",
      title: "يرجى ملء جميع الحقول.",
      confirmButtonText: "حسنًا",
    });
    return;
  }

  const data = {
    name: categoryName,
  };

  let userToken = localStorage.getItem("token");

  try {
    const response = await axios.post(
      "https://new-work-saudi.vercel.app/category/addCategoryen",
      data,
      {
        headers: {
          token: userToken,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.message === "Category created successfully") {
      Swal.fire({
        icon: "success",
        title: "تمت إضافة الفئة بنجاح",
        confirmButtonText: "حسنًا",
      });
      loadCategories();
    } else {
      Swal.fire({
        icon: "error",
        title: "حدث خطأ أثناء إضافة الفئة",
        text: "حاول مرة أخرى.",
        confirmButtonText: "حسنًا",
      });
    }
    console.log(response.data);
  } catch (error) {
    console.error("حدث خطأ أثناء إضافة الفئة:", error);
    Swal.fire({
      icon: "error",
      title: "حدث خطأ أثناء إضافة الفئة",
      text: error.response ? error.response.data.message : "حاول مرة أخرى.",
      confirmButtonText: "حسنًا",
    });
  }
}

async function loadCategories() {
  try {
    const response = await axios.get(
      "https://new-work-saudi.vercel.app/category/all"
    );
    const categories = Array.isArray(response.data.cat)
      ? response.data.cat
      : [];
    const categoriesEn = Array.isArray(response.data.caten)
      ? response.data.caten
      : [];

    const categorySelect = document.getElementById("categoryId");
    categorySelect.innerHTML = ""; 

    if (categories.length === 0 && categoriesEn.length === 0) {
      const option = document.createElement("option");
      option.textContent = "لا توجد فئات موجودة";
      option.disabled = true;
      categorySelect.appendChild(option);
    } else {
      categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category._id;
        option.textContent = `${category.name} `;
        categorySelect.appendChild(option);
      });

      categoriesEn.forEach((category) => {
        const option = document.createElement("option");
        option.value = category._id;
        option.textContent = `${category.name} `;
        categorySelect.appendChild(option);
      });
    }

    console.log(response.data);
  } catch (error) {
    console.error("حدث خطأ أثناء تحميل الفئات:", error);
    Swal.fire({
      icon: "error",
      title: "حدث خطأ أثناء تحميل الفئات",
      text: "حاول مرة أخرى.",
      confirmButtonText: "حسنًا",
    });
  }
}

window.onload = function () {
  loadCategories();
};

async function addCarAr() {
  let name = document.getElementById("Name").value;
  let capacity = document.getElementById("capacity").value;
  let description = document.getElementById("description").value;
  let addresses = document.getElementById("addresses").value;
  let prices = document.getElementById("prices").value;
  let categoryId = document.getElementById("categoryId").value.trim();
  let carImage = document.getElementById("images").files;
  const userToken = localStorage.getItem("token");

  if (
    !name ||
    !capacity ||
    !description ||
    !addresses ||
    !prices ||
    !categoryId ||
    carImage.length === 0
  ) {
    Swal.fire({
      icon: "warning",
      title: "الرجاء ملء جميع الحقول المطلوبة.",
      confirmButtonText: "حسنًا",
    });
    return;
  }

  console.log(categoryId);

  let formData = new FormData();
  formData.append("name", name);
  formData.append("capacity", capacity);
  formData.append("description", description);
  formData.append("addresses", addresses);
  formData.append("prices", prices);
  formData.append("categoryId", categoryId);
  const validExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];

  for (let i = 0; i < carImage.length; i++) {
    let fileName = carImage[i].name.toLowerCase();
    let fileExtension = fileName.split(".").pop();
    if (!validExtensions.includes(fileExtension)) {
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

  try {
    const response = await axios.post(
      "https://new-work-saudi.vercel.app/car/addCar",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          token: userToken,
        },
      }
    );

    if (response.data.message === "Car created successfully") {
      Swal.fire({
        icon: "success",
        title: "تم إضافة العربية بنجاح",
        confirmButtonText: "حسنًا",
      });

      document.getElementById("Name").value = "";
      document.getElementById("capacity").value = "";
      document.getElementById("description").value = "";
      document.getElementById("addresses").value = "";
      document.getElementById("prices").value = "";
      document.getElementById("categoryId").value = ""; 

      
    }
    console.log(response.data);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    Swal.fire({
      icon: "error",
      title: "حدث خطأ",
      text: "حاول مرة أخرى.",
      confirmButtonText: "حسنًا",
    });
  }
}

async function addCarEn() {
  let name = document.getElementById("Name").value;
  let capacity = document.getElementById("capacity").value;
  let description = document.getElementById("description").value;
  let addresses = document.getElementById("addresses").value;
  let prices = document.getElementById("prices").value;
  let categoryId = document.getElementById("categoryId").value.trim();
  let carImage = document.getElementById("images").files;
  const userToken = localStorage.getItem("token");

  if (
    !name ||
    !capacity ||
    !description ||
    !addresses ||
    !prices ||
    !categoryId ||
    carImage.length === 0
  ) {
    Swal.fire({
      icon: "warning",
      title: "الرجاء ملء جميع الحقول المطلوبة.",
      confirmButtonText: "حسنًا",
    });
    return;
  }

  console.log(categoryId);

  let formData = new FormData();
  formData.append("name", name);
  formData.append("capacity", capacity);
  formData.append("description", description);
  formData.append("addresses", addresses);
  formData.append("prices", prices);
  formData.append("categoryIden", categoryId);
  const validExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];

  for (let i = 0; i < carImage.length; i++) {
    let fileName = carImage[i].name.toLowerCase();
    let fileExtension = fileName.split(".").pop();
    if (!validExtensions.includes(fileExtension)) {
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

  try {
    const response = await axios.post(
      "https://new-work-saudi.vercel.app/car/addcaren",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          token: userToken,
        },
      }
    );

    if (response.data.message === "Car created successfully") {
      Swal.fire({
        icon: "success",
        title: "تم إضافة العربية بنجاح",
        confirmButtonText: "حسنًا",
      });

      // Clear the form fields after successful submission
      document.getElementById("Name").value = "";
      document.getElementById("capacity").value = "";
      document.getElementById("description").value = "";
      document.getElementById("addresses").value = "";
      document.getElementById("prices").value = "";
      document.getElementById("categoryId").value = ""; 

     
    }
    console.log(response.data);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    Swal.fire({
      icon: "error",
      title: "حدث خطأ",
      text: "حاول مرة أخرى.",
      confirmButtonText: "حسنًا",
    });
  }
}
