document.addEventListener("DOMContentLoaded", () => {
  const inputTodo = document.getElementById("input-todo");
  const buttonTodo = document.getElementById("button-todo");
  const ulTodo = document.getElementById("ul-todo");
  const buttonDeleteAll = document.querySelector('#button-delete-all');


  let editMode = false;
  let editElement = null;

  buttonTodo.addEventListener("click", () => {
    const text = inputTodo.value;
    if (editMode) {
      editElement.querySelector(".text-todo").textContent = text;
      editMode = false;
      editElement = null;
      buttonTodo.textContent = "Add";
    } else {
      createTodo(text);
    }
    inputTodo.value = "";
    saveAllTodo();
  });


  //to delete all todos
  buttonDeleteAll.addEventListener('click',()=>{
    if(confirm("are you sure? It will remove all todos.")){
      deleteAllTodos();
    }
  })

  const deleteAllTodos = ()=>{
    ulTodo.innerHTML = '';
    saveAllTodo();
  }

  const createTodo = (task) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-start";
    li.innerHTML = `<span class="text-todo">${task}</span>
    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
      <button type="button" class="btn btn-danger">Edit</button>
      <button type="button" class="btn btn-warning">Delete</button>
    </div>`;
    ulTodo.appendChild(li);
  };

  ulTodo.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-warning")) {
      e.target.closest(".list-group-item").remove();
      saveAllTodo();
    }

    if (e.target.classList.contains("btn-danger")) {
      const li = e.target.closest(".list-group-item");
      const taskText = li.querySelector(".text-todo").textContent;
      inputTodo.value = taskText;
      buttonTodo.textContent = "Update";

      editElement = li;
      editMode = true;
    }
  });

  const saveAllTodo = () => {
    const allTodos = [...document.querySelectorAll(".text-todo")].map(
      (task) => task.textContent
    );

    localStorage.setItem("allTodos", JSON.stringify(allTodos));
  };

  const loadAllTodo = () => {
    const allTodos = JSON.parse(localStorage.getItem("allTodos")) || [];
    allTodos.forEach((task) => createTodo(task));
  };

  loadAllTodo();
});
