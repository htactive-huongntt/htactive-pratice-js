const students = [
    { "id": "st1", "name": "trang", "address": "Quang Nam", "classId": "1", "phone": "012563" },
    { "id": "st2", "name": "trang", "address": "Quang Nam", "classId": "3", "phone": "012563" },
    { "id": "st3", "name": "trang", "address": "Quang Nam", "classId": "1", "phone": "012563" },
    { "id": "st4", "name": "trang", "address": "Quang Nam", "classId": "1", "phone": "012563" },
    { "id": "st5", "name": "trang", "address": "Quang Nam", "classId": "1", "phone": "012563" },
    { "id": "st6", "name": "trang", "address": "Quang Nam", "classId": "2", "phone": "012563" }
]

const teachers = [
    { "id": "st1", "name": "trang", "address": "Da Nang", "classId": "Hell", "phone": "012563" },
    { "id": "st2", "name": "trang", "address": "Da Nang", "classId": "Hell", "phone": "012563" },
    { "id": "st3", "name": "trang", "address": "Da Nang", "classId": "Hell", "phone": "012563" },
    { "id": "st4", "name": "trang", "address": "Da Nang", "classId": "Hell", "phone": "012563" },
    { "id": "st5", "name": "trang", "address": "Da Nang", "classId": "Hell", "phone": "012563" },
    { "id": "st6", "name": "trang", "address": "Da Nang", "classId": "Hell", "phone": "012563" }
]

const subjects = [
    { "id": 1, "name": "trang" },
    { "id": 1, "name": "trang" },
    { "id": 1, "name": "trang" },
    { "id": 1, "name": "trang" },
    { "id": 1, "name": "trang" },
    { "id": 1, "name": "trang" }
]

const scores = [
    { "subjectId": "trang", "studentId": "PNV1B", "score": 8 },
    { "subjectId": "trang", "studentId": "PNV1B", "score": 8 },
    { "subjectId": "trang", "studentId": "PNV1B", "score": 8 },
    { "subjectId": "trang", "studentId": "PNV1B", "score": 8 },
    { "subjectId": "trang", "studentId": "PNV1B", "score": 8 },
    { "subjectId": "trang", "studentId": "PNV1B", "score": 8 }
]

const classes = [
    { "id": 1, "name": "1 A", "teacher": "trang", "quantity": 20 },
    { "id": 2, "name": "2 A", "teacher": "trang", "quantity": 20 },
    { "id": 3, "name": "3 A", "teacher": "trang", "quantity": 20 },
    { "id": 4, "name": "4 A", "teacher": "PNV1B", "quantity": 20 },
    { "id": 5, "name": "5 A", "teacher": "PNV1B", "quantity": 20 },
]

localStorage.setItem("students", JSON.stringify(students));
localStorage.setItem("teachers", JSON.stringify(teachers));
localStorage.setItem("subjects", JSON.stringify(subjects));
localStorage.setItem("classes", JSON.stringify(classes));
localStorage.setItem("scores", JSON.stringify(scores));