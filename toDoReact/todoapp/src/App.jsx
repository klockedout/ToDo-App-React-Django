import { useState, useEffect } from 'react'
import axios from 'axios'
import ToDoList  from './components/ToDoList'
import ToDoSearch from './components/ToDoSearch'
import ToDoFilter from './components/ToDoFilter'
import { set } from 'react-hook-form'


function App() {
   // todos : variable
   // setTodos : function that updates the variable "todos"
   // useStates : initialize and can dynamically update the variable
	const [todos, setTodos] = useState([]);
	// store catched errors
	const [errors, setErrors] = useState("")

	// useEffect to fetch data when component renders
	useEffect(() => {
		//  res contains data (todos), status (HTTP status code), headers
		axios.get("http://127.0.0.1:8000/todos")
		.then(res => setTodos(res.data))
		.catch(err => setErrors(err.message))
	}, []) // Add dependency array [] to run the request only once

	const delete_todo = (id) => {
		setTodos(todos.filter(todo => todo.id !== id))
		const originalTodos = [ ...todos ]
		// ${id} syntax because I'm using ViewSet with the defaultRouter
		// IMPORTANT : USE BACKTICKS (`) instead of single quotes (')
		axios.delete(`http://127.0.0.1:8000/todos/${id}/`)
		.catch(err => {
			setErrors(err.message)
			setTodos(originalTodos)
		})
	}


	const add_todo =(data) => {
		const originalTodos = [ ...todos ]
		// Spread data to retrieve all the propertie(s) attached to it (task)
		setTodos([ ...todos, data = { ...data, id: parseInt(todos[todos.length-1].id) +1, completed:false}])
		axios.post("http://127.0.0.1:8000/todos/", data)
		// update todo list from the backend
		.then(res => setTodos([ ...todos, res.data]))
		.catch(err => {
			setErrors(err.message)
			setTodos(originalTodos)
		})
	}

	const update_todo = (id, new_task) => {
		const updatedTodo = todos.find(todo => todo.id === id);
		// Optimistically update the UI
		setTodos(todos.map(todo => todo.id == id? { ...todo, task:new_task } : todo))
		const newTodo = { ...updatedTodo, task:new_task}
		axios.patch(`http://127.0.0.1:8000/todos/${id}/`, newTodo)
	}

	
	const complete_todo = (e, id) =>{
		const completed = e.target.checked;  // Get the checkbox state (true or false)
		const updatedTodo = todos.find(todo => todo.id === id);
  
		// Update the todo's completed status
		setTodos(todos.map(todo => todo.id === id ? { ...todo, completed } : todo  ));

		const newTodo = { ...updatedTodo, completed:completed}
		axios.patch(`http://127.0.0.1:8000/todos/${id}/`, newTodo)
	}

	// Store filtered todos to prevent loss the the orginal list
	const [filteredTodos, setFilteredTodos] = useState(todos); 

	const filter_todo = (status) => {
		if (status == "all") {
			setFilteredTodos(todos);  // If "all" is selected, show all todos
		} else {
			setFilteredTodos(todos.filter(todo => todo.completed === JSON.parse(status)));  // Filter by completion status
		}
	} 
	

  	return (
		
		<div class="todo-container">
			<h1 class="title">My To-Do List</h1>

			{ errors && <p>{ errors }</p>}

			<ToDoSearch add_todo = { add_todo }/>

			<ToDoFilter filter_todo = { filter_todo } />
			
			<ToDoList todosItems = { todos } delete_todo={delete_todo} update_todo={ update_todo } complete_todo={ complete_todo }/>
		</div>
  	)
}

export default App
