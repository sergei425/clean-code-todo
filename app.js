const newTask = document.getElementById('new-task');
const addNewTask = document.querySelector('.add-task button');
const incompleteList = document.getElementById('incompleteTasks');
const completedList = document.getElementById('completed-tasks');

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
  input.setAttribute('value', taskString);

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

  newTask.value = '';
};

addNewTask.addEventListener('click', addTask);

const editTask = function (evt) {
  const listItem = evt.target.parentNode;
  const editInput = listItem.querySelector('.tasks__input');
  const label = listItem.querySelector('.tasks__label');
  const editBtn = listItem.querySelector('.tasks__edit');
  if (listItem.classList.contains('tasks__item--edit')) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  editInput.classList.toggle('tasks__input--edit');
  listItem.classList.toggle('tasks__item--edit');
  label.classList.toggle('tasks__label--edit');
};

incompleteList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('tasks__edit')) {
    evt.target.nextElementSibling.focus();
    editTask(evt);
  }
});
completedList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('tasks__edit')) {
    evt.target.nextElementSibling.focus();
    editTask(evt);
  }
});

const deleteTask = function (evt) {
  if (evt.currentTarget instanceof HTMLUListElement && evt.target instanceof HTMLImageElement) {
    const liElement = evt.target.parentNode.parentNode;
    evt.currentTarget.removeChild(liElement);
    liElement.remove();
  }
};

incompleteList.addEventListener('click', deleteTask);
completedList.addEventListener('click', deleteTask);

const taskCompleted = function (evt) {
  if (evt.target.getAttribute('type') === 'checkbox') {
    evt.target.nextElementSibling.classList.add('tasks__label--completed');
    if (evt.target.nextElementSibling.classList.contains('tasks__label--edit')) {
      const label = evt.target.nextElementSibling;
      label.classList.remove('tasks__label--edit');
      label.nextElementSibling.classList.remove('tasks__input--edit');
    }
    const node = evt.target.parentNode;
    const index = [...incompleteList.children].indexOf(node);
    const item = [...incompleteList.children].splice(index, 1)[0];
    incompleteList.children[index].remove();
    completedList.appendChild(item);
  }
};

const taskIncomplete = function (evt) {
  if (evt.target.getAttribute('type') === 'checkbox') {
    evt.target.nextElementSibling.classList.remove('tasks__label--completed');
    const node = evt.target.parentNode;
    const index = [...completedList.children].indexOf(node);
    const item = [...completedList.children].splice(index, 1)[0];
    completedList.children[index].remove();
    incompleteList.appendChild(item);
  }
};

incompleteList.addEventListener('change', taskCompleted);
completedList.addEventListener('change', taskIncomplete);
