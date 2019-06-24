class ToDoClass {
    constructor() {
        this.perform = [];
        let timeout;
        this.tasks = JSON.parse(localStorage.getItem("ThisTasks")) || [];
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
        this.tasks.find(t => t.id == idtask).isCompleted = !this.tasks.find(
            t => t.id == idtask
        ).isCompleted;
        localStorage.setItem("ThisTasks", JSON.stringify(this.tasks));
        this.loadTasks();
    }

    addTask(newtask) {
        if (newtask === null) {
            alert("Please enter data !");
        } else {
            let check = 0;
            this.tasks.map(el => {
                if (el.task === newtask) {
                    alert("This task already exists !");
                    check = 1;
                }
            });
            if (check != 1) {
                let taskTemp = {
                    id: this.randomId(),
                    task: newtask,
                    isCompleted: false
                };
                this.tasks.push(taskTemp);
                localStorage.setItem("ThisTasks", JSON.stringify(this.tasks));
                this.loadTasks();
            }
        }
    }

    showAll() {
        this.loadTasks();
    }

    selectedAll() {
        console.log(JSON.parse(localStorage.getItem("status")));

        if (JSON.parse(localStorage.getItem("status")) === false) {
            this.tasks.forEach(element => {
                element.isCompleted = true;
            });
            localStorage.setItem("status", JSON.stringify(true));
        } else if (JSON.parse(localStorage.getItem("status")) === true) {
            this.tasks.forEach(element => {
                element.isCompleted = false;
            });
            localStorage.setItem("status", JSON.stringify(false));
        } else {
            this.tasks.forEach(element => {
                element.isCompleted = true;
            });
            localStorage.setItem("status", JSON.stringify(true));
        }
        localStorage.setItem("ThisTasks", JSON.stringify(this.tasks));
        this.loadTasks();
    }

    deleteTodo(event, idtask) {
        let confi = confirm("Do you wanna delete this Item !");

        if (confi == true) {
            event.preventDefault();
            this.perform = this.tasks.find(t => t.id == idtask);
            document.getElementById("indexUndo").value = this.tasks.findIndex(t => t.id == idtask);
            this.tasks.splice(this.tasks.findIndex(t => t.id == idtask), 1);
            localStorage.clear();
            localStorage.setItem("ThisTasks", JSON.stringify(this.tasks));
            this.loadTasks();
            document.getElementById("addItem").style.display = "block";
            document.getElementById("updateItem").style.display = "none";
            document.getElementById("undobtn").style.display = "block";
            document.getElementById("addTask").value = "";
            timeout = setTimeout(function() {
                document.getElementById("undobtn").style.display = "none";
            }, 5000);
        }
    }

    unDo() {
        let index = document.getElementById("indexUndo").value;
        let fixPoint = 0;
        this.tasks.map(el => {
            if (el.task === this.perform.task) {
                fixPoint = 1;
            }
        });
        if (fixPoint != 1) {
            this.tasks.splice(index, 0, this.perform);
            localStorage.setItem("ThisTasks", JSON.stringify(this.tasks));
            this.loadTasks();
            clearTimeout(timeout);
        }
    }

    updateTodo(eventupdate, idtask) {
        console.log(this.tasks.find(t => t.id == idtask).task);
        document.getElementById("addItem").style.display = "none";
        document.getElementById("updateItem").style.display = "block";
        document.getElementById("addTask").value = this.tasks.find(
            t => t.id == idtask
        ).task;
        document.getElementById("idtemp").value = idtask;
        document.getElementById("tasktemp").value = this.tasks.find(
            t => t.id == idtask
        ).task;
    }

    updateTaskClick() {
        let target = document.getElementById("addTask").value;
        let updateId = document.getElementById("idtemp").value;
        let compareValue = document.getElementById("tasktemp").value;
        if (compareValue === target) {
            alert("This task is not changed!");
        } else {
            this.tasks.find(t => t.id == updateId).task = target;
            this.tasks.find(t => t.id == updateId).isCompleted = false;
            localStorage.setItem("ThisTasks", JSON.stringify(this.tasks));
            this.loadTasks();
            document.getElementById("addItem").style.display = "block";
            document.getElementById("updateItem").style.display = "none";
            document.getElementById("addTask").value = "";
        }
    }

    addTaskClick() {
        let target = document.getElementById("addTask").value;
        if (target === "") {
            alert("Please enter data !");
        } else {
            this.addTask(target);
        }
        document.getElementById("addTask").value = "";
    }

    showCompleted() {
        let completedtask = [];
        this.tasks.map(el => {
            if (el.isCompleted === true) {
                completedtask.push(el);
            }
        });

        if (completedtask.length > 0) {
            let taskHtml = completedtask.reduce(
                (html, task, index) => (html += this.generateTaskHtml(task)),
                ""
            );
            document.getElementById("taskList").innerHTML = taskHtml;
        } else {
            document.getElementById("taskList").innerHTML =
                "You haven't completed any task yet!!!";
        }
    }

    randomId() {
        let text = "";
        let possible =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 10; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    showctiveTask() {
        let completedtask = [];
        this.tasks.map(el => {
            if (el.isCompleted === false) {
                completedtask.push(el);
            }
        });

        if (completedtask.length > 0) {
            let taskHtml = completedtask.reduce(
                (html, task, index) => (html += this.generateTaskHtml(task)),
                ""
            );
            document.getElementById("taskList").innerHTML = taskHtml;
        } else {
            document.getElementById("taskList").innerHTML =
                "You have done all tasks !!!";
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
        this.tasks = JSON.parse(localStorage.getItem("ThisTasks"));
        if (this.tasks != null && this.tasks.length > 0) {
            let taskHtml = this.tasks.reduce(
                (html, task) => (html += this.generateTaskHtml(task)),
                ""
            );
            document.getElementById("taskList").innerHTML = taskHtml;
            let counter = 0;
            this.tasks.forEach(el => {
                if (el.isCompleted === true) {
                    counter = counter + 1;
                }
            });
            if ((counter / this.tasks.length) * 100 <= 30 &&(counter / this.tasks.length) * 100 > 0) {
                document.getElementById("checkline").setAttribute("class", "progress-bar bg-info progress-bar-striped");
                document.getElementById("percent").style.backgroundColor = "#17a2b8";
            } else if ((counter / this.tasks.length) * 100 >= 30 &&(counter / this.tasks.length) * 100 <= 50) {
                document.getElementById("checkline").setAttribute("class","progress-bar bg-warning progress-bar-striped");
                document.getElementById("percent").style.backgroundColor = "#ffc107";
            } else if ((counter / this.tasks.length) * 100 > 50 &&(counter / this.tasks.length) * 100 <= 80 ) {
                document.getElementById("checkline").setAttribute("class", "progress-bar bg-danger progress-bar-striped");
                document.getElementById("percent").style.backgroundColor = "#dc3545";
            } else {
                document .getElementById("checkline").setAttribute("class","progress-bar bg-success progress-bar-striped");
                document.getElementById("percent").style.backgroundColor = "#28a745";
            }
            document.getElementById("checkline").style.width =
                (counter / this.tasks.length) * 100 + "%";
            let per = Math.floor((counter / this.tasks.length) * 100);
            document.getElementById("percent").innerHTML = per + "%";
        } else {
            this.tasks = [
                { id: "11aaa22bbb", task: "work with dog", isCompleted: false }
            ];
            localStorage.setItem("ThisTasks", JSON.stringify(this.tasks));
            this.loadTasks();
        }
    }
}

let toDolist;
window.addEventListener("load", () => {
    toDolist = new ToDoClass();
});