
const onClickAdd = () => {
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  // 関数化(共通化)
  createImcompleteList(inputText);
};

const createImcompleteList = (text) => {
  // divを作成
  const div = document.createElement("div");
  div.className = "list-row"

  // liを作成
  const li = document.createElement("li");
  li.innerText = text;

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
    returnButton.addEventListener("click", () => {
      const returnList = returnButton.parentNode;
      document.getElementById("complete-list").removeChild(returnList);

      const text = returnButton.parentNode.firstElementChild.innerText;
      returnButton.textContent = null;
      createImcompleteList(text);
    });
    
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
