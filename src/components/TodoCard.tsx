import { useState } from "react"

interface Todo {
    title: string,
    description: string,
    priority: "Low" | "Medium" | "High",
    status: "Pending" | "In Progress" | "Done",
    dueDate: Date,
   tags: {tag: string, id: string}[]
}


const todo: Todo = {
    title: "Sleep",
    description: "Sleep for 8 hours",
    priority: "Low",
    status: "Pending",
    dueDate: new Date("2026-04-14T18:00:00Z"),
    tags: [{
        tag: "work",
        id: "test-todo-tag-work"
    }, {
        tag: "personal",
        id: "test-todo-tag-personal"
    }]
}

function getDaysLeft(dueDate: Date): string {
    const diffMs = dueDate.getTime() - new Date().getTime()
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))
    if(diffDays < 0) {
        return `Overdue in ${diffDays} days`
    }
    if(diffDays === 0) {
        return "Due today"
    }
    if(diffDays === 1) {
        return "Due tomorrow"
    }
    return `Due in ${diffDays} days`
}
export default function TodoCard() {
    const [completed, setCompleted] = useState<boolean>(false)
    return (
        <article data-testid="test-todo-card">
            <div>
                <div>
                    <h2 data-testid="test-todo-title" className={completed ? "line-through" : ""}>{todo.title}</h2>
                    <p data-testid="test-todo-description">{todo.description}</p>
                </div>
                <time dateTime={todo.dueDate.toISOString()}>{todo.dueDate.toDateString()} <span data-testid="test-todo-time-remaining"> ({getDaysLeft(todo.dueDate)})</span></time>
            </div>
            <ul role="list" data-testid="test-todo-tags">
                {todo.tags.map((tag) => (
                    <li key={tag.id} data-testid={tag.id}>{tag.tag}</li>
                ))}
            </ul>
            <div>
                <p data-testid="test-todo-priority">{todo.priority}</p>
                <p data-testid="test-todo-status">{completed ? "Done" : todo.status}</p>
            </div>

            <label>
                <input type="checkbox" checked={completed} onChange={() => setCompleted(!completed)} data-testid="test-todo-complete-toggle"/>
                Mark as completed
            </label>

            <button data-testid="test-todo-edit-button" onClick={() => console.log("edit clicked")}>
                Edit
            </button>
            <button data-testid="test-todo-delete-button" onClick={() => alert("Delete clicked")}>
                Delete
            </button>
        </article>
    )
}