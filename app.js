const newTask = document.getElementById('new-task'); //Add a new task.
const addNewTask = document.querySelector('.add-task__input'); //first button
const incompleteList = document.getElementById('incompleteTasks'); //ul of
const completedList = document.getElementById('completed-tasks'); //completed-tasks

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement('li');
  listItem.classList.add('tasks__item');

  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';

  const label = document.createElement('label');
  label.classList.add('tasks__label');

  const input = document.createElement('input');
  input.type = 'text';
  input.classList.add('tasks__input');

  const editButton = document.createElement('button'); //edit button
  editButton.classList.add('tasks__edit');

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('tasks__delete');
  const deleteButtonImg = document.createElement('img');
  deleteButtonImg.src = './remove.svg';

  label.innerText = taskString;

  editButton.innerText = 'Edit';

  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(input);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  if (!newTask.value.trim()) return;
  const listItem = createNewTaskElement(newTask.value);

  incompleteList.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  newTask.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('tasks__input');
  const label = listItem.querySelector('tasks__label');
  const editBtn = listItem.querySelector('tasks__edit');
  const containsClass = listItem.classList.contains('tasks__item');

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  listItem.classList.toggle('tasks__item--edit');
};

//Delete task.
const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

const taskCompleted = function () {
  const listItem = this.parentNode;
  completedList.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function () {
  const listItem = this.parentNode;
  incompleteList.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

// const ajaxRequest = function () {
//   //console.log('AJAX Request');
// };

//dNewTask.onclick = addTask;
addNewTask.addEventListener('click', addTask);
//dNewTask.addEventListener('click', ajaxRequest);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('tasks__edit');
  const deleteButton = taskListItem.querySelector('tasks__delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

for (let i = 0; i < incompleteList.children.length; i++) {
  bindTaskEvents(incompleteList.children[i], taskCompleted);
}

for (let i = 0; i < completedList.children.length; i++) {
  bindTaskEvents(completedList.children[i], taskIncomplete);
}
