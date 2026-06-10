const bar = document.getElementById("progress");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const circles = document.querySelectorAll(".circle");

let position = 1;

next.addEventListener("click", () => {
  if (position < circles.length) {
    position++;
  }
  update();
});

prev.addEventListener("click", () => {
  if (position > 1) {
    position--;
  }
  update();
});

function update() {
  circles.forEach((circle, i) => {
    if (i <= position - 1) {
      circle.classList.add("active");
    } else {
      circle.classList.remove("active");
    }
  });
  const active = document.querySelectorAll(".active");
  bar.style.width = ((position - 1) / (circles.length - 1)) * 100 + "%";

  if (position == 1) {
    prev.disabled = true;
  } else if (position === 5) {
    next.disabled = true;
  } else {
    next.disabled = false;
    prev.disabled = false;
  }
}
