const form = document.getElementById("form");
const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const date = document.getElementById("date");
const time = document.getElementById("time");
const listItem = document.getElementById("list-item");

const edit = document.getElementById("edit");
const submit = document.getElementById("submit");

form.addEventListener("submit", postData);

function getAllData() {
  listItem.innerHTML = "";
  axios
    .get(
      "https://crudcrud.com/api/bb328aa144e149539ddbfdbc9e4553b4/appointment"
    )
    .then((res) => {
      const resDetail = res.data;
      resDetail.forEach((item) => {
        showData(item);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

//Calling all the data first time
getAllData();

//Delete request
function deletePost(postId) {
  axios
    .delete(
      `https://crudcrud.com/api/bb328aa144e149539ddbfdbc9e4553b4/appointment/${postId}`
    )
    .then(() => {
      const rowToDelete = document.querySelector(`[data-item-id="${postId}"]`);
      if (rowToDelete) {
        rowToDelete.remove();
      }
      listItem.innerHTML = "";
      getAllData();
    })
    .catch((err) => {
      console.log(err);
    });
}

function editPost(postId) {
  deletePost(postId);
  axios
    .get(
      `https://crudcrud.com/api/bb328aa144e149539ddbfdbc9e4553b4/appointment/${postId}`
    )
    .then((res) => {
      // Set the form fields with the retrieved data
      console.log(res.data);
      name.value = res.data.name;
      phone.value = res.data.phone;
      email.value = res.data.email;
      time.value = res.data.time;
      date.value = res.data.date;
      // set all the fields with new data
      const editItem = {
        name: name.value,
        email: email.value,
        date: date.value,
        time: time.value,
        phone: phone.value,
      };

      //Updating request
      axios
        .patch(
          `https://crudcrud.com/api/bb328aa144e149539ddbfdbc9e4553b4/appointment/${postId}`,
          editItem
        )
        .then((res) => {
          listItem.innerHTML = "";
          showData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}

//Post data function
function postData(event) {
  event.preventDefault();
  //setting add the data in details object
  const details = {
    name: name.value,
    email: email.value,
    date: date.value,
    time: time.value,
    phone: phone.value,
  };
  axios
    .post(
      "https://crudcrud.com/api/bb328aa144e149539ddbfdbc9e4553b4/appointment",
      details
    )
    .then((res) => {
      listItem.innerHTML = "";
      getAllData();
    })
    .catch((error) => {
      console.log(error);
    });
}

//Function which shows all the appintment
function showData(item) {
  const newItem = document.createElement("div");
  newItem.classList.add("row", "mb-2");
  newItem.dataset.itemId = item._id;
  newItem.innerHTML = ` 
    <div class="col-2">${item.name}</div>
    <div class="col-2">${item.email}</div>
    <div class="col-2">${item.phone}</div>
    <div class="col-2">${item.date}</div>
    <div class="col-2">${item.time}</div>
    <div class="col-1">
        <button class="btn btn-success">Edit</button>
    </div>
    <div class="col-1">
        <button class="btn btn-danger">Delete</button>
    </div>
    `;

  listItem.appendChild(newItem);
}

listItem.addEventListener("click", handleDeleteButton);
listItem.addEventListener("click", handleEditButton);

//Edit function

function handleEditButton(event) {
  editDeleteHelper(event);
}

//Delete funcion

function handleDeleteButton(event) {
  editDeleteHelper(event);
}

//Edit and delete helper function targeting the target
function editDeleteHelper(event) {
  const target = event.target;
  const parentRow = target.closest(".row");
  const itemId = getItemId(parentRow);
  if (target.classList.contains("btn-danger") && parentRow && itemId) {
    deletePost(itemId);
  } else if (target.classList.contains("btn-success") && parentRow && itemId) {
    editPost(itemId);
  }
}

//getting paentRow
function getItemId(parentRow) {
  return parentRow.dataset.itemId;
}
