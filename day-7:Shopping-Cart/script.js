const list = document.querySelector("#item-list");
const clear = document.querySelector("#clear");
const input = document.querySelector("#item-input");
const form = document.querySelector("#item-form");
const formBtn = form.querySelector("button");
const filter = document.querySelector("#filter");
form.addEventListener("submit", (e) => addItem(e));
clear.addEventListener("click", clearAll);
filter.addEventListener("input", (e) => filterItems(e));
checkUI();
fetchItem();
let isEditMode = false;
function addItem(e) {
  e.preventDefault();

  const name = input.value;
  if (name === "" || checkDuplicate(name)) {
    checkUI();
    return;
  } else if (isEditMode) {
    removeItem(list.querySelector(".editing"));
  }
  addItemToDom(name);
  addItemToStorage(name);
}

function createButton(classname) {
  const button = document.createElement("button");
  button.className = classname;
  button.appendChild(createIcon("fa-solid fa-xmark"));
  return button;
}

function createIcon(classname) {
  const icon = document.createElement("i");
  icon.className = classname;
  return icon;
}
function onItemClick(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

function setItemToEdit(item) {
  isEditMode = true;
  const items = list.querySelectorAll("li");
  items.forEach((item) => {
    item.classList.remove("editing");
  });
  item.classList.add("editing");
  input.focus();
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
  formBtn.style.backgroundColor = "green";
  input.value = item.textContent;
}

function removeItem(item) {
  removeStoredItem(item.firstChild.textContent);
  item.remove();
  checkUI();
}

function checkUI() {
  const items = list.querySelectorAll("li");
  input.value = "";
  if (items.length === 0) {
    filter.parentElement.style.display = "none";
    clear.style.display = "none";
  } else {
    filter.parentElement.style.display = "block";
    clear.style.display = "block";
  }
  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = "black";
}

function clearAll() {
  const items = list.querySelectorAll("li");
  items.forEach((item) => {
    item.remove();
  });
  checkUI();
  localStorage.clear();
}

function filterItems(e) {
  const items = list.querySelectorAll("li");
  const input = e.target.value;

  items.forEach((item) => {
    const name = item.firstChild.textContent;
    if (name.indexOf(input) !== -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function addItemToDom(name) {
  const item = document.createElement("li");
  item.textContent = name;
  item.appendChild(createButton("remove-item btn-link text-red"));
  list.appendChild(item);
  input.value = "";
  item.addEventListener("click", (e) => onItemClick(e));
  checkUI();
}

function addItemToStorage(item) {
  let items = localStorage.getItem("items");

  if (items === null) {
    items = [];
  } else {
    items = JSON.parse(items);
  }
  items.push(item);

  localStorage.setItem("items", JSON.stringify(items));
}

function fetchItem() {
  let items = localStorage.getItem("items");
  if (items === null) {
    return;
  }
  items = JSON.parse(items);
  items.forEach((item) => {
    addItemToDom(item);
  });
}

function removeStoredItem(trash) {
  let items = JSON.parse(localStorage.getItem("items"));
  items = items.filter((item) => item !== trash);
  localStorage.setItem("items", JSON.stringify(items));
}

function checkDuplicate(name) {
  let items = localStorage.getItem("items");
  let output = false;
  if (items === null) {
    return output;
  }

  items = JSON.parse(items);
  items.forEach((item) => {
    if (item === name) {
      output = true;
    }
  });
  return output;
}
