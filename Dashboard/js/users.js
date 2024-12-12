async function users() {
  try {
    const res = await axios.get("https://new-work-saudi.vercel.app/user");
    console.log(res.data.user);

    let placeholder = document.querySelector("#data");
    let out = "";

    const users = Array.isArray(res.data.user) ? res.data.user : [];

    if (users.length === 0) {
      out = "<tr><td colspan='8'>لا توجد بيانات موجودة</td></tr>";
      users.forEach((user) => {
        out += `
          <tr id="row-${user._id}">
            <td>${user._id}</td>
            <td>${user.userName}</td>
            <td>${user.phone}</td>
            <td>${user.email}</td>
            <td>${user.gender}</td>
            <td>${user.addresses}</td>
            <td>${user.age}</td>
            <td>
              <button class="btn btn-danger" onclick="deleteUser('${user._id}', document.getElementById('row-${user._id}'))">
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
      "Error fetching users:",
      error.response ? error.response.data : error.message
    );
    Swal.fire({
      icon: "error",
      title: "حدث خطأ أثناء جلب بيانات المستخدمين",
      text: "حاول مرة أخرى.",
      confirmButtonText: "حسنًا",
    });
  }
}

async function deleteUser(userId, rowElement) {
  const token = localStorage.getItem("token");
  Swal.fire({
    title: "هل تريد حذف المستخدم بالفعل؟",
    text: "لن تتمكن من التراجع عن هذا!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "نعم, احذفه!",
    cancelButtonText: "إلغاء",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        let res = await axios.delete(
          `https://new-work-saudi.vercel.app/user/deleteUser/${userId}`,
          {
            headers: {
              token: token,
            },
          }
        );
        if (res.data.err === "You are not authorized ") {
          Swal.fire({
            icon: "error",
            title: "ليس لديك الصلاحية",
            confirmButtonText: "حسنًا",
          });
        } else {
          rowElement.remove();
          Swal.fire("تم الحذف!", "تم حذف الرسالة بنجاح.", "success");
        }
      } catch (error) {
        console.error("Error deleting message:", error);
        Swal.fire("خطأ!", "حدث خطأ أثناء حذف الرسالة.", "error");
      }
    }
  });
}

window.onload = function () {
  users();
};
