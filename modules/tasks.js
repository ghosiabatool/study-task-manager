
export let taskArray = JSON.parse(localStorage.getItem('tasks')) || [];

export const makeTasks = (task, priority) =>{
       taskArray.push({
            task: task,
            id :Date.now(),
            priority: priority,
            isCompleted: false
        })
  
}
export const deleteTask = (id) =>{
    let index = taskArray.findIndex(i => i.id === id);
    if(index !== -1){
        taskArray.splice(index, 1)
    }

}

export const saveArray = () =>{
    localStorage.setItem('tasks', JSON.stringify(taskArray))
};