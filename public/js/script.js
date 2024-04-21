const buttons = document.querySelectorAll("[button-status]");

//  filter status
if (buttons.length > 0) {
  let url = new URL(window.location.href);
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const status = btn.getAttribute("button-status");
      status
        ? url.searchParams.set("status", status)
        : url.searchParams.delete("status");
      window.location.href = url.href;
    });
  });
}

// form search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e.target.elements.keyword.value);
    const keyword = e.target.elements.keyword.value;
    keyword
      ? url.searchParams.set("keyword", keyword)
      : url.searchParams.delete("keyword");

    window.location.href = url.href;
  });
}

//current page
const buttonPagination = document.querySelectorAll("[button-pagination]");
if (buttonPagination.length > 0) {
  let url = new URL(window.location.href);
  buttonPagination.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      page ? url.searchParams.set("page", page) : url.searchParams.set("page");
      window.location.href = url.href;
      button.classList.add("btn-primary");
    });
  });
}


//start checked button
const checkboxMutil = document.querySelector("[checkboxMutil]");
if (checkboxMutil) {
  const checkboxAll = checkboxMutil.querySelector("input[name='checkall']");
  const checkboxId = checkboxMutil.querySelectorAll("input[name='id']");
  checkboxAll.addEventListener("click", () => {
    checkboxAll.checked 
      ?
        checkboxId.forEach((item) => { item.checked = true; }) 
      : checkboxId.forEach((item) => { item.checked = false; });
  })

  checkboxId.forEach((item) => {
    item.addEventListener("click", () => {
      const countChecked = checkboxMutil.querySelectorAll("input[name='id']:checked").length;
      (countChecked == checkboxId.length) ?
          checkboxAll.checked = true 
        : checkboxAll.checked = false
    })
  })
}
//end checked button

//start form change mutli
const formChangeMutil = document.querySelector("[form-change-multi]")
if(formChangeMutil){
  formChangeMutil.addEventListener("submit", (e) => {
    e.preventDefault();

    const typeChange = e.target.elements.type.value
    if(typeChange == "delete-all"){
      const isConfirm = confirm("Bạn có chắc chắn muốn xóa những sản phẩm này")
      if(!isConfirm)
        return  
    }
   
    const checkboxMutil = document.querySelector("[checkboxMutil]");
    const listChecked = checkboxMutil.querySelectorAll("input[name='id']:checked")
    if(listChecked.length > 0){
      let ids = []
      listChecked.forEach((item) => {
        const id = item.value
        if(typeChange == "change-position"){
          let position = item.closest("tr").querySelector("input[name='position']").value
          ids.push(`${id}-${position}`);
        }else{
          ids.push(item.value)
        }
      })
      ids = ids.join(",")
      const inputId = document.querySelector("input[name='ids']")
      inputId.value = ids 
      formChangeMutil.submit()
    }

  })
}
//end form change mutli



// alert
const showAlert = document.querySelector("[show-alert]")
if(showAlert){
  const dataTime = showAlert.getAttribute("data-time")
  setTimeout(()=>{
    showAlert.classList.add("alert-hidden")
  },dataTime)
  const closeMessage = document.querySelector("[close-message]")
  closeMessage.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden")
  })
}


//start| Preview an image before it is uploaded

const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]");
  const uploadImagePreview = document.querySelector("[upload-image-preview]");
  const uploadImageClose = document.querySelector("[upload-image-close]");

  uploadImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);
      [uploadImagePreview, uploadImageClose].forEach((el) =>
        el.classList.toggle("d-block", true)
      );
    }
  });

  uploadImageClose.addEventListener("click", () => {
    uploadImagePreview.src = "";
    [uploadImagePreview, uploadImageClose].forEach((el) =>
      el.classList.toggle("d-block", false)
    );
    uploadImageInput.value = "";
  });
}


//end| Preview an image before it is uploaded
