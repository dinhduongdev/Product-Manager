// started change status

const formChange = document.querySelector("form[id='form-change-status']");
const buttonStatus = document.querySelectorAll("[button-change-status]");
if (buttonStatus.length > 0) {
  buttonStatus.forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.getAttribute("data-id");
      const status = item.getAttribute("data-status");
      let statusChange = status == "active" ? "inactive" : "active";
      const path = formChange.getAttribute("path");
      const action = path + `${statusChange}/${id}?_method=PATCH`;
      formChange.action = action;
      formChange.submit();
    });
  });
}
// end change status


// start delete item
const formDelete = document.querySelector("form[id='form-delete-item']");
if(formDelete){
  const listBtn = document.querySelectorAll("[btn-delete-item]")
  listBtn.forEach((item) =>{
    item.addEventListener("click", () => {
      const isConfirm =  confirm("Bạn có chắc chắn muốn xóa những sản phẩm này")
      if(!isConfirm){
        return
      }
      const id = item.getAttribute("data-id");
      const path = formDelete.getAttribute("path");
      const action = path + `${id}?_method=DELETE`;
      console.log(action);
      formDelete.action = action;
      formDelete.submit();
    })
  })


}
// end delete item