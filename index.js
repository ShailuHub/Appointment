const form = document.getElementById("form");
const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const date = document.getElementById("date");
const time = document.getElementById("time");
const listItem = document.getElementById("list-item");

const submit = document.getElementById("submit");

form.addEventListener("submit", postData);

function postData(event) {
  event.preventDefault();
  const details = {
    name: name.value,
    email: email.value,
    date: date.value,
    time: time.value,
    phone: phone.value,
  };
  axios
    .post(
      "https://crudcrud.com/api/783ba943cda9465090d246b54fbbd903/appointment",
      details
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
  axios
    .get(
      "https://crudcrud.com/api/783ba943cda9465090d246b54fbbd903/appointment"
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

function showData(item) {
  const newItem = document.createElement("div");
  newItem.classList.add("row", "mb-2");
  newItem.innerHTML = ` 
    <div class="col-2">${item.name}</div>
    <div class="col-2">${item.email}</div>
    <div class="col-2">${item.phone}</div>
    <div class="col-2">${item.date}</div>
    <div class="col-2">${item.time}</div>
    <div class="col-1">
        <button id="edit" class="btn btn-success">Edit</button>
    </div>
    <div class="col-1">
        <button id="delete" class="btn btn-danger">Delete</button>
    </div>
    `;
  listItem.appendChild(newItem);
}
