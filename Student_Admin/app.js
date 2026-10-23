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

const STORAGE_KEY = "studentsList";

// set local storage (once)
const listOfStudents = localStorage.getItem("STORAGE_KEY");
if (!listOfStudents) {
  localStorage.setItem("STORAGE_KEY", JSON.stringify(students));
}

// DOM Variables
// Index Variables
const table = document.body.querySelector("table");

// Form Variables
const fnameInput = document.body.querySelector("#fname");
const lnameInput = document.body.querySelector("#lname");
const ageInput = document.body.querySelector("#age");
const courseInput = document.body.querySelector("#course");
const scoreInput = document.body.querySelector("#score");
const addButton = document.body.querySelector("#add-btn");

/* Index Script */

// prepopulate record rows (DOM manipulation)
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

  table?.appendChild(newRow); // "?" used to prevent acess when the element doesnt eexist
}

// Add rows of students from local storage
function reloadStudents() {
  const currentStudents = JSON.parse(localStorage.getItem("STORAGE_KEY")) || [];
  currentStudents.map(addNewRow);
}

reloadStudents();

/* Form Script */

// adds a new student
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

  const currentStudents = JSON.parse(localStorage.getItem("STORAGE_KEY")) || [];

  const newStudent = {
    id: currentStudents.length + 1,
    fname: fname,
    lname: lname,
    age: age,
    course: course,
    score: score,
  };

  currentStudents.push(newStudent);

  localStorage.setItem("STORAGE_KEY", JSON.stringify(currentStudents));

  console.log(newStudent);
  //checkLocalStorage("STORAGE_KEY");
  alert("Student Added Successfully!");

  window.location.href = "./index.html";

  reloadStudents();

  // TODO 3: Form validation
}

addButton?.addEventListener("click", handleAddClick);

/* Debugging Functions */

function checkLocalStorage(storageKey) {
  const item = JSON.parse(localStorage.getItem(storageKey)) || [];
  console.log(item);
}
