const panels = document.querySelectorAll(".card");

panels.forEach((panel) => {
  panel.addEventListener("click", () => {
    removeActiveClasses();
    panel.classList.add("open");
  });
});

function removeActiveClasses() {
  panels.forEach((panel) => {
    panel.classList.remove("open");
  });
}
