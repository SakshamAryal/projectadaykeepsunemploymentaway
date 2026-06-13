const blur_bg = document.querySelector(".container");
const loading = document.querySelector(".loading");
let load = 0;
let initial_blur = 70;
let int = setInterval(blurring, 10);
function blurring() {
  load++;
  let pixels = 70 - (load * 70) / 100;
  blur_bg.style.filter = `blur(${pixels}px)`;
  if (load > 99) {
    clearInterval(int);
  }
  loading.textContent = load + "%";
}
