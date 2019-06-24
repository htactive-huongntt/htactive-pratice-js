class ToDoClass {
    constructor() {
        this.perform = [];
        this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
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

    completeTodo(index) {
        this.tasks[index].isComplete = !this.tasks[index].isComplete;
        localStorage.clear();
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        this.loadTasks();
    }

    addTask(task) {
        if (task === null) {
            alert("Please enter data !");
        } else {
            let taskTemp = { task: task, isComplete: false };
            console.log(taskTemp);
            this.tasks.push(taskTemp);
            // localStorage.clear();
            localStorage.setItem("tasks", JSON.stringify(this.tasks));
            this.loadTasks();
        }
    }

    selectAll() {
        console.log(JSON.parse(localStorage.getItem("status")));

        if (JSON.parse(localStorage.getItem("status")) === false) {
            this.tasks.forEach(element => {
                element.isComplete = true;
            });
            localStorage.setItem("status", JSON.stringify(true));
        } else if (JSON.parse(localStorage.getItem("status")) === true) {
            this.tasks.forEach(element => {
                element.isComplete = false;
            });
            localStorage.setItem("status", JSON.stringify(false));
        } else {
            this.tasks.forEach(element => {
                element.isComplete = true;
            });
            localStorage.setItem("status", JSON.stringify(true));
        }
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        this.loadTasks();
    }

    deleteTodo(event, id) {
        let confi = confirm("Do you wanna delete this Item !");
        if (confi == true) {
            this.perform = this.tasks[id];
            console.log(this.perform);
            event.preventDefault();
            this.tasks.splice(id, 1);
            localStorage.clear();
            localStorage.setItem("tasks", JSON.stringify(this.tasks));
            this.loadTasks();
            var btn = document.createElement("button");
            btn.innerHTML = "undo";
            document.body.appendChild(btn);
            btn.setAttribute("onclick", "toDo.unDo()");
            btn.setAttribute(
                "style",
                "background: #ff7842; margin-left: 50%; width: 200px; heigth: auto;"
            );
            setTimeout(function() {
                btn.remove();
            }, 3000);
        }
    }

    unDo() {
        this.tasks.push(this.perform);
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        this.loadTasks();
    }

    updateTodo(eventupdate, id) {
        document.getElementById("addItem").style.display = "none";
        document.getElementById("updateItem").style.display = "block";
        document.getElementById("addTask").value = this.tasks[id].task;
        document.getElementById("idtemp").value = id;
        console.log(id);
    }

    updateTaskClick() {
        let target = document.getElementById("addTask").value;
        let id = document.getElementById("idtemp").value;
        // console.log(id);
        this.tasks[id].task = target;
        this.tasks[id].isComplete = false;
        // console.log(this.tasks[id]);
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        this.loadTasks();
        document.getElementById("addItem").style.display = "block";
        document.getElementById("updateItem").style.display = "none";
        document.getElementById("addTask").value = "";
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
        this.tasks.forEach(el => {
            if (el.isComplete === true) {
                completedtask.push(el);
            }
        });

        if (completedtask.length > 0) {
            let taskHtml = completedtask.reduce(
                (html, task, index) => (html += this.generateTaskHtml(task, index)),
                ""
            );
            document.getElementById("taskList").innerHTML = taskHtml;
        } else {
            document.getElementById("taskList").innerHTML = "No result !!!";
        }
    }
    showctiveTask() {
        let completedtask = [];
        this.tasks.forEach(el => {
            if (el.isComplete === false) {
                completedtask.push(el);
            }
        });

        if (completedtask.length > 0) {
            let taskHtml = completedtask.reduce(
                (html, task, index) => (html += this.generateTaskHtml(task, index)),
                ""
            );
            document.getElementById("taskList").innerHTML = taskHtml;
        } else {
            document.getElementById("taskList").innerHTML = "No result !!!";
        }
    }

    generateTaskHtml(task, index) {
        return `
            <li class="list-group-item checkbox">
            <div class="row">
                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">
                <label><input id="toggleTaskStatus" type="checkbox" onchange="toDo.completeTodo(${index})" value="" class="" ${
      task.isComplete ? "checked" : ""
    }></label>
                </div>
                <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 task-text ${
                  task.isComplete ? "complete" : ""
                }">${task.task}</div>
                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area">
                <i href="" onClick="toDo.updateTodo(event, ${index})" class="fa fa-pencil-square-o" aria-hidden="true" style="listStyleType: none; margin-right: 8px"> </i> 
                <i href="" onClick="toDo.deleteTodo(event, ${index})" class="fa fa-trash" aria-hidden="true" style="listStyleType: none;"> </i>
                </div>
            </div>
            </li>
        `;
    }

    loadTasks() {
        this.tasks = JSON.parse(localStorage.getItem("tasks"));
        console.log(this.tasks);
        if (this.tasks != null && this.tasks.length > 0) {
            let taskHtml = this.tasks.reduce(
                (html, task, index) => (html += this.generateTaskHtml(task, index)),
                ""
            );
            document.getElementById("taskList").innerHTML = taskHtml;
            let counter = 0;
            this.tasks.forEach(el => {
                if (el.isComplete === true) {
                    counter = counter + 1;
                }
            });
            if ((counter / this.tasks.length) * 100 <= 30 && (counter / this.tasks.length) * 100 > 0) {
                document.getElementById("checkline").style.width =(counter / this.tasks.length) * 100 + "%";
                document.getElementById("checkline").setAttribute("class", "progress-bar bg-info progress-bar-striped");
            } else if ((counter / this.tasks.length) * 100 >= 30 &&(counter / this.tasks.length) * 100 <= 50) {
                document.getElementById("checkline").style.width =(counter / this.tasks.length) * 100 + "%";
                document.getElementById("checkline").setAttribute("class", "progress-bar bg-warning progress-bar-striped");
            }else if ((counter / this.tasks.length) * 100 > 50 &&(counter / this.tasks.length) * 100 <= 80) {
                document.getElementById("checkline").style.width =(counter / this.tasks.length) * 100 + "%";
                document.getElementById("checkline").setAttribute("class", "progress-bar bg-danger progress-bar-striped");
            }else{
                document.getElementById("checkline").style.width =(counter / this.tasks.length) * 100 + "%";
                document.getElementById("checkline").setAttribute("class", "progress-bar bg-success progress-bar-striped");
            }
        } else {
            this.tasks = [{ task: "work with dog", isCompleted: false }];
            localStorage.setItem("tasks", JSON.stringify(this.tasks));
            this.loadTasks();
        }
    }
}

let toDo;
window.addEventListener("load", () => {
    toDo = new ToDoClass();
});