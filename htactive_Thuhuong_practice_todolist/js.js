class ToDoClass {
    constructor() {
        this.tasks = [
            { task: "Go To Dentist", isComplete: false },
            { task: "Do Gardening", isComplete: true },
            { task: "Renew Library Account", isComplete: false }
        ];

        this.loadTasks();
        this.addEventListener();
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
        // alert(index);
        if(this.tasks[index].isComplete === true){
            this.tasks[index].isComplete = false;
            this.loadTasks();
        }else{
            this.tasks[index].isComplete = true;
            this.loadTasks();
        }
        
    }


    addTask(task) {
        if(task === null){
            alert("Please enter data 11!");
        }else{
            let taskTemp = { task: task, isComplete: false };
            this.tasks.push(taskTemp);
            this.loadTasks(); 
        }
          
    }

    deleteTodo(event, id) {
        event.preventDefault();
        this.tasks.splice(id, 1);
        this.loadTasks();
    }

    addTaskClick() {
        let target = document.getElementById("addTask").value;
        if(target === ''){
            alert("Please enter data !");
        }else{
        this.addTask(target);  
        }
       
    }

    generateTaskHtml(task, index) {
        return `
            <li class="list-group-item checkbox">
            <div class="row">
                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">
                <label><input id="toggleTaskStatus" type="checkbox" onchange="toDo.completeTodo(${index})" value="" class="" ${task.isComplete ? "checked" : ""}></label>
                </div>
                <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 task-text ${task.isComplete ? "complete" : ""}">
                ${task.task}
                </div>
                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area">
                <i href="" onClick="toDo.deleteTodo(event, ${index})" class="fa fa-trash" aria-hidden="true" style="listStyleType: none;"> </i>
                </div>
            </div>
            </li>
        `;
    }

    loadTasks() {
        let taskHtml = this.tasks.reduce(
            (html, task, index) => (html += this.generateTaskHtml(task, index)),""
        );
        document.getElementById("taskList").innerHTML = taskHtml;
    }
}

let toDo;
window.addEventListener("load", () => {
    toDo = new ToDoClass();
});