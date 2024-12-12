async function categoryList() {
  try {
    let res = await axios.get("https://new-work-saudi.vercel.app/category/all");
    console.log(res.data.cat, res.data.caten); // Debugging

    let placeholder = document.querySelector("#data");
    let out = "";

    const catData = Array.isArray(res.data.cat) ? res.data.cat : [];
    const catenData = Array.isArray(res.data.caten) ? res.data.caten : [];

    const allCategories = [...catData, ...catenData];

    if (allCategories.length === 0) {
      out = "<tr><td colspan='3'>لا توجد فئات موجودة</td></tr>"; // Display a message if there are no categories
    } else {
      allCategories.forEach((cat, index) => {
        out += `
            <tr>
                <td>${cat._id}</td>
                <td>${cat.name}</td>
                <td>
                    <button class="btn btn-danger mb-2" cat-id="${cat._id}" onclick="deleteCategory(event)">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
          `;
      });
    }

    placeholder.innerHTML = out;
  } catch (error) {
    console.error(
      "Error fetching category list:",
      error.response ? error.response.data : error.message
    );
    Swal.fire({
      icon: "error",
      title: "حدث خطأ أثناء جلب قائمة الفئات",
      text: "حاول مرة أخرى.",
      confirmButtonText: "حسنًا",
    });
  }
}

async function deleteCategory(event) {
  const button = event.target.closest("button");
  const row = button.closest("tr");
  const catId = button.getAttribute("cat-id");
  const userToken = localStorage.getItem("token");

  const isConfirmed = await Swal.fire({
    icon: "warning",
    title: "هل أنت متأكد أنك تريد حذف هذه الفئة؟ ",
    showCancelButton: true,
    confirmButtonText: "نعم",
    cancelButtonText: "لا",
  });

  if (!isConfirmed.isConfirmed) {
    return;
  }

  try {
    const response = await axios.delete(
      `https://new-work-saudi.vercel.app/category/deleteCategory/${catId}`,
      {
        headers: {
          token: userToken,
        },
      }
    );
    if (response.data.err === "You are not authorized ") {
      Swal.fire({
        icon: "error",
        title: "ليس لديك الصلاحية",
        confirmButtonText: "حسنًا",
      });
    } else {
      row.remove();
      categoryList();
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

window.onload = function () {
  categoryList();
};
