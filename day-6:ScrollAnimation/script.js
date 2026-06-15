const wrapper = document.querySelector("#wrapper");
const boxes = document.querySelectorAll(".box");

window.addEventListener("scroll", visibility);

visibility();

function visibility() {
  const triggerBottom = (window.innerHeight / 5) * 4.5;

  boxes.forEach((box) => {
    const boxTop = box.getBoundingClientRect().top;

    if (boxTop <= triggerBottom) {
      box.classList.add("show");
    } else {
      box.classList.remove("show");
    }
  });
}
