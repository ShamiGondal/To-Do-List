const addNote = document.getElementById("addNote");
const onSubmit = (e) => {
  e.preventDefault();
};

//alert sections

let itemJsonArray;

function getAndUpdate() {
  console.log("Updating List...");
  tit = document.getElementById("title").value;
  desc = document.getElementById("description").value;

  itemJsonArray = [];

  if (localStorage.getItem("itemsJson") !== null) {
    itemJsonArray = JSON.parse(localStorage.getItem("itemsJson"));
  }

  if (tit.length >= 5 && desc.length >= 5) {
    itemJsonArray.push([tit, desc]);
  } else {
    alert("Title and Description must be greater than 4 characters");
  }

  // Update the items in localStorage
  localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));

  update();
}
function update() {
  let itemJsonArray = JSON.parse(localStorage.getItem("itemsJson")) || []; // Use an empty array as a fallback

  let tbody = document.getElementById("tbody");
  let str = "";

  itemJsonArray.forEach((element, index) => {
    str += ` 
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td><button type="button" class="btn btn-sm " data-toggle="modal" onclick="setEditIndex(${index})"   data-target="#editModal"><lord-icon
            src="https://cdn.lordicon.com/oqyaxvft.json"
            trigger="hover"
            style="width:40px;height:40px">
        </lord-icon></button></td>
            <td><button class="btn  btn-sm" onclick="del(${index})">
            <lord-icon
                src="https://cdn.lordicon.com/wzxoqler.json"
                trigger="hover"
                style="width:40px;height:40px">
            </lord-icon></button></td>
        </tr>
        
        `;
  });

  tbody.innerHTML = str;
}

function addAlert(text) {
  document.getElementById("alert").innerHTML = text;
  document.getElementById("alert").classList.remove("d-none");
  setTimeout(() => {
    document.getElementById("alert").classList.add("d-none");
    document.getElementById("alert").innerHTML = "";
  }, 3000);
}

addNote.addEventListener("click", function () {
  getAndUpdate();

  // Clear the input fields
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  addAlert("Successfully added the task");
});

// Call the update function when the page loads
document.addEventListener("DOMContentLoaded", function () {
  update();
});

function del(itemindex) {
  itemJsonarrayStr = localStorage.getItem("itemsJson");
  itemJsonarray = JSON.parse(itemJsonarrayStr);

  //deleting the index
  itemJsonarray.splice(itemindex, 1);
  localStorage.setItem("itemsJson", JSON.stringify(itemJsonarray));
  update();
  addAlert("Successfully Deleted the task");
}

function clearStorage() {
  if (confirm("Are you sure you want to delete all items ?")) {
    localStorage.clear();
    update();
  }
}

let editIndex; // Declare a global variable to store the index

function setEditIndex(index) {
  editIndex = index;
  console.log(editIndex);
  itemJsonArray = JSON.parse(localStorage.getItem("itemsJson"));
  const currentData = itemJsonArray[editIndex];
  etitle.value = currentData[0];
  edescription.value = currentData[1];
}

function EditNote() {
  console.log(editIndex);
  itemJsonArray = JSON.parse(localStorage.getItem("itemsJson"));
  const currentData = itemJsonArray[editIndex];
  console.log(currentData);

  // Get the input values when the Edit button is clicked
  const etitle = document.getElementById("etitle");
  const edescription = document.getElementById("edescription");

  if (currentData) {
    currentData[0] = etitle.value;
    currentData[1] = edescription.value;
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    update();
    addAlert(" Task Updated");
  }
  console.log(itemJsonArray[editIndex]);
}

const mSave = document.getElementById("mSave");
const mClose = document.getElementById("mClose");
