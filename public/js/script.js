"use strict";

const form = document.querySelector("#taskForm");
const taskId = document.querySelector("#task_id");
const taskName = document.querySelector("#task_name");
const taskDescription = document.querySelector("#task_description");
const clearForm = document.querySelector("#clear");
const removeAll = document.querySelector("#removeAll");
const taskWrapper = document.querySelector("#taskWrapper");

const basePath = "http://localhost:8080";

const handleSubmit = (e) => {
  e.preventDefault();
  const data = [...e.currentTarget.elements].filter(
    (ele) => ele.type !== "submit"
  );

  if (!data[0].value) {
    addTask(data[1].value, data[2].value);
  } else {
    editTask(data[0].value, data[1].value, data[2].value);
  }
};

const handlerEditTask = (id, name, desciption) => {
  form.querySelector("#task_id").value = id;
  form.querySelector("#task_name").value = name;
  form.querySelector("#task_description").value = desciption;
  form.querySelector("#submit").innerText = "Edit task";
};

const handleRemoveAll = (e) => {
  e.preventDefault();
  removeAllTasks();
};

const handleRemoveById = (id) => {
  removeById(id);
};

const handlerClearForm = () => {
  form.querySelector("#task_id").value = "";
  form.querySelector("#task_name").value = "";
  form.querySelector("#task_description").value = "";
  form.querySelector("#submit").innerText = "Add task";
};

form.addEventListener("submit", handleSubmit);
removeAll.addEventListener("click", handleRemoveAll);
clearForm.addEventListener("click", handlerClearForm);

async function addTask(name, description) {
  let body = JSON.stringify({ name: name, description: description });
  let response = await addFetch(body);
  let result = await response.json();
  if (result) {
    const html = generateNewTaskHtml(result);
    taskWrapper.insertAdjacentHTML("beforeend", html);
  }
}

async function editTask(id, name, description) {
  let body = JSON.stringify({ name: name, description: description });
  let response = await editFetch(id, body);
  let result = await response.json();
  if (result) {
    const html = generateNewTaskHtml(result);
    document.querySelector(`[data-task="${id}"]`).outerHTML = html;
  }
}

async function removeAllTasks() {
  let response = await removeAllFetch();
  let result = await response.json();
  if (result) {
    document.querySelector(`#taskWrapper`).innerHTML = "";
  }
}

async function removeById(id) {
  let response = await removeByIdFetch(id);
  if (response.status == 200) {
    document.querySelector(`[data-task="${id}"]`).outerHTML = "";
  }
}

function addFetch(body) {
  return fetch(basePath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });
}

function editFetch(id, body) {
  return fetch(basePath + `/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });
}

function removeAllFetch() {
  return fetch(basePath, {
    method: "DELETE",
  });
}

function removeByIdFetch(id) {
  return fetch(basePath + `/${id}`, {
    method: "DELETE",
  });
}

function generateNewTaskHtml(task) {
  return `<div class="col s12" data-task="${task._id}">
        <div class="card horizontal">
            <div class="card-stacked">
                <div class="card-content">
                    <span class="card-title name">${task.name}</span>
                    <blockquote class="description">${task.description}</blockquote>
                </div>
                <div class="card-action">
                    <a class="waves-effect waves-light btn-small edit" onclick="handlerEditTask('${task._id}', '${task.name}', '${task.description}')">Edit task</a>
                    <a class="waves-effect waves-light btn-small red delete" onclick="handleRemoveById('${task._id}')"}">Remove task</a>                                 
                </div>
            </div>
        </div>
    </div>`;
}
