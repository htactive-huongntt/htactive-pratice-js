const students = [
    { "id": "st1", "name": "Nguyen Thi My Trang", "address": "Quang Nam", "classId": "1", "phone": "012563" },
    { "id": "st2", "name": "Nguyen Thi Thu Huong", "address": "Quang Tri", "classId": "3", "phone": "012563" },
    { "id": "st3", "name": "Nguyen Thi Phuong Nhung", "address": "Quang Nam", "classId": "1", "phone": "012563" },
    { "id": "st4", "name": "Nguyen Thanh Nam", "address": "Quang Binh", "classId": "4", "phone": "012563" },
    { "id": "st5", "name": "Nguyen Van Manh", "address": "Quang Nam", "classId": "1", "phone": "012563" },
    { "id": "st6", "name": "Nguyen Van Tuan", "address": "Da Nang", "classId": "2", "phone": "012563" }
]

const teachers = [
    { "id": "tc1", "name": "Phan Van Muoi", "address": "Da Nang", "classId": "1", "phone": "012563" },
    { "id": "tc2", "name": "Pham Tien Duan", "address": "Da Nang", "classId": "2", "phone": "012563" },
    { "id": "tc3", "name": "Nguyen Quang Ngoc", "address": "Da Nang", "classId": "3", "phone": "012563" },
    { "id": "tc4", "name": "Nguyen Van Ba", "address": "Da Nang", "classId": "2", "phone": "012563" },
    { "id": "tc5", "name": "Ho Van Bon", "address": "Da Nang", "classId": "1", "phone": "012563" },
    { "id": "tc6", "name": "Dao Hai Anh", "address": "Da Nang", "classId": "4", "phone": "012563" }
]

const subjects = [
    { "id": "N2", "name": "English" },
    { "id": "N3", "name": "Japanese" },
    { "id": "N4", "name": "Chinese" },
    { "id": "N5", "name": "French" }
]

const scores = [
    { "subjectId": "N3", "studentId": "st1", "score": 8 },
    { "subjectId": "N3", "studentId": "st2", "score": 2 },
    { "subjectId": "N3", "studentId": "st3", "score": 5 },
    { "subjectId": "N3", "studentId": "st4", "score": 4 },
    { "subjectId": "N2", "studentId": "st1", "score": 8 },
    { "subjectId": "N2", "studentId": "st2", "score": 6 },
    { "subjectId": "N2", "studentId": "st3", "score": 8 },
    { "subjectId": "N2", "studentId": "st4", "score": 10 },
    { "subjectId": "N4", "studentId": "st1", "score": 8 },
    { "subjectId": "N4", "studentId": "st2", "score": 5 },
    { "subjectId": "N4", "studentId": "st3", "score": 8 },
    { "subjectId": "N4", "studentId": "st4", "score": 9 },
    { "subjectId": "N5", "studentId": "st1", "score": 5 },
    { "subjectId": "N5", "studentId": "st2", "score": 8 },
    { "subjectId": "N5", "studentId": "st3", "score": 4 },
    { "subjectId": "N5", "studentId": "st4", "score": 8 }
]

const classes = [
    { "id": "1", "name": "PNV 20B", "teacher": "trang", "quantity": 20 },
    { "id": "2", "name": "English 3", "teacher": "trang", "quantity": 20 },
    { "id": "3", "name": "PNV 19A", "teacher": "trang", "quantity": 20 },
    { "id": "4", "name": "HT Active 20", "teacher": "PNV1B", "quantity": 20 },
    { "id": "5", "name": "Super Star", "teacher": "PNV1B", "quantity": 20 },
]

localStorage.setItem("students", JSON.stringify(students));
localStorage.setItem("teachers", JSON.stringify(teachers));
localStorage.setItem("subjects", JSON.stringify(subjects));
localStorage.setItem("classes", JSON.stringify(classes));
localStorage.setItem("scores", JSON.stringify(scores));