const inputTodo = document.getElementById("inputTodo");
const addBtn = document.getElementById("addBtn");
const todoLists = document.getElementById("todoLists");

let id = 0;
let todos = [];
let totalCount = 0;
let completedCount = 0;
let incompletedCount = 0;

addBtn.addEventListener("click", () => {
  createTasks();
});

const createTasks = () => {
  if(inputTodo.value) {
    todos.push({ id, value: inputTodo.value, isCompleted: false });
    addTasks(id, inputTodo.value);
    id++;
    inputTodo.value = "";

    // ステータス更新
    totalCount++;
    incompletedCount++;
    createStatusLists();
  };
};

// チェックボタンクリック
const createCheck = (id) => {
  const currentList = todos.find((todo) => {
    return todo.id === id;
  });

  // チェックつける・外す
  currentList.isCompleted = !currentList.isCompleted;

  if(currentList.isCompleted) {
    completedCount++;
    incompletedCount--;
  } else {
    completedCount--;
    incompletedCount++;
  };
  createStatusLists();
};

// 削除ボタンクリック
const deleteTask = (id) => {
  if(window.confirm("本当に削除しますか？")) {
    const currentList = todos.find((todo) => {
      return todo.id === id;
    });

    totalCount--;
    (currentList.isCompleted)? completedCount-- : incompletedCount--;
    createStatusLists();

    const deleteList = document.getElementById(`div-${id}`);
    deleteList.remove();
  };
};

// 編集ボタンクリック
const editTask = (id) => {
  const currentList = todos.find((todo) => {
    return todo.id === id;
  });

  const listParentNode = document.getElementById(`div-${id}`);
  // 子要素取得
  const text = listParentNode.children[1];
  const editBtn = listParentNode.children[2];
  const deleteBtn = listParentNode.children[3];

  const editForm = document.createElement("input");
  editForm.value = text.innerText;
  editForm.className = "text"
  listParentNode.replaceChild(editForm, text);

  const addBtn = document.createElement("button");
  addBtn.innerText = "保存";
  addBtn.className = "btn";
  listParentNode.appendChild(addBtn);

  editBtn.style.display = "none";
  deleteBtn.style.display = "none";

  // 保存ボタンクリック
  addBtn.addEventListener("click", () => {
    if(editForm.value) {
      currentList.value = editForm.value;

      const newText = document.createElement("li");
      newText.innerText = currentList.value;
      newText.className = "text";

      listParentNode.replaceChild(newText, editForm);
      editBtn.style.display = "block";
      deleteBtn.style.display = "block";
      listParentNode.removeChild(addBtn);
    };
  });
}

const addTasks = (id, value) => {
  const div = document.createElement("div");
  div.className = "list-row";
  div.setAttribute('id', `div-${id}`);

  const checkBox = document.createElement("input");
  checkBox.className = "checkbox";
  checkBox.setAttribute('type', 'checkbox');
  checkBox.setAttribute('id', 'checkbox');
  checkBox.setAttribute('onclick', `createCheck(${id})`);

  const li = document.createElement("li");
  li.innerText = value;
  li.className = "text";

  const editBtn = document.createElement("button");
  editBtn.innerText = "編集";
  editBtn.className = "btn";
  editBtn.setAttribute('onclick', `editTask(${id})`);

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn";
  deleteBtn.innerText = "削除";
  deleteBtn.setAttribute('id', 'deleteBtn');
  deleteBtn.setAttribute('onclick', `deleteTask(${id})`);

  div.appendChild(checkBox);
  div.appendChild(li);
  div.appendChild(editBtn);
  div.appendChild(deleteBtn);
  todoLists.appendChild(div);
};

const createStatusLists = () => {
  const statusLists = document.getElementById('statusLists');

  while (statusLists.firstChild) {
    statusLists.removeChild(statusLists.firstChild);
  };

  const total = document.createElement("li");
  const complete = document.createElement("li");
  const incomplete = document.createElement("li");

  total.innerText = `全てのタスク: ${totalCount}`
  total.className = "status-list";

  complete.innerText = `完了済: ${completedCount}`
  complete.className = "status-list";

  incomplete.innerText = `未完了: ${incompletedCount}`
  incomplete.className = "status-list";

  statusLists.appendChild(total);
  statusLists.appendChild(complete);
  statusLists.appendChild(incomplete);
};
