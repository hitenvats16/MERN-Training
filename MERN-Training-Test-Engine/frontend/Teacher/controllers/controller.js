import { questionOperations } from "../services/questionOperations.js";

window.addEventListener("load", init);


function init() {
  bindEvents();
  UpdateCounts();
}

function bindEvents() {
  document.querySelector("#add").addEventListener("click", addQuestion);
  document.querySelector("#delete").addEventListener("click", deleteQuestions);
  document.querySelector("#save").addEventListener("click", setSavedData);
  document.querySelector("#load").addEventListener("click", getSavedData);
  document.querySelector("#update").addEventListener("click", updateQuestion);
  document.querySelector("#clear-form").addEventListener("click", clearAll);
  document.querySelector("#search").addEventListener("click", search);
  document
    .querySelector("#Original")
    .addEventListener("click", DisplayOriginal);
  document
    .querySelector("#saveToServer")
    .addEventListener("click", saveToServer);
  document
    .querySelector("#loadFromServer")
    .addEventListener("click", retrieveDataFromServer);
  document.querySelector("#sort-by-id").addEventListener("click", () => {
    sortQuestions("questionID");
  });
  document.querySelector("#sort-by-question").addEventListener("click", () => {
    sortQuestions("question");
  });
}

const INPUT_FIELDS = [
  "questionID",
  "question",
  "option1",
  "option2",
  "option3",
  "option4",
  "correctOption",
  "scoreSlider",
];

const OUTPUT_FIELDS = [
  "questionID",
  "question",
  "option1",
  "option2",
  "option3",
  "option4",
  "correctOption",
  "scoreSlider",
];

function addQuestion() {
  const questionObject = takeInput();
  questionOperations.add(questionObject);
  addRowToTable(questionObject);
  clearAll();
}

function addRowToTable(questionObject) {
  let tbody = document.getElementById("tableBody");
  let row = tbody.insertRow(-1);
  row.classList.add(`rowno${questionObject["questionID"]}`);
  insertCell(questionObject, row);
}

function insertCell(questionObject, row) {
  if (questionObject["delete"]) row.classList.add("alert-danger");
  let index = 0;
  OUTPUT_FIELDS.forEach((field) => {
    let cell = row.insertCell(index++);
      cell.innerText = questionObject[field];
  });
  let cell = row.insertCell(index);
  cell.appendChild(
    createIcon(
      toggleRowColor,
      questionObject["questionID"],
      "fa-trash-can alert-danger"
    )
  );
  cell.appendChild(
    createIcon(
      editQuestion,
      questionObject["questionID"],
      "fa-pencil alert-warning"
    )
  );
  UpdateCounts();
}

function createIcon(fn, questionID, className) {
  let icon = document.createElement("i");
  icon.className = "fa-solid me-4 " + className;
  icon.addEventListener("click", fn);
  icon.setAttribute("questionID", questionID);
  return icon;
}

function toggleRowColor() {
  let row = this.parentNode.parentNode;
  row.classList.toggle("alert-danger");
  let id = this.getAttribute("questionID");
  questionOperations.toggle(id);
  UpdateCounts();
}

function UpdateCounts() {
  document.getElementById("totalRecord").innerText =
    questionOperations.countTotal();
  document.getElementById("markedRecord").innerText =
    questionOperations.countMarked();
  document.getElementById("unmarkedRecord").innerText =
    questionOperations.countUnmarked();
}

function clearAll() {
  for (let index = 0; index < INPUT_FIELDS.length; index++) {
    let field = INPUT_FIELDS[index];
    document.getElementById(field).value = "";
  }
}

function deleteQuestions() {
  questionOperations.delete();
  updateWholeTable(questionOperations.questions);
}

function updateWholeTable(questions) {
  clearTable();
  questions.forEach(addRowToTable);
  UpdateCounts();
}

function setSavedData() {
  questionOperations.saveToLocal();
  toggleQuestionSave();
}

function toggleQuestionSave() {
  let alert = document.getElementById("alert");
  alert.classList.toggle("d-none");
  setTimeout(() => {
    alert.classList.toggle("d-none");
  }, 5000);
}

function getSavedData() {
  questionOperations.loadFromLocal();
  questionOperations.questions.forEach(addRowToTable);
}

function editQuestion() {
  let id = this.getAttribute("questionID");
  let obj = questionOperations.searchById(id);
  for (let index = 0; index < INPUT_FIELDS.length; index++) {
    let field = INPUT_FIELDS[index];
    document.getElementById(field).value = obj[field];
  }
}

function updateQuestion() {
  let updatedObj = questionOperations.update(takeInput());
  updateRow(updatedObj["questionID"], updatedObj);
}

function takeInput() {
  const questionObject = {};
  for (let index = 0; index < INPUT_FIELDS.length; index++) {
    let field = INPUT_FIELDS[index];
    questionObject[field] = document.getElementById(field).value;
  }
  return questionObject;
}

function updateRow(id, updatedObj) {
  let row = document.querySelector(`.rowno${id}`);
  row.innerHTML = "";
  insertCell(updatedObj, row);
  highlightUpdatedQuestion(`rowno${id}`);
}

function highlightUpdatedQuestion(className) {
  let obj = document.getElementsByClassName(className)[0];
  obj.classList.toggle("alert-warning");
  setTimeout(() => {
    obj.classList.toggle("alert-warning");
  }, 5000);
}

function clearTable() {
  let tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";
}

function sortQuestions(field) {
  questionOperations.sort(field);
  updateWholeTable(questionOperations.questions);
}

function search() {
  let key_word = document.querySelector("#searchInput").value;
  if (!key_word) {
    DisplayOriginal();
  }
  let questions = questionOperations.searchByKeyWord(key_word);
  updateWholeTable(questions);
}

function DisplayOriginal() {
  updateWholeTable(questionOperations.questions);
}

function retrieveDataFromServer() {
  questionOperations.loadFromServer().finally(() => {
    updateWholeTable(questionOperations.questions);
  });
}

function saveToServer() {
  questionOperations.saveToServer();
}
