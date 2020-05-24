// Define UI variables
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const clearButton = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Filter task event
  filter.addEventListener('keyup', filterTasks);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearButton.addEventListener('click', clearTasks);
}

// Get tasks from localStorage
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task) {
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add task
function addTask(e) {
  e.preventDefault();
  if (taskInput.value === '') {
    alert('Please enter a task');
  } else if (checkTasks()) {
    taskInput.value = '';
  } else {
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
    // Store in local storage
    storeTaskInLocalStorage(taskInput.value);
    // Clear input
    taskInput.value = '';
  }
}

// Check if task exists
function checkTasks() {
  const task = taskInput.value;
  const lis = document.querySelectorAll('.collection-item');
  for (const li of lis) {
    if (li.textContent === task) {
      alert('This task already exists.');
      return true;
    }
  }
}

// Store task in localStorage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

// Remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Delete task? This cannot be undone.')) {
      e.target.parentElement.parentElement.remove();
      // Remove task from localStorage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove task from localStorage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasksFromStorage = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasksFromStorage.filter(function (task) {
      return taskItem.textContent !== task;
    });
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks
function clearTasks() {
  // Method 1
  // taskList.innerHTML = '';
  // Method 2 (Faster)
  if (confirm('Delete all tasks? This cannot be undone.')) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }
  clearTasksFromLocalStorage();
}

// Clear from localStorage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}
