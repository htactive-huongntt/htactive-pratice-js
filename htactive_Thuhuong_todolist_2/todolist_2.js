class ToDoClass {
    constructor() {
        this.perform = [];
        this.timeout;
        this.tasks = JSON.parse(localStorage.getItem("ThisTasks")) || [
            { id: "11aaa22bbb", task: "Creating a map", isCompleted: false }
        ];
        this.loadTasks();
        this.addEventListener();
        localStorage.setItem("status", JSON.stringify(false));
    }

    addEventListener() {
        document.getElementById("addTask").addEventListener("keypress", event => {
            if (event.keyCode === 13) {
                this.addTask(event.target.value);
                event.target.value = "";
            }
        });
    }

    completeTodo(idtask) {
        var currTask = this.tasks.find(t => t.id == idtask);
        currTask.isCompleted = !currTask.isCompleted;
        this.loadTasks();
    }

    addTask(newtask) {
        if (newtask === null) {
            alert("Please enter data !");
        } else {
            const check = this.tasks.some(currTask => currTask.task === newtask);
            if (!check) {
                let taskTemp = {
                    id: this.randomId(),
                    task: newtask,
                    isCompleted: false
                };
                this.tasks.push(taskTemp);
                this.loadTasks();
            }
        }
    }

    showAll() {
        document.getElementById("showComplete").setAttribute("class", "btn btn-default");
        document.getElementById("completeAll").setAttribute("class", "btn btn-default");
        document.getElementById("showAll").setAttribute("class", "btn btn-success");
        document.getElementById("hideComplete").setAttribute("class", "btn btn-default");
        this.loadTasks();
    }

    selectedAll() {
        document.getElementById("taskList").setAttribute("style", "color: black");
        document.getElementById("showComplete").setAttribute("class", "btn btn-default");
        document.getElementById("completeAll").setAttribute("class", "btn btn-success");
        document.getElementById("showAll").setAttribute("class", "btn btn-default");
        document.getElementById("hideComplete").setAttribute("class", "btn btn-default");
        let localStatus = JSON.parse(localStorage.getItem("status"));
        this.tasks.forEach(element => {
            element.isCompleted = !localStatus;
        });
        this.loadTasks();
    }

    deleteTodo(event, idtask) {
        clearTimeout(this.timeout);
        let confi = confirm("Do you wanna delete this Item !");
        if (confi === true) {
            var currIndex = this.tasks.findIndex(t => t.id == idtask);
            this.perform = {
                task: this.tasks[currIndex],
                index: currIndex
            };
            document.getElementById("indexUndo").value = currIndex;
            this.tasks.splice(currIndex, 1);
            this.loadTasks();
            document.getElementById("addItem").style.display = "block";
            document.getElementById("updateItem").style.display = "none";
            document.getElementById("undobtn").style.display = "block";
            document.getElementById("addTask").value = "";
            this.timeout = setTimeout(() => {
                document.getElementById("undobtn").style.display = "none";
            }, 5000);
        }
    }

    unDo() {
        const check = this.tasks.some(currTask => currTask.id === this.perform.task.id);

        if (!check) {
            this.tasks.splice(this.perform.index, 0, this.perform.task);
            localStorage.setItem("ThisTasks", JSON.stringify(this.tasks));
            this.loadTasks();
            clearTimeout(this.timeout);
            document.getElementById("undobtn").style.display = "none";
        }
    }

    updateTodo(eventupdate, idtask) {
        var currTask = this.tasks.find(t => t.id == idtask).task;
        document.getElementById("addItem").style.display = "none";
        document.getElementById("updateItem").style.display = "block";
        document.getElementById("addTask").value = currTask;
        document.getElementById("idtemp").value = idtask;
        document.getElementById("tasktemp").value = currTask;
    }

    updateTaskClick() {
        let target = document.getElementById("addTask").value;
        let updateId = document.getElementById("idtemp").value;
        let compareValue = document.getElementById("tasktemp").value;
        if (compareValue === target) {
            alert("This task is not changed!");
        } else {
            var taskUpdate = this.tasks.find(t => t.id == updateId);
            taskUpdate.task = target;
            taskUpdate.isCompleted = false;
            this.loadTasks();
            document.getElementById("addItem").style.display = "block";
            document.getElementById("updateItem").style.display = "none";
            document.getElementById("addTask").value = "";
        }
    }

    addTaskClick() {
        let target = document.getElementById("addTask").value;
        if (target === "") alert("Please enter data !");
        this.addTask(target);
        document.getElementById("addTask").value = "";
    }

    checkTaskStatus(element, status) {
        return element.isCompleted === status;
    }

    showCompleted() {
        document.getElementById("showComplete").setAttribute("class", "btn btn-success");
        document.getElementById("completeAll").setAttribute("class", "btn btn-default");
        document.getElementById("showAll").setAttribute("class", "btn btn-default");
        document.getElementById("hideComplete").setAttribute("class", "btn btn-default");
        var completedtask = this.tasks.filter(t => this.checkTaskStatus(t, true));
        if (completedtask.length > 0) {
            document.getElementById("taskList").setAttribute("style", "color: black");
            let taskHtml = completedtask.reduce((html, task, index) => (html += this.generateTaskHtml(task)), "");
            document.getElementById("taskList").innerHTML = taskHtml;
        } else {
            document.getElementById("taskList").innerHTML = "You haven't completed any task yet!!!";
            document.getElementById("taskList").setAttribute("style", "color: white");
        }
    }

    randomId() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 10; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    showActiveTask() {
        document.getElementById("showComplete").setAttribute("class", "btn btn-default");
        document.getElementById("completeAll").setAttribute("class", "btn btn-default");
        document.getElementById("showAll").setAttribute("class", "btn btn-default");
        document.getElementById("hideComplete").setAttribute("class", "btn btn-success");
        var completedtask = this.tasks.filter(t => this.checkTaskStatus(t, false));
        if (completedtask.length > 0) {
            document.getElementById("taskList").setAttribute("style", "color: black");
            let taskHtml = completedtask.reduce((html, task, index) => (html += this.generateTaskHtml(task)), "");
            document.getElementById("taskList").innerHTML = taskHtml;
        } else {
            document.getElementById("taskList").innerHTML = "You have completed all tasks!!!";
            document.getElementById("taskList").setAttribute("style", "color: white");
        }
    }

    generateTaskHtml(task) {
        return `
            <li class="list-group-item checkbox">
            <div class="row">
                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">
                <label><input id="toggleTaskStatus" type="checkbox" onchange="toDolist.completeTodo('${task.id}')" value="" class="" ${task.isCompleted ? "checked" : ""}></label> </div>
                <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 task-text ${task.isCompleted ? "completed" : ""}">${task.task}</div>
                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area"> <i href="" onClick="toDolist.updateTodo(event, '${task.id}')" class="fa fa-pencil-square-o" aria-hidden="true" style="listStyleType: none; margin-right: 8px"> </i> 
                <i href="" onClick="toDolist.deleteTodo(event, '${task.id}')" class="fa fa-trash" aria-hidden="true" style="listStyleType: none;"> </i>
                </div>
            </div>
            </li>
        `;
    }

    loadTasks() {
        localStorage.setItem("ThisTasks", JSON.stringify(this.tasks));
        document.getElementById("taskList").setAttribute("style", "color: black");

        if (this.tasks.length > 0) {
            let taskHtml = this.tasks.reduce((html, task) => (html += this.generateTaskHtml(task)), "");
            document.getElementById("taskList").innerHTML = taskHtml;
            let counter = this.tasks.filter(t => t.isCompleted).length;
            let percent = (counter / this.tasks.length) * 100;
            if (percent <= 30 && percent > 0) {
                document.getElementById("checkline").setAttribute("class", "progress-bar bg-info progress-bar-striped");
                document.getElementById("percent").style.backgroundColor = "#17a2b8";
            } else if (percent >= 30 && percent <= 50) {
                document.getElementById("checkline").setAttribute("class", "progress-bar bg-warning progress-bar-striped");
                document.getElementById("percent").style.backgroundColor = "#ffc107";
            } else if (percent > 50 && percent <= 80) {
                document.getElementById("checkline").setAttribute("class", "progress-bar bg-danger progress-bar-striped");
                document.getElementById("percent").style.backgroundColor = "#dc3545";
            } else {
                document.getElementById("checkline").setAttribute("class", "progress-bar bg-success progress-bar-striped");
                document.getElementById("percent").style.backgroundColor = "#28a745";
            }
            document.getElementById("checkline").style.width = percent + "%";
            document.getElementById("percent").innerHTML = Math.floor(percent) + "%";
        }
    }
}

let toDolist;
window.addEventListener("load", () => {
    toDolist = new ToDoClass();
});