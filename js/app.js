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
  // Add task event
  form.addEventListener('submit', addTask);
  // Filter task event
  filter.addEventListener('keyup', filterTasks);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearButton.addEventListener('click', clearTasks);
}

// Add Task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Please add a task');
  }
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
  // Clear input
  taskInput.value = '';
  e.preventDefault();
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
    }
  }
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
}
