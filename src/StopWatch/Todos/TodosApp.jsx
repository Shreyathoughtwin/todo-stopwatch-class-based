
import React, { Component } from 'react';

class TodoApp extends Component {
  constructor(props) {
    super(props);

    this.state = {

      id: '',
      name: '',
      details: '',
      member: '',

      tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    //   console.log(tasks);
       Edit: false,
       curId: null,
      
 };
}

  componentDidUpdate(prevProps, prevState) {
// check if state change
     if(prevState.tasks !== this.state.tasks) {

        // update localstorage
      localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    //   console.log(tasks)

}
 
   }
       handleChange = (e) => {
//    triggger change
       this.setState({
       [e.target.name]: e.target.value,

});
 };

    saveTask = () => {
    const { id, name, details, member,  Edit, curId } = this.state;

       if (!id || !name || !details || !member) {
      alert('Please enter all values');
      return;
 }


if (Edit) {
    // update existing task
      this.setState((prevState) => ({

         tasks: prevState.tasks.map(task =>
          task.id === curId ? { id, name, details, member } : task ),

         id: '',
         name: '',
         details: '',
          member: '',
          Edit: false,
          curId: null,

})
);
        } else {

        // add newtask  
      const newTask = { id, name, details, member };
        this.setState((prevState) => ({

        id: '',
        name: '',
        details: '',
        member: '',
        tasks: [...prevState.tasks, newTask],

})

);

}
  };
      editTask = (id) => {
       const EditTask = this.state.tasks.find(task => task.id === id);

       this.setState({
       id:EditTask .id,
          name: EditTask.name,
          details: EditTask.details,
            member: EditTask.member,
        Edit: true,
        curId: id,
       });
// });

};
       deleteTask = (id) => {
    // filter task to delete
           this.setState((prevState) => ({
             tasks: prevState.tasks.filter(task => task.id !== id),

})

);
};
          renderTasks = (tasks) => { return tasks.map((task) => (

        <li key={task.id}>

<span>
          <strong>ID:</strong> {task.id}<br/>
              <strong>Name:</strong> {task.name}<br/>
              <strong>Details:</strong> {task.details}<br/>
               <strong>Member:</strong> {task.member}

</span>
        <button className="btn btn-primary" onClick={() => this.editTask(task.id)}>
          Edit
        </button>

        <button className="btn btn-danger" onClick={() => this.deleteTask(task.id)}>
          Delete
        </button>

</li>

));

};
         render() {

    const { id, name, details, member, tasks, Edit } = this.state;
    return (

      <div className="App">

        <h1>Todo List</h1>

        <input type="text" value={id} onChange={this.handleChange} name="id" placeholder="Task ID"/>
           <input type="text" value={name} onChange={this.handleChange} name="name" 
           placeholder="Task Name"/>

          <input type="text" value={details} onChange={this.handleChange} name="details"placeholder="Task Details"/>
           <input type="text" value={member} onChange={this.handleChange} name="member"placeholder="Task Member"/>

 <button id="saveBtn" onClick={this.saveTask}>
 {Edit ? 'Update Task' : 'Add Task'}
</button>

     <div className="task-columns">
     <div className="task-column">

            <h2>Tasks</h2>

<ul id="taskList">{this.renderTasks(tasks)}</ul>

</div>``
</div>
</div>
   
);
  
}
}
export default TodoApp;