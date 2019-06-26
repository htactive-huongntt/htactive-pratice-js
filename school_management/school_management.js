class school {
    constructor() {
        this.students = JSON.parse(localStorage.getItem("students"));
        this.teachers = JSON.parse(localStorage.getItem("teachers"));
        this.scores = JSON.parse(localStorage.getItem("scores"));
        this.subjects = JSON.parse(localStorage.getItem("subjects"));
        this.classes = JSON.parse(localStorage.getItem("classes"));
        this.loadObject(this.students);
        this.loadSubject();

    }
    generateObjectHtml(object) {
        return `
            <tr>
            <td>${object.id}</td>
            <td>${object.name}</td>
            <td>${object.address}</td>
            <td>${object.classId}</td>
            <td>${object.phone}</td>
            <td><i class="fa fa-pencil-square-o" aria-hidden="true"></i><i class="fa fa-bars" aria-hidden="true"></i></td>
        </tr>
        `;
    }

    generateSubjectHtml(subject) {
        return `
            <tr>
            <td>${subject.id}</td>
            <td>${subject.name}</td>
            <td><i class="fa fa-pencil-square-o" aria-hidden="true"></i> <i class="fa fa-bars" aria-hidden="true"></i></td>
        </tr>
        `;
    }

    loadObject(arr) {
        let objectHtml = arr.reduce((html, object) => (html += this.generateObjectHtml(object)), "");
        document.getElementById("person").innerHTML = objectHtml;
    }

    loadSubject() {
        let subjectHtml = this.subjects.reduce((html, subject) => (html += this.generateSubjectHtml(subject)), "");
        document.getElementById("subject").innerHTML = subjectHtml;
    }

    showStudents() {
        this.loadObject(this.students);
    }

    showTeachers() {
        this.loadObject(this.teachers);
    }
    addNewStudent() {
        document.getElementById("addStudent").removeAttribute("hidden");
    }

}

let sc = new school();