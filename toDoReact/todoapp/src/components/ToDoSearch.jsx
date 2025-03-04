import React from 'react'
import { useForm } from 'react-hook-form'

const ToDoSearch = ({ add_todo }) => {


	const { register , handleSubmit, reset, formState: { errors } } = useForm()

	return (
		<div class="todo-search">

			<form action="" onSubmit={handleSubmit((data) => {
				add_todo(data);
				reset()
				})}>
				<input type="text" id="task" placeholder="Enter Todo"  { ...register("task", {required: true})} />
				
				<button>Add</button>
			</form>

			{/* Check if task has value */}
			{ errors.task?.type == "required" && <small>This field is required</small> }
			
		</div>
	)
}

export default ToDoSearch