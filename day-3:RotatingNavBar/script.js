const open = document.getElementById("open");
const close = document.getElementById("close");
const wrapper = document.querySelector(".wrapper");
const nav = document.querySelector("nav");
open.addEventListener("click", () => {
  wrapper.classList.add("show-nav");
  nav.classList.add("show-nav");
  open.style.transform = "rotate(-90deg)";
  close.style.transform = "rotate(0deg)";
});

close.addEventListener("click", () => {
  wrapper.classList.remove("show-nav");
  nav.classList.remove("show-nav");
  open.style.transform = "rotate(0deg)";
  close.style.transform = "rotate(90deg)";
});
