import React,{useEffect, useState} from 'react'
import { TodoForm } from './TodoForm'
import {v4 as uuidv4} from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
uuidv4();

export const TodoWrapper = () => {
    const [todos , setTodos]=useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) :[];
    });

    const [filter, setFilter]= useState("all");

    useEffect(() =>{
        localStorage.setItem('todos' ,JSON.stringify(todos));
    },[todos]);

    const addTodo = (todo, dueDate, priority = "Medium") =>{
        setTodos([...todos, {id: uuidv4(),task: todo,completed: false, isEditing: false, dueDate: dueDate ? dueDate.toISOString():null , priority,}])
        console.log(todos)
    };

    const toggleComplete= id =>{
       setTodos(todos.map(todo => todo.id === id ? 
        {...todo, completed: !todo.completed} : todo))
       
    };

    const deleteTodo= id =>{
        setTodos(todos.filter(todo => todo.id !== id))
    };

    const editTodo= id =>{
        setTodos(todos.map(todo => todo.id === id ? 
        {...todo, isEditing: !todo.isEditing} : todo))
    };

    const editTask = (task, id) => {
         setTodos(todos.map(todo =>
            todo.id === id
            ? {
                ...todo,
                task,
                isEditing: false
              }
            : todo
        ));
    };

    const [draggedItemId, setDraggedItemId] = useState(null);
    const handleDragStart = (id) => {
        setDraggedItemId(id);
    };
    const handleDrop = (id) => {
        if (!draggedItemId) return;
        const updatedTodos =[...todos];
        const draggedIndex = updatedTodos.findIndex(todo => todo.id ===draggedItemId);
        const dropIndex = updatedTodos.findIndex(todo => todo.id === id);
        const[draggedItem]= updatedTodos.splice(draggedIndex,1)
        updatedTodos.splice(dropIndex, 0, draggedItem);
        setTodos(updatedTodos);
        setDraggedItemId(null);
    };
    const filteredTodos = todos.filter(todo =>{
        if (filter=== "completed") return todo.completed ;
        if (filter==="active") return !todo.completed;
        return true;
    });
    const clearCompleted = () => {
        setTodos(todos.filter(todo => !todo.completed));
    };
  return (
    <div className='TodoWrapper'>
        <h1>Get Things Done!</h1>
        <TodoForm addTodo={addTodo}/>
       
        <div className="filters">
            <button  className='filters'onClick={() => setFilter("all")}>All</button>
            <button className='filters' onClick={() => setFilter("active")}>Active</button>
            <button className='filters' onClick={() => setFilter("completed")}>completed</button>
            <button className='filters' onClick={clearCompleted}> Clear Completed</button>
        </div>
       {filteredTodos.map((todo) => (
  <div
    key={todo.id}
    draggable
    onDragStart={() => handleDragStart(todo.id)}
    onDragOver={(e) => e.preventDefault()}
    onDrop={() => handleDrop(todo.id)}
  >
    {todo.isEditing ? (
      <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
    ) : (
      <Todo
        task={todo}
        key={todo.id}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />
    )}
  </div>
))}

       

    </div>
  )
}
