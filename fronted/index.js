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
    .get("http://localhost:3000/add-user")
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
    .delete(`http://localhost:3000/delete-user/${postId}`)
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
    .get(`http://localhost:3000/edit-user/${postId}`)
    .then((res) => {
      // Set the form fields with the retrieved data
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
        .patch(`http://localhost:3000/edit-user/${postId}`, editItem)
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
    .post("http://localhost:3000/add-user", details)
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
  newItem.dataset.itemId = item.id;
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

function handleButton(event) {
  const target = event.target;
  const parentRow = target.closest(".row");
  const itemId = getItemId(parentRow);

  if (target.classList.contains("btn-danger") && parentRow && itemId) {
    console.log("delete");
    deletePost(itemId);
  } else if (target.classList.contains("btn-success") && parentRow && itemId) {
    console.log("edit");
    editPost(itemId);
  }
}

listItem.addEventListener("click", handleButton);

//getting paentRow
function getItemId(parentRow) {
  return parentRow.dataset.itemId;
}
