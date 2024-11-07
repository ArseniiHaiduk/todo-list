const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addButton = document.querySelector(".row button");
const removeAllTasks = document.querySelector(".del-btn");
const removeDoneTasks = document.querySelector(".del-done-btn");

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something");
  } else {
    let li = document.createElement("li");
    let p = document.createElement("p");
    p.innerHTML = inputBox.value;
    listContainer.append(li);
    li.append(p);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.append(span);
  }
  inputBox.value = "";
  saveData();
}

addButton.addEventListener("click", addTask);

inputBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

listContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.tagName === "P") {
    const liElement = e.target.parentElement;
    if (liElement) {
      liElement.classList.toggle("checked");
    }
    saveData();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  }
});

removeAllTasks.addEventListener("click", () => {
  listContainer.innerHTML = "";
  saveData();
});

removeDoneTasks.addEventListener("click", () => {
  const doneTasks = document.querySelectorAll(".checked");
  doneTasks.forEach((task) => {
    task.remove();
  });
  saveData();
});

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
