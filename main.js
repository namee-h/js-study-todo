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
  if (taskList.length !== 0) {
    taskList = [];
    list = [];
    filterList = [];
    render();
  } else {
    return alert("삭제할 리스트가 없습니다.");
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
                        <label id="label-${list[i].id}">${list[i].content}</label>
                    </span>
                    <span>
                        <i class="fa-solid fa-pen-to-square" onclick="editTask('${list[i].id}')"></i>
                        <i onclick="deleteTask('${list[i].id}')" class="fa-solid fa-trash-can"></i>
                    </span>
                </li>
        `;
    } else {
      result += `
          <li class="todo-item">
                    <span>
                        <input onclick="toggleDone('${list[i].id}')" type="checkbox">
                        <label id="label-${list[i].id}">${list[i].content}</label>
                    </span>
                    <span>
                        <i class="fa-solid fa-pen-to-square" onclick="editTask('${list[i].id}')"></i>
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
function editTask(id) {
  let taskItem = taskList.find((task) => task.id === id);
  if (!taskItem || taskItem.isComplete)
    return alert("수정할 수 없습니다. 체크를 해제해 주세요.");

  // 해당 id의 label 요소 찾기
  let labelElement = document.getElementById(`label-${id}`);
  if (!labelElement) return;

  // 인풋 요소 생성
  let inputElement = document.createElement("input");
  inputElement.type = "text";
  inputElement.className = "input_style";
  inputElement.value = taskItem.content;

  // 기존 label 숨기기
  labelElement.style.display = "none";

  // label 뒤에 인풋 추가
  labelElement.parentNode.appendChild(inputElement);

  // 인풋에 포커스
  inputElement.focus();

  // Enter 키 또는 blur 이벤트로 수정 완료 처리
  inputElement.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      updateTodo(id, inputElement.value);
    }
  });
  //   blur이벤트는 포커스를 잃을때 발생함 다른 곳 클릭하거나 탭키를 사용했을때
  inputElement.addEventListener("blur", () => {
    updateTodo(id, inputElement.value);
  });
}

function updateTodo(id, newContent) {
  if (!newContent.trim()) {
    alert("할 일을 입력해주세요!");
    return;
  }

  taskList = taskList.map((task) =>
    task.id === id ? { ...task, content: newContent } : task
  );

  render();
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
