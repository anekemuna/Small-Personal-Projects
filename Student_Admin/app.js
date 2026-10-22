// Temp Data
const students = [
  {
    id: 1,
    fname: "abc",
    lname: "cde",
    age: 27,
    course: "CSE101",
    score: 90,
  },
  {
    id: 2,
    fname: "efg",
    lname: "hij",
    age: 28,
    course: "CSE330",
    score: 76,
  },
  {
    id: 3,
    fname: "jkl",
    lname: "mno",
    age: 19,
    course: "CSE445",
    score: 85,
  },
];

localStorage.setItem("studentsList", JSON.stringify(students));

const table = document.body.querySelector("table");

const fnameInput = document.body.querySelector("#fname");
const lnameInput = document.body.querySelector("#lname");
const ageInput = document.body.querySelector("#age");
const courseInput = document.body.querySelector("#course");
const scoreInput = document.body.querySelector("#score");

const addButton = document.body.querySelector("#add-btn");

function addNewRow(student) {
  const newRow = document.createElement("tr");
  const tdID = document.createElement("td");
  const tdName = document.createElement("td");
  const tdAge = document.createElement("td");
  const tdCourse = document.createElement("td");
  const tdScore = document.createElement("td");
  const tdEdit = document.createElement("td");
  const tdDelete = document.createElement("td");

  tdID.innerText = student.id;
  tdName.innerText = student.fname + " " + student.lname;
  tdAge.innerText = student.age;
  tdCourse.innerText = student.course;
  tdScore.innerText = student.score;
  tdEdit.innerHTML = "<a><button>Edit</button></a>";
  tdDelete.innerHTML = "<a><button>Delete</button></a>";

  newRow.appendChild(tdID);
  newRow.appendChild(tdName);
  newRow.appendChild(tdAge);
  newRow.appendChild(tdCourse);
  newRow.appendChild(tdScore);
  newRow.appendChild(tdEdit);
  newRow.appendChild(tdDelete);

  table.appendChild(newRow);
}

// students.map(addNewRow);

function handleAddClick(e) {
  e.preventDefault();

  const fname = fnameInput.value
    ? fnameInput.value
    : alert("First Name field cannot be empty");

  const lname = lnameInput.value
    ? lnameInput.value
    : alert("Last Name field cannot be empty");

  const age = ageInput.value
    ? ageInput.value
    : alert("Age field cannot be empty");

  const course = courseInput.value
    ? courseInput.value
    : alert("Course field cannot be empty");

  const score = scoreInput.value
    ? scoreInput.value
    : alert("Score field cannot be empty");

  const newStudent = {
    id: students.length + 1,
    fname: fname,
    lname: lname,
    age: age,
    course: course,
    score: score,
  };

  const currentStudents =
    JSON.parse(localStorage.getItem("studentsList")) || [];

  currentStudents.push(newStudent);

  localStorage.setItem("studentsList", JSON.stringify(currentStudents));
  
  console.log(newStudent);
  alert("Student Added Successfully!");

  // TODO: Reset form inputs
  // TODO 2: make data persistent - json or local storage
  // TODO 3: Form validation
}

addButton.addEventListener("click", handleAddClick);
