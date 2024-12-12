async function rents() {
  try {
    let res = await axios.get("https://new-work-saudi.vercel.app/rent");
    let placeholder = document.querySelector("#data");
    console.log(res.data);

    let out = "";

    const rents = Array.isArray(res.data.rent) ? res.data.rent : [];

    if (rents.length === 0) {
      out = "<tr><td colspan='13'>لا توجد حجوزات متوفرة</td></tr>"; // Message if no rent data
    } else {
      rents.forEach((user, index) => {
        out += `
                    <tr data-index="${index}">
                        <td>${user.rentalCode}</td>
                        <td>${user.firstName} ${user.lastName}</td>
                        <td>${user.email}</td>
                        <td>${user.phone}</td>
                        <td>${user.car}</td>
                        <td>${user.Time}</td>
                        <td>${user.rentDate}</td>
                        <td>${user.startingPoint}</td>
                        <td>${user.arrivalPoint}</td>
                        <td>${user.price}</td>
                        <td>${user.status}</td>
                        <td>${user.paymentType}</td>
                        <td class="d-flex flex-column gap-1">
                            <button class="bg-danger deleteButton btn" data-id="${user._id}">
                              <i class="fa-solid fa-trash"></i>
                            </button>
                            <button type="button" class="btn btn-info p-3 rounded-1 updateButton" data-id="${user._id}" onclick="setFormForUpdate(${index})">تعديل</button>
                        </td>
                    </tr>
                `;
      });
    }

    placeholder.innerHTML = out;

    document.querySelectorAll(".deleteButton").forEach((button) => {
      button.addEventListener("click", deleteRow);
    });
  } catch (error) {
    console.error(
      "Error fetching rents:",
      error.response ? error.response.data : error.message
    );
    Swal.fire({
      icon: "error",
      title: "حدث خطأ أثناء جلب بيانات الإيجارات",
      text: "حاول مرة أخرى.",
      confirmButtonText: "حسنًا",
    });
  }
}

async function deleteRow(event) {
  const button = event.target;
  const row = button.closest("tr");
  const rentId = button.getAttribute("data-id");
  const userToken = localStorage.getItem("token");

  const isConfirmed = await Swal.fire({
    icon: "warning",
    title: "هل أنت متأكد أنك تريد حذف هذا الحجز؟",
    showCancelButton: true,
    confirmButtonText: "نعم",
    cancelButtonText: "لا",
  });

  if (!isConfirmed.isConfirmed) {
    return;
  }

  try {
    const response = await axios.delete(
      `https://new-work-saudi.vercel.app/rent/deleteRent/${rentId}`,
      {
        headers: {
          token: userToken,
        },
      }
    );
    console.log(response);
    console.log(response.data.err);

    if (response.data.err === "You are not authorized ") {
      Swal.fire({
        icon: "error",
        title: "ليس لديك الصلاحية",
        confirmButtonText: "حسنًا",
      });
    } else {
      console.error("Error:", response.data);
      row.remove();
      rents();
      Swal.fire({
        icon: "success",
        title: "تم حذف العنصر بنجاح",
        confirmButtonText: "حسنًا",
      });
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
  let res = await axios.get("https://new-work-saudi.vercel.app/rent");
  const rent = res.data.rent[index];

  document.getElementById("IDD").value = rent._id;
  document.getElementById("firstName").value = rent.firstName;
  document.getElementById("lastName").value = rent.lastName;
  document.getElementById("email").value = rent.email;
  document.getElementById("phone").value = rent.phone;
  document.getElementById("car").value = rent.car;
  document.getElementById("Time").value = rent.Time;
  document.getElementById("Date").value = rent.rentDate;
  document.getElementById("startingPoint").value = rent.startingPoint;
  document.getElementById("arrivalPoint").value = rent.arrivalPoint;
  document.getElementById("price").value = rent.price;
  document.getElementById("status").value = rent.status;
}

async function updateRent(event) {
  event.preventDefault();

  const id = document.getElementById("IDD").value;
  const updatedRent = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    car: document.getElementById("car").value,
    Time: document.getElementById("Time").value,
    rentDate: document.getElementById("Date").value,
    startingPoint: document.getElementById("startingPoint").value,
    arrivalPoint: document.getElementById("arrivalPoint").value,
    price: document.getElementById("price").value,
    status: document.getElementById("status").value,
  };

  const userToken = localStorage.getItem("token");

  try {
    const response = await axios.put(
      `https://new-work-saudi.vercel.app/rent/updateRent/${id}`,
      updatedRent,
      {
        headers: {
          token: userToken,
        },
      }
    );

    if (response.data.message === "Rent Updated successfully") {
      Swal.fire({
        icon: "success",
        title: "تم تحديث البيانات بنجاح",
        confirmButtonText: "حسنًا",
      });
      rents();
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
      title: "فشل في تحديث البيانات",
      text: "حدث خطأ أثناء تحديث البيانات. حاول مرة أخرى.",
      confirmButtonText: "حسنًا",
    });
  }
}

window.onload = function () {
  rents();
};
