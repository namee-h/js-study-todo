let userInput = document.getElementById("user-input");
let addButton = document.getElementById("add-button-area");
let tabs = document.querySelectorAll(".tab-items div");
let underLine = document.getElementById("under-line");
let deleteAll = document.getElementById("delete-all");
let isComplete = false;
let mode = "all";
let taskList = [];
let filterList = [];
let list = [];

for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (e) {
    filter(e);
  });
}

addButton.addEventListener("click", addTask);
userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    document.getElementById("add-button-area").click();
  }
});
deleteAll.addEventListener("click", (e) => {
  if (taskList.length !== 0 && mode === "all") {
    taskList = [];
    list = [];
    filterList = [];
    render();
  }
});

function addTask() {
  let taskValue = userInput.value;
  if (taskValue === "") return alert("할 일을 입력해주세요");
  let task = {
    content: taskValue,
    isComplete: false,
    id: generateRandomID(),
  };
  taskList.push(task);
  console.log(taskList);
  userInput.value = "";
  render();
}

function render() {
  let result = "";
  list = [];
  if (mode === "all") {
    list = taskList;
  } else {
    list = filterList;
  }
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete === true) {
      result += `
        <li class="todo-item task-done">
                    <span>
                        <input onclick="toggleDone('${list[i].id}')" type="checkbox">
                        <label>${list[i].content}</label>
                    </span>
                    <span>
                        <i onclick="deleteTask('${list[i].id}')" class="fa-solid fa-trash-can"></i>
                    </span>
                </li>
        `;
    } else {
      result += `
          <li class="todo-item">
                    <span>
                        <input onclick="toggleDone('${list[i].id}')" type="checkbox">
                        <label>${list[i].content}</label>
                    </span>
                    <span>
                        <i onclick="deleteTask('${list[i].id}')" class="fa-solid fa-trash-can"></i>
                    </span>
                </li>
        `;
    }
  }
  document.getElementById("todo-list").innerHTML = result;
}

function toggleDone(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter();
}
function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList.splice(i, 1);
      break;
    }
  }
  filter();
}

function filter(e) {
  if (e) {
    mode = e.target.id;
    underLine.style.width = e.target.offsetWidth + "px";
    underLine.style.left = e.target.offsetLeft + "px";
    underLine.style.top =
      e.target.offsetTop + (e.target.offsetHeight - 4) + "px";
  }

  filterList = [];
  if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();
}

function generateRandomID() {
  return "_" + Math.random().toString(36).substr(2, 16);
}
