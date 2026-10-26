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
const STUDENT = "editStudent";
const STUDENT_INDEX = "editStudentIndex";

// set local storage (once)
const listOfStudents = getFromLocalStorage(STORAGE_KEY);

if (!listOfStudents) {
  console.log("here");
  addToLocalStorage(STORAGE_KEY, students);
}

// DOM Variables
// Index Variables
const table = document.body.querySelector("table");
const tableBody = document.body.querySelector("tbody");

// Form Variables
const fnameInput = document.body.querySelector("#fname");
const lnameInput = document.body.querySelector("#lname");
const ageInput = document.body.querySelector("#age");
const courseInput = document.body.querySelector("#course");
const scoreInput = document.body.querySelector("#score");
const addButton = document.body.querySelector("#add-btn");

/* Index Script */

// prepopulate record rows (DOM manipulation)
function addNewRow(student, index) {
  const newRow = document.createElement("tr");
  const tdID = document.createElement("td");
  const tdName = document.createElement("td");
  const tdAge = document.createElement("td");
  const tdCourse = document.createElement("td");
  const tdScore = document.createElement("td");
  const tdEdit = document.createElement("td");
  const tdDelete = document.createElement("td");

  tdID.innerText = index + 1;
  tdName.innerText = student.fname + " " + student.lname;
  tdAge.innerText = student.age;
  tdCourse.innerText = student.course;
  tdScore.innerText = student.score;
  tdEdit.innerHTML = "<a><button>Edit</button></a>";
  tdDelete.innerHTML = "<a><button>Delete</button></a>";

  tdEdit.addEventListener("click", handleEditCheck);
  tdDelete.addEventListener("click", handleDeleteClick);

  newRow.appendChild(tdID);
  newRow.appendChild(tdName);
  newRow.appendChild(tdAge);
  newRow.appendChild(tdCourse);
  newRow.appendChild(tdScore);
  newRow.appendChild(tdEdit);
  newRow.appendChild(tdDelete);

  tableBody?.appendChild(newRow); // "?" used to prevent acess when the element doesnt eexist
}

// Add rows of students from local storage
function reloadStudents() {
  const currentStudents = getFromLocalStorage(STORAGE_KEY) || [];
  currentStudents.map(addNewRow);
}

function removeStudents() {
  tableBody.replaceChildren();
}

reloadStudents();

function handleDeleteClick(e) {
  const currentStudents = getFromLocalStorage(STORAGE_KEY) || [];
  const ii =
    e.target.parentElement.parentElement.parentElement.firstElementChild
      .innerText;

  if (currentStudents.length) {
    // const student = currentStudents[ii - 1];
    // console.log(student);

    currentStudents.splice(ii - 1, 1);

    addToLocalStorage(STORAGE_KEY, currentStudents);
    console.log(currentStudents);
    removeStudents();
  }
  reloadStudents();
}

function handleEditCheck(e) {
  const currentStudents = getFromLocalStorage(STORAGE_KEY) || [];
  const ii =
    e.target.parentElement.parentElement.parentElement.firstElementChild
      .innerText;

  console.log("ii" + ii);

  if (currentStudents.length) {
    const actualInd = ii - 1;
    console.log(actualInd);
    let student = currentStudents[actualInd];

    addToLocalStorage(STUDENT, student);
    addToLocalStorage(STUDENT_INDEX, actualInd);

    // console.log(student);
    window.location.href = "./form.html";
  }
}

/* Form Script */

// check if in edit mode or not
const editStudent = getFromLocalStorage(STUDENT);

function editMode(student) {
  if (student) {
    fnameInput.value = student.fname;
    lnameInput.value = student.lname;
    ageInput.value = student.age;
    courseInput.value = student.course;
    scoreInput.value = student.score;

    removeFromLocalStorage(STUDENT);
  }
}

// TODO: Need to put a conditional to prevent running on index page
editMode(editStudent);

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

  const currentStudents = getFromLocalStorage(STORAGE_KEY) || [];

  const newStudent = {
    id: currentStudents.length + 1,
    fname: fname,
    lname: lname,
    age: age,
    course: course,
    score: score,
  };

  const isEdit = getFromLocalStorage(STUDENT_INDEX);

  if (isEdit != null) {
    currentStudents[isEdit] = newStudent;
    removeFromLocalStorage(STUDENT_INDEX);
  } else {
    currentStudents.push(newStudent);
  }

  addToLocalStorage(STORAGE_KEY, currentStudents);

  console.log(newStudent);
  //checkLocalStorage(STORAGE_KEY);
  alert("Student Added Successfully!");

  window.location.href = "./index.html";

  reloadStudents();

  // TODO: Form validation
}

addButton?.addEventListener("click", handleAddClick);

/* Debugging & Helper Functions */

function checkLocalStorage(storageKey) {
  const item = JSON.parse(localStorage.getItem(storageKey)) || [];
  console.log(item);
}

function addToLocalStorage(storageKey, item) {
  localStorage.setItem(storageKey, JSON.stringify(item));
}

function getFromLocalStorage(storageKey) {
  return JSON.parse(localStorage.getItem(storageKey));
}

function removeFromLocalStorage(storageKey) {
  localStorage.removeItem(storageKey);
}
