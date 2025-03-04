import React from 'react'

const ToDoFilter = ({ filter_todo }) => {
  return (
    <select name = "" id = ""  onChange={ (e) => filter_todo(e.target.value)} >
    <option value="all">All</option>
		<option value={false}>Active</option>
		<option value={true}>Completed</option>
	</select>

  )
}

export default ToDoFilter