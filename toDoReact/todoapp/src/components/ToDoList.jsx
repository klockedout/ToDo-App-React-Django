import React, { useState } from 'react'
import { TiEdit } from "react-icons/ti";
import { HiOutlineTrash } from "react-icons/hi";



const ToDoList = ({ todosItems, delete_todo, update_todo, complete_todo }) => {

    let [ toggle, setToggle ] = useState(false)
    // store the chosen item to update
    let [ todoItem, setTodoItem ] = useState("")
    let [ todoId, setTodoId ] = useState(0)

    const toggleModal= (item,id) => {
        // show popup
        setToggle(true)
        setTodoItem(item)
        setTodoId(id)
    }

    

    return (
        <>
        <div className="todo-list">

            {/* Iterate each task in todosItem with map()*/}
            { todosItems.map( todo => 
                <div className="todo-list-item" key={todo.id}> 
                    <div className="task">
                        <input type="checkbox"   onChange={ (e) => complete_todo(e, todo.id) } />
                        <p id = "t_task" className = {todo.completed == true? "strike":"" } >{todo.task}</p>
                    </div>
                    
                    <div className="btn-container">
                        {/* Send the task value to the popup */}
                        <div className="edit"><TiEdit size={25} onClick={ () => toggleModal(todo.task,todo.id) } /></div>
                        <div className="del"><HiOutlineTrash size={25} onClick={ ()=> delete_todo(todo.id) }/></div>
                    </div>
                </div>
            )}

        </div>

    {/* modal section */}
    {toggle && <div className="modal-container">
        <div className="modal">
            <h1>Update Form</h1>

            <form action="" onSubmit={() => {
                update_todo(todoId,todoItem);
                setToggle(false)
            }} >
                <input type="text" value={ todoItem } onChange={(e) => setTodoItem(e.target.value)}  required />
                <button id ="add">Confirm</button>
            </form>
        
            <div className="btn-container">
                <button className="cancel mod-btn"  onClick={() => setToggle(false)}>Cancel</button>
            </div>
        </div>
        </div> 
    }
        
        
  
    </>
    )
}

export default ToDoList