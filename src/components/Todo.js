import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import { faTrash} from '@fortawesome/free-solid-svg-icons'
export const Todo = ({task, toggleComplete, deleteTodo, editTodo}) => {
    const dueDateText = task.dueDate
        ? new Date(task.dueDate).toLocaleDateString()
        : "No deadline";
    const today= new Date();
    const due = task.dueDate ? new Date (task.dueDate) : null;
    const isOverdue = due && due < today && !task.completed;
    const priorityColors ={
        Low: "green",
        Medium: "orange",
        High: "red",
    };
  return (
    <div className='Todo'>
        <p
        onClick={() => toggleComplete(task.id)}
        className={task.completed ? 'completed' : ''}>
        {task.task}
        </p>
        <span className={`task-priority ${task.priority ? task.priority.toLowerCase() : "none"}`}>
         {task.priority || "No priority"}
        </span>

        <span className={`due-date ${isOverdue ? 'overdue' : ''}`}>
        {dueDateText}
        </span>
        <div>
            <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTodo(task.id)}/>
            <FontAwesomeIcon icon={faTrash} onClick={()=> deleteTodo(task.id)}/>
        </div>
    </div>
  )
}
