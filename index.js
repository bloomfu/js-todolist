
const onClickAdd = () => {
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  // divを作成
  const div = document.createElement("div");
  div.className = "list-row"

  // liを作成
  const li = document.createElement("li");
  li.innerText = inputText;

  // button(完了)を作成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    const completeList = completeButton.parentNode;
    document.getElementById("imcomplete-list").removeChild(completeList);

    const addList = completeButton.parentNode;
    const text = addList.firstElementChild.innerText;
    addList.textContent = null;
    
    const li = document.createElement("li");
    li.innerText = text;
    
    const returnButton = document.createElement("button");
    returnButton.innerText = "戻す";
    
    addList.appendChild(li);
    addList.appendChild(returnButton);
    document.getElementById("complete-list").appendChild(addList);
  });
  
  // button(削除)を作成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    const deleteList = deleteButton.parentNode;
    document.getElementById("imcomplete-list").removeChild(deleteList);
  });

  div.appendChild(li);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);
  document.getElementById("imcomplete-list").appendChild(div);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
