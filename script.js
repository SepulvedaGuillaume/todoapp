let todos = JSON.parse(localStorage.getItem("todos"));

if (!todos) {
  todos = [
    {
      content: "Faire la vaiselle",
      resolved: false,
    },
    {
      content: "Faire à manger",
      resolved: false,
    },
    {
      content: "Faire les courses",
      resolved: true,
    },
  ];
}

const selectTodos = document.querySelector(".todos");

const renderTodos = () => {
  selectTodos.innerHTML = `<ul>${todos
    .map(
      ({content, resolved}, index) =>
        `<div id=${index}>
          <input type="text" id="content_${index}" name="todo" value="${
          content
        }" disabled>
            <select id="status_${index}" disabled>
              <option value="true" ${
                resolved ? "selected" : ""
              }>Résolu</option>
              <option value="false" ${
                !resolved ? "selected" : ""
              }>Non résolu</option>
            </select>
            <button class="delete_todo" onclick="deleteTodo(${index})">X</button>
            <button id="update_todo_${index}" onclick="displayUpdate(${index})">Modifier</button>
            <button id="update_validate_todo_${index}" onclick="updateTodo(${index})" style="display: none;">Valider les changements</button>
          </input>
        </div>`
    )
    .join("")}</ul>`;
  localStorage.setItem("todos", JSON.stringify(todos));
};

renderTodos();

const deleteTodo = (index) => {
  todos.splice(index, 1);
  renderTodos();
};

const displayUpdate = (index) => {
  const updateButton = document.querySelector(`#update_todo_${index}`);
  const validateButton = document.querySelector(
    `#update_validate_todo_${index}`
  );
  const input = document.querySelector(`#content_${index}`);
  const select = document.querySelector(`#status_${index}`);
  updateButton.style.display = "none";
  validateButton.style.display = "block";
  input.disabled = false;
  select.disabled = false;
};

const updateTodo = (index) => {
  const input = document.querySelector(`#content_${index}`);
  const select = document.querySelector(`#status_${index}`);
  todos[index] = {
    content: input.value,
    resolved: select.value === "true" ? true : false,
  };
  renderTodos();
};
