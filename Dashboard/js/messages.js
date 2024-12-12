async function deleteMessage(messageId, rowElement) {
  const token = localStorage.getItem("token");
  Swal.fire({
    title: "هل تريد حذف الرسالة بالفعل؟",
    text: "لن تتمكن من التراجع عن هذا!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "نعم, احذفها!",
    cancelButtonText: "إلغاء",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        let res = await axios.delete(
          `https://new-work-saudi.vercel.app/message/deleteMessage/${messageId}`,
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
async function messages() {
  try {
    let res = await axios.get("https://new-work-saudi.vercel.app/message");
    let placeholder = document.querySelector("#data");
    let out = "";

    const messages = Array.isArray(res.data.messages) ? res.data.messages : [];

    if (messages.length === 0) {
      out = "<tr><td colspan='5'>لا توجد رسائل متوفرة</td></tr>"; 
    } else {
      for (let users of messages) {
        out += `
          <tr id="row-${users._id}">
            <td>${users._id}</td>
            <td>${users.name}</td>
            <td><a href="mailto:${users.email}" class="text-dark text-decoration-none">${users.email}</a></td>
            <td>${users.description}</td>
            <td>
              <button class="btn btn-danger" onclick="deleteMessage('${users._id}', document.getElementById('row-${users._id}'))">
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
        `;
      }
    }

    placeholder.innerHTML = out;
  } catch (error) {
    console.error(
      "Error fetching messages:",
      error.response ? error.response.data : error.message
    );
    Swal.fire({
      icon: "error",
      title: "حدث خطأ أثناء جلب الرسائل",
      text: "حاول مرة أخرى.",
      confirmButtonText: "حسنًا",
    });
  }
}

window.onload = function () {
  messages();
};
