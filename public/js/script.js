const buttons = document.querySelectorAll("[ button-status]");

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
