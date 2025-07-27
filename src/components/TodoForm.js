import React,{useState} from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export const TodoForm = ({addTodo}) => {
    const [dueDate, setDueDate] = useState(null);
    const [value, setValue] =useState("")
    const [priority, setPriority] = useState("Medium");
    const handleSubmit = e =>{
        e.preventDefault();
        if (value.trim()){
            addTodo(value, dueDate, priority);
            setValue("");
            setDueDate(null);
            setPriority("Medium");
        }  
    };
  return (
    <form className='TodoForm' onSubmit={handleSubmit} >
        <input type='text'className='todo-input' value={value} placeholder='What is the task today?'onChange={(e)=> setValue(e.target.value)}/>
        <DatePicker className='todo-input'selected={dueDate} onChange={(date) => setDueDate(date)}
        placeholderText='select due date'/>
        <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className='priority-select'>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
            </select>
        <button type='submit'className='todo-btn'>Add Task</button>
    </form>
    
  )
}
