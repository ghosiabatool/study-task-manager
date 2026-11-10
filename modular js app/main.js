import {taskArray, makeTasks, deleteTask, saveArray} from './modules/tasks.js';
import { displayTasks, showEmptyMessage, updateStatus, doFilter } from './modules/ui.js';


const totalTasks  = document.getElementById('total-tasks');
const completedTasks = document.getElementById('completed-tasks');
const remainingTasks = document.getElementById('remaining-tasks');
const form = document.getElementById('task-form');
const priorityInput = document.getElementById('task-priority');
const taskInput = document.getElementById('task-title')
const message = document.getElementById('message');
const filter = document.getElementById('task-filter');
const emptyMessage = document.getElementById('empty-message');
const taskContainer = document.getElementById('tasks-container');


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    let task = taskInput.value;
    let priority = priorityInput.value;
    
    makeTasks(task, priority)
    
    displayTasks(taskArray, taskContainer)
    taskInput.value = '';
    updateStatus(taskArray, totalTasks, completedTasks, remainingTasks)
    showEmptyMessage(taskArray, emptyMessage)


        message.textContent = 'Task added successfully!'
        setTimeout(()=>{
            message.textContent = ''
        }, 1500)
        saveArray()
})

updateStatus(taskArray, totalTasks, completedTasks, remainingTasks);

taskContainer.addEventListener('click', (e)=>{
    let btn = e.target.closest('button');

    if(!btn) return;

    let card = btn.closest('.task-item');

    if(!btn) return;

    let taskId = Number(card.dataset.id);

    if(btn.classList.contains('complete-btn')){
      let obj = taskArray.find(i => i.id === taskId);
      obj.isCompleted = !obj.isCompleted;
      let status;

      if(obj.isCompleted === false){
               status = 'Active'
               btn.textContent = "✓ Complete"
        }
        else if(obj.isCompleted === true){
            btn.textContent = "↩ Undo"
            status = 'Completed'
        };

       card.querySelector('.task-status').textContent = `Status: ${status}`
        card.querySelector('.task-title').classList.toggle('completed-task')
        refresher()
        saveArray()
    }
    else if(btn.classList.contains('delete-btn')){
        console.log('Delete btn has clicked');
        deleteTask(taskId);
        card.remove();
        refresher()
        showEmptyMessage(taskArray, emptyMessage)

        message.textContent = 'Task deleted successfully!'
        setTimeout(()=>{
            message.textContent = ''
        }, 1500)
        saveArray()
    }
})

    filter.addEventListener('change', ()=>{
    doFilter(filter, taskContainer, taskArray)
})


const refresher = () =>{
    doFilter(filter, taskContainer, taskArray);
    updateStatus(taskArray, totalTasks, completedTasks, remainingTasks);
}

refresher()
           