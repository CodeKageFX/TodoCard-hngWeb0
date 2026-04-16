let defaultTodo = {
    title: "Sleep",
    description: "Sleep for 8 hours",
    priority: "Low",
    status: "Pending",
    dueDate: new Date("2026-04-14T18:00:00Z"),
    tags: [
        { tag: "work", id: "test-todo-tag-work" },
        { tag: "personal", id: "test-todo-tag-personal" }
    ]
};

const savedTodo = localStorage.getItem('todo');
const todo = savedTodo ? JSON.parse(savedTodo) : defaultTodo;

let isDescriptionExpanded = false;
if (todo.dueDate && typeof todo.dueDate === 'string') {
    todo.dueDate = new Date(todo.dueDate);
}


const todoCard = document.getElementById('todo-card');
const todoDisplay = document.getElementById('todo-display');
const editForm = document.getElementById('edit-form');

const todoTitle = document.getElementById('todo-title');
const todoDescription = document.getElementById('todo-description');
const todoPriority = document.getElementById('todo-priority');
const todoStatus = document.getElementById('todo-status');
const dateText = document.getElementById('date-text');
const timeRemaining = document.getElementById('time-remaining');

const editTitle = document.getElementById('edit-title');
const editDescription = document.getElementById('edit-description');
const editPriority = document.getElementById('edit-priority');
const editDueDate = document.getElementById('edit-due-date');

const editButton = document.getElementById('edit-button');
const deleteButton = document.getElementById('delete-button');
const saveButton = document.getElementById('save-button');
const cancelButton = document.getElementById('cancel-button');
const todoCompleteToggle = document.getElementById('todo-complete-toggle');

const statusStyles = {
    Pending: "status-pending",
    "In Progress": "status-in-progress",
    Done: "status-done"
};

function getDaysLeft(dueDate) {
    const diffMs = dueDate.getTime() - new Date().getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
        return `Overdue`;
    }
    if (diffDays === 0) {
        return "Due today";
    }
    if (diffDays === 1) {
        return "Due tomorrow";
    }
    return `Due in ${diffDays} days`;
}

function updateCompletionState(isCompleted) {

    todo.status = isCompleted ? "Done" : "Pending";
    
    if (isCompleted) {
        todoTitle.classList.add('completed');
        todoDescription.classList.add('completed');
    } else {
        todoTitle.classList.remove('completed');
        todoDescription.classList.remove('completed');
    }

    syncUI();

    localStorage.setItem('todo', JSON.stringify(todo));
}

function syncUI() {
    todoTitle.textContent = todo.title;
    
    const desc = todo.description || "";
    if (desc.length > 30 && !isDescriptionExpanded) {
        todoDescription.textContent = desc.slice(0, 30);
        const ellipsis = document.createElement('button');
        ellipsis.dataset.testid = "test-todo-expand-toggle";
        ellipsis.textContent = "Show more";
        ellipsis.className = 'expand-ellipsis';
        ellipsis.addEventListener('click', (e) => {
            e.stopPropagation();
            isDescriptionExpanded = true;
            syncUI();
        });
        todoDescription.appendChild(ellipsis);
    } else {
        todoDescription.textContent = desc;
        if(isDescriptionExpanded) {
            const showLess = document.createElement('button');
            showLess.dataset.testid = "test-todo-expand-toggle";
            showLess.textContent = "Show less";
            showLess.className = 'expand-ellipsis';
            showLess.addEventListener('click', (e) => {
                e.stopPropagation();
                isDescriptionExpanded = false;
                syncUI();
            });
            todoDescription.appendChild(showLess);
        }
    }

    todoPriority.textContent = todo.priority;
    
    todoPriority.className = 'badge ' + `priority-${todo.priority.toLowerCase()}`;
    
    dateText.textContent = todo.dueDate.toDateString();
    if (timeRemaining) {
        if(todo.status === "Done") {
            timeRemaining.textContent = "Completed";
        } else {
            timeRemaining.textContent = ` · ${getDaysLeft(todo.dueDate)}`;
        }
        if(getDaysLeft(todo.dueDate).includes("Overdue")) {
            timeRemaining.classList.add('overdue');
        }
    }
}

function init() {
    syncUI();

    todoDescription.addEventListener('click', () => {
        if (todo.description.length > 30) {
            isDescriptionExpanded = !isDescriptionExpanded;
            syncUI();
        }
    });

    todoCompleteToggle.addEventListener('change', (e) => {
        updateCompletionState(e.target.checked);        
    });

    editButton.addEventListener('click', () => {
        todoDisplay.classList.add('hidden');
        editForm.classList.remove('hidden');
        
        editButton.classList.add('hidden');
        deleteButton.classList.add('hidden');
        saveButton.classList.remove('hidden');
        cancelButton.classList.remove('hidden');

        editTitle.value = todo.title;
        editDescription.value = todo.description;
        editPriority.value = todo.priority;
        
        const date = new Date(todo.dueDate);
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        editDueDate.value = `${yyyy}-${mm}-${dd}`;
    });

    cancelButton.addEventListener('click', () => {

        todoDisplay.classList.remove('hidden');
        editForm.classList.add('hidden');
        
        editButton.classList.remove('hidden');
        deleteButton.classList.remove('hidden');
        saveButton.classList.add('hidden');
        cancelButton.classList.add('hidden');
    });

    saveButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        todo.title = editTitle.value;
        todo.description = editDescription.value;
        todo.priority = editPriority.value;
        todo.dueDate = new Date(editDueDate.value);
        
        syncUI();
        cancelButton.click();

        localStorage.setItem('todo', JSON.stringify(todo));
    });

    deleteButton.addEventListener('click', () => {
        alert("Delete clicked");
    });
}

document.addEventListener('DOMContentLoaded', init);
