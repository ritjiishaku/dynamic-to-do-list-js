document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage on page load
    loadTasks();

    // Add task button event listener
    addButton.addEventListener('click', () => {
        addTask(taskInput.value.trim());
    });

    // Add task on "Enter" key press
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value.trim());
        }
    });

    /**
     * Add a task to the list
     * @param {string} taskText - Text of the task
     * @param {boolean} save - Whether to save the task to Local Storage
     */
    function addTask(taskText, save = true) {
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create task list item
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Add remove button functionality
        removeButton.addEventListener('click', () => {
            removeTask(taskItem, taskText);
        });

        // Append remove button and task to the list
        taskItem.appendChild(removeButton);
        taskList.appendChild(taskItem);

        // Save to Local Storage
        if (save) {
            saveTaskToLocalStorage(taskText);
        }

        // Clear the input field
        taskInput.value = '';
    }

    /**
     * Remove a task from the list and Local Storage
     * @param {HTMLElement} taskItem - The task element to remove
     * @param {string} taskText - The task text to remove
     */
    function removeTask(taskItem, taskText) {
        // Remove task element from the DOM
        taskList.removeChild(taskItem);

        // Remove task from Local Storage
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter((task) => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    /**
     * Load tasks from Local Storage
     */
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach((taskText) => addTask(taskText, false)); // 'false' prevents saving again to Local Storage
    }

    /**
     * Save a task to Local Storage
     * @param {string} taskText - The task text to save
     */
    function saveTaskToLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
});
