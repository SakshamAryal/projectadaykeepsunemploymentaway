const search = document.querySelector(".search");
const searchbar = document.querySelector("input");
const button = document.querySelector(".btn");

button.addEventListener("click", () => {
  search.classList.toggle("active");
  searchbar.disabled = !searchbar.disabled;
  searchbar.value = "";
  searchbar.focus();
});
