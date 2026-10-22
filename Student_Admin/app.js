const students = [
  {
    id: 1,
    fname: "abc",
    lname: "cde",
    course: "CSE101",
    score: 90,
  },
  {
    id: 2,
    fname: "efg",
    lname: "hij",
    course: "CSE330",
    score: 90,
  },
  {
    id: 3,
    fname: "jkl",
    lname: "mno",
    course: "CSE445",
    score: 90,
  },
];

const fnameInput = document.body.querySelector("#fname");
const lnameInput = document.body.querySelector("#lname");
const ageInput = document.body.querySelector("#age");
const courseInput = document.body.querySelector("#course");
const scoreInput = document.body.querySelector("#score");

const addButton = document.body.querySelector("#add-btn");

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

  students.push(newStudent);
  alert("Student Added Successfully!")
  console.log(newStudent);

  // TODO: Reset form inputs
  // TODO 2: make data persistent - json or local storage 
  // TODO 3: Form validation 

}
addButton.addEventListener("click", handleAddClick);
