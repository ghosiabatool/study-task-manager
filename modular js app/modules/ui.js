
export const displayTasks = (array, container) => {
    container.textContent = '';
    array.forEach(obj => {
        let status;
        if (!obj.isCompleted) {
            status = 'Active'
        }
        else {
            status = 'Completed'
        };
        let card = document.createElement('div');
        card.classList.add('task-item');
        card.dataset.id = obj.id;

        let info = document.createElement('div');
        info.classList.add('task-info')

        let head = document.createElement('h3');
        head.classList.add('task-title');
        head.textContent = obj.task;

        info.innerHTML = `
            <span class="task-priority">${obj.priority}</span>
            <p class="task-status">Status: ${status}</p>
        `
        info.prepend(head)

        let actions = document.createElement('div')
        actions.classList.add('task-actions');

        actions.innerHTML = `
            <button class="complete-btn">✓ Complete</button>
            <button class="delete-btn">Delete</button>
        `
        if (obj.priority === 'Low') {
            card.classList.add('priority-low')
        }
        else if (obj.priority === 'Medium') {
            card.classList.add('priority-medium')
        }
        else if (obj.priority === 'High') {
            card.classList.add('priority-high')
        }

        card.append(info, actions);
        container.append(card);

        let completeBtn = actions.querySelector('.complete-btn');

        if (obj.isCompleted) {
            completeBtn.textContent = "↩ Undo";
            head.classList.add('completed-task')
        }

    })
}

export const showEmptyMessage = (array, message) => {
    if (array.length === 0) {
        message.hidden = false
    }
    else {
        message.hidden = true
    }
}

export const updateStatus = (array, taskCon, completeCon, remainingCon) => {
    let noOfTotalTasks = array.length;
    let noOfCompletedTasks = array.reduce((i, j) => {
        if (j.isCompleted === true) {
            return i += 1;
        }

        else {
            return i;
        }
    }, 0)

    let noOfRemainingTasks = noOfTotalTasks - noOfCompletedTasks;

    taskCon.textContent = noOfTotalTasks;
    completeCon.textContent = noOfCompletedTasks;
    remainingCon.textContent = noOfRemainingTasks;

}
export const doFilter = (filterInput, container, array) => {
    let filterValue = filterInput.value;
    let activeTasks = array.filter(i => {
        return i.isCompleted === false;
    })
    let completedTasks = array.filter(i => {
        return i.isCompleted === true;
    })

    let displayedTasks
    if (filterValue === 'all') {
        displayTasks(array, container);
        displayedTasks = array;
    }
    else if (filterValue === 'active') {
        displayTasks(activeTasks, container);
        displayedTasks = activeTasks;
    }
    else if(filterValue === 'completed'){
        displayTasks(completedTasks, container);
        displayedTasks = completedTasks
    }

    showEmptyMessage(
        displayedTasks,
        document.getElementById('empty-message')
    )
}