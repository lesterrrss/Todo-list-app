window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value.trim();

        if (task === "") {
            alert("Please input text first");
            return;
        }

        const task_el = document.createElement('div');
        task_el.classList.add('task');

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');

        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = task;
        task_input_el.setAttribute('readonly', 'readonly');

        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add('actions');

        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerHTML = '<i class="fas fa-edit"></i>';

        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerHTML = '<i class="fas fa-trash-alt"></i>';

        const task_done_el = document.createElement('button');
        task_done_el.classList.add('done');
        task_done_el.innerHTML = '<i class="fas fa-check"></i>';
        task_done_el.style.color = 'white';

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);
        task_actions_el.appendChild(task_done_el);

        task_el.appendChild(task_content_el);
        task_el.appendChild(task_actions_el);

        task_edit_el.addEventListener('click', toggleEdit);
        task_delete_el.addEventListener('click', deleteTask);
        task_done_el.addEventListener('click', markDone);

        list_el.appendChild(task_el);

        input.value = '';
        saveTasks();
        
        task_el.classList.add('slideIn');
        setTimeout(() => {
            task_el.classList.remove('slideIn');
        }, 1000);


    });
    function toggleEdit(e) {
        const task_el = e.target.closest('.task');
        const task_input_el = task_el.querySelector('.text');
        const task_edit_el = task_el.querySelector('.edit');

        if (task_edit_el.innerHTML.includes("edit")) {
            task_edit_el.innerHTML = '<i class="fas fa-save"></i>'; 
            task_input_el.removeAttribute("readonly");
            task_input_el.focus();
        } else {
            task_edit_el.innerHTML = '<i class="fas fa-edit"></i>';
            task_input_el.setAttribute("readonly", "readonly");
        }

        saveTasks();
    }

    function deleteTask(e) {
        const task_el = e.target.closest('.task');
        list_el.removeChild(task_el);
        saveTasks();
    }

    function markDone(e) {
        const task_el = e.target.closest('.task');
        const task_input_el = task_el.querySelector('.text');

        if (!task_input_el.classList.contains('completed')) {
            task_input_el.classList.add('completed');
        } else {
            task_input_el.classList.remove('completed');
        }

        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        const taskElements = list_el.querySelectorAll('.task');

        taskElements.forEach((taskEl) => {
            const taskText = taskEl.querySelector('.text').value;
            tasks.push(taskText);
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    function deleteTask(e) {
    const task_el = e.target.closest('.task');
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    
    if (confirmed) {
        task_el.classList.add('deleted');
        setTimeout(() => {
            list_el.removeChild(task_el);
            saveTasks();
        }, 500); 
    } else {
        console.log("Deletion canceled");
    }}
    
    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');

        if (savedTasks) {
            const tasks = JSON.parse(savedTasks);

            tasks.forEach((taskText) => {
                const task_el = document.createElement('div');
                task_el.classList.add('task');

                const task_content_el = document.createElement('div');
                task_content_el.classList.add('content');

                const task_input_el = document.createElement('input');
                task_input_el.classList.add('text');
                task_input_el.type = 'text';
                task_input_el.value = taskText;
                task_input_el.setAttribute('readonly', 'readonly');

                task_content_el.appendChild(task_input_el);

                const task_actions_el = document.createElement('div');
                task_actions_el.classList.add('actions');

                const task_edit_el = document.createElement('button');
                task_edit_el.classList.add('edit');
                task_edit_el.innerHTML = '<i class="fas fa-edit"></i>';

                const task_delete_el = document.createElement('button');
                task_delete_el.classList.add('delete');
                task_delete_el.innerHTML = '<i class="fas fa-trash-alt"></i>'; 

                const task_done_el = document.createElement('button');
                task_done_el.classList.add('done');
                task_done_el.innerHTML = '<i class="fas fa-check"></i>';
                task_done_el.style.color = 'white';

                task_actions_el.appendChild(task_edit_el);
                task_actions_el.appendChild(task_delete_el);
                task_actions_el.appendChild(task_done_el);

                task_el.appendChild(task_content_el);
                task_el.appendChild(task_actions_el);

                list_el.appendChild(task_el);

                task_edit_el.addEventListener('click', toggleEdit);
                task_delete_el.addEventListener('click', deleteTask);
                task_done_el.addEventListener('click', markDone);
            });
        }
    }

    loadTasks();
    
});