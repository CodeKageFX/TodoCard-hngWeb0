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
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))
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
const priorityStyles: Record<Todo["priority"], string> = {
    Low: "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30",
    Medium: "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30",
    High: "bg-rose-500/15 text-rose-400 ring-1 ring-rose-500/30",
}

const statusStyles: Record<Todo["status"], string> = {
    Pending: "bg-slate-700/60 text-slate-300",
    "In Progress": "bg-indigo-500/20 text-indigo-300",
    Done: "bg-emerald-500/20 text-emerald-300",
}

export default function TodoCard() {
    const [completed, setCompleted] = useState<boolean>(false)
    const currentStatus = completed ? "Done" : todo.status

    return (
        <article
            data-testid="test-todo-card"
            className="w-[360px] rounded-2xl bg-[#1a1d27] border border-white/6 shadow-xl shadow-black/40 p-5 flex flex-col gap-4 transition-all duration-300 hover:shadow-indigo-500/10 hover:border-white/10"
        >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                    <h2
                        data-testid="test-todo-title"
                        className={`text-lg font-semibold text-white leading-snug truncate transition-all duration-200 ${completed ? "line-through text-slate-500" : ""}`}
                    >
                        {todo.title}
                    </h2>
                    <p
                        data-testid="test-todo-description"
                        className={`mt-0.5 text-sm leading-relaxed transition-colors duration-200 ${completed ? "text-slate-600 line-through" : "text-slate-400"}`}
                    >
                        {todo.description}
                    </p>
                </div>
                {/* Priority badge */}
                <span
                    data-testid="test-todo-priority"
                    className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${priorityStyles[todo.priority]}`}
                >
                    {todo.priority}
                </span>
            </div>

            {/* Due date */}
            <time
                dateTime={todo.dueDate.toISOString()}
                className="flex items-center gap-1.5 text-xs text-slate-500"
            >
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {todo.dueDate.toDateString()}
                <span data-testid="test-todo-time-remaining" className="text-slate-600">
                    · {getDaysLeft(todo.dueDate)}
                </span>
            </time>

            {/* Tags */}
            <ul role="list" data-testid="test-todo-tags" className="flex flex-wrap gap-1.5">
                {todo.tags.map((tag) => (
                    <li
                        key={tag.id}
                        data-testid={tag.id}
                        className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/5 text-slate-400 border border-white/7"
                    >
                        #{tag.tag}
                    </li>
                ))}
            </ul>

            {/* Divider */}
            <div className="h-px bg-white/5" />

            {/* Status row + checkbox */}
            <div className="flex items-center justify-between">
                <span
                    data-testid="test-todo-status"
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[currentStatus] ?? statusStyles["Pending"]}`}
                >
                    {currentStatus}
                </span>

                <label className="flex items-center gap-2 cursor-pointer select-none group">
                    <span className="relative flex items-center">
                        <input
                            type="checkbox"
                            checked={completed}
                            onChange={() => setCompleted(!completed)}
                            data-testid="test-todo-complete-toggle"
                            className="peer sr-only"
                        />
                        <span className="w-4 h-4 rounded border border-white/20 bg-white/5 flex items-center justify-center peer-checked:bg-indigo-500 peer-checked:border-indigo-500 transition-all duration-200">
                            {completed && (
                                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </span>
                    </span>
                    <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors duration-150">
                        Mark complete
                    </span>
                </label>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                <button
                    data-testid="test-todo-edit-button"
                    aria-label="Edit todo"
                    onClick={() => console.log("edit clicked")}
                    className="flex-1 py-2 rounded-xl text-sm font-medium text-slate-300 bg-white/5 border border-white/7 hover:bg-white/10 hover:text-white transition-all duration-150 active:scale-[0.97]"
                >
                    Edit
                </button>
                <button
                    data-testid="test-todo-delete-button"
                    aria-label="Delete todo"
                    onClick={() => alert("Delete clicked")}
                    className="flex-1 py-2 rounded-xl text-sm font-medium text-rose-400 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 hover:text-rose-300 transition-all duration-150 active:scale-[0.97]"
                >
                    Delete
                </button>
            </div>
        </article>
    )
}