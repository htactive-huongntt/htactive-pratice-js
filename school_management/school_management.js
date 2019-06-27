class school {
    constructor() {
        this.students = JSON.parse(localStorage.getItem("students"));
        this.teachers = JSON.parse(localStorage.getItem("teachers"));
        this.scores = JSON.parse(localStorage.getItem("scores"));
        this.subjects = JSON.parse(localStorage.getItem("subjects"));
        this.classes = JSON.parse(localStorage.getItem("classes"));
        this.loadObject(this.students, 'students');
        this.loadObject(this.teachers, 'teachers');
        this.loadSubject();
        this.loadScore();
        this.loadClassAdd();
        this.loadColumn();

    }
    updateTodo(objectId) {
        // var currTask = this.tasks.find(t => t.id == idtask).task;
        let txtName = document.getElementById(objectId + "name");
        let txtAdd = document.getElementById(objectId + "add");
        let txtclass = document.getElementById(objectId + "class");
        let txtphone = document.getElementById(objectId + "phone");
        txtName.removeAttribute("readonly");
        txtName.setAttribute("style", "border: 1px solid #800000");
        txtAdd.removeAttribute("readonly");
        txtAdd.setAttribute("style", "border: 1px solid #800000");
        txtclass.removeAttribute("readonly");
        txtclass.setAttribute("style", "border: 1px solid #800000");
        txtphone.removeAttribute("readonly");
        txtphone.setAttribute("style", "border: 1px solid #800000");
    }

    updateObject(event, objectId) {
        let txtName = document.getElementById(objectId + "name");
        let txtAdd = document.getElementById(objectId + "add");
        let txtclass = document.getElementById(objectId + "class");
        let txtphone = document.getElementById(objectId + "phone");
        var ObjectUpdate = this.students.find(ob => ob.id === objectId);
        ObjectUpdate.name = txtName.value;
        ObjectUpdate.address = txtAdd.value;
        ObjectUpdate.classId = txtclass.value;
        ObjectUpdate.phone = txtphone.value;
        this.loadObject(this.students, 'students');
    }

    generateObjectHtml(object) {
        let _className = this.classes.find(cl => cl.id === object.classId).name;

        return `
            <tr>
            <td>${object.id}</td>
            <td> <input id="${object.id}name" style="border: none" readonly value =" ${object.name}" ></td>
            <td> <input id="${object.id}add" style="border: none" readonly value =" ${object.address}"></td>
            <td> <input id="${object.id}class" style="border: none" readonly value =" ${_className}"></td>
            <td> <input id="${object.id}phone" style="border: none" readonly value =" ${object.phone}"></td>
            <td><i class="fa fa-pencil-square-o" aria-hidden="true"  onClick="sc.updateTodo('${object.id}')"></i>
            <i onClick="sc.deleteObject(event, '${object.id}')" class="fa fa-trash"  aria-hidden="true" style="listStyleType: none;"> </i>
            <i class="fa fa-check-square-o" aria-hidden="true" onClick="sc.updateObject(event, '${object.id}')"></i></td>
        </tr> `;
    }

    generateSubjectHtml(subject) {
        return `
            <tr>
            <td>${subject.id}</td>
            <td>${subject.name}</td>
            <td><i class="fa fa-pencil-square-o" aria-hidden="true"  ></i>
            <i  class="fa fa-trash"  aria-hidden="true" style="listStyleType: none;"> </i>
            <i class="fa fa-check-square-o" aria-hidden="true" ></i></td>
        </tr>`;
    }

    generateScore(student) {
        for (let i = 0; i <= this.students.length; i++) {
            return `
            <tr>
                <td>${student[i].studentId[1].name}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><i class="fa fa-pencil-square-o" aria-hidden="true"  ></i>
                <i  class="fa fa-trash"  aria-hidden="true" style="listStyleType: none;"> </i>
                <i class="fa fa-check-square-o" aria-hidden="true" ></i></td>
            </tr>`;
        }

    }

    loadScore() {
        let arrStu = this.scores.map(sco => ({
            ...sco,
            studentId: this.students.filter(s => sco.studentId.includes(s.id)),
            subjectId: this.subjects.filter(sub => sco.subjectId.includes(sub.id))
        }))
        let scoreHtml = arrStu.reduce((html, stu) => (html += this.generateScore(stu)), "");
        document.getElementById("scores").innerHTML = scoreHtml;
        console.log("ad", arrStu);
    }

    generateClassAdd(_class) {
        return `<option value="${_class.id}">${_class.name}</option>`;
    }

    generateColumnScore(subject) {
        return `<th>${subject.name}</th>`;
    }

    loadColumn() {
        let colStName = `<th>Student Name</th>`;
        let colOption = `<th>Option</th>`;
        let classtHtml = this.subjects.reduce((html, subject) => (html += this.generateColumnScore(subject)), "");
        document.getElementById('columnScore').innerHTML = colStName + classtHtml + colOption;
    }

    loadClassAdd() {
        let classtHtml = this.classes.reduce((html, _class) => (html += this.generateClassAdd(_class)), "");
        document.getElementById('stClass').innerHTML = classtHtml;
    }

    loadObject(arr, locate) {
        localStorage.setItem("students", JSON.stringify(arr));
        let objectHtml = arr.reduce((html, object) => (html += this.generateObjectHtml(object)), "");
        document.getElementById(locate).innerHTML = objectHtml;
    }

    loadSubject() {
        let subjectHtml = this.subjects.reduce((html, subject) => (html += this.generateSubjectHtml(subject)), "");
        document.getElementById("subject").innerHTML = subjectHtml;
    }


    randomId() {
        let text = "ST";
        let possible = "0123456789";
        for (let i = 0; i < 3; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    addNewStudent() {
        let staddr = document.getElementById("stAddress").value;
        let stname = document.getElementById("stName").value;
        let stclass = document.getElementById("stClass").value;
        let stphone = document.getElementById("stPhone").value;
        let stTemp = {
            "id": this.randomId(),
            "name": stname,
            "address": staddr,
            "classId": stclass,
            "phone": stphone
        };
        this.students.push(stTemp);
        this.loadObject(this.students, "students");

        document.getElementById("stAddress").value = "";
        document.getElementById("stName").value = "";
        document.getElementById("stClass").value = "";
        document.getElementById("stPhone").value = "";

    }

}

let sc = new school();