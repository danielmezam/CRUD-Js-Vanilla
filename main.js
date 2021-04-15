//Variables
const userForm = document.getElementById("addUser");
const userListUI = document.getElementById("userList");
const updateBtnSubmit = document.getElementById("updateBtnSubmit");
let userListArray = [];
let updateFlag = false;
let dataToUpdate = null;
//Funciones

const addUser = user => {
  userInfo = {
    name: user.name,
    lastName: user.lastName,
    email: user.email
  };

  userListArray.push(userInfo);
  return userInfo;
};

const userStorage = () => {
  localStorage.setItem("list", JSON.stringify(userListArray));
  renderList();
};

const createUser = e => {
  e.preventDefault();
  if (updateFlag) {
    let userUpdated = {
      name: document.getElementById("name").value,
      lastName: document.getElementById("lastname").value,
      email: document.getElementById("email").value
    };

    console.log(userUpdated, dataToUpdate);
    userListArray[dataToUpdate] = userUpdated;
    userStorage();
    userForm.reset();
    updateFlag = false;
    dataToUpdate = null;
  } else {
    let user = {
      name: document.getElementById("name").value,
      lastName: document.getElementById("lastname").value,
      email: document.getElementById("email").value
    };

    addUser(user);
    userStorage();
    userForm.reset();
  }
};

const renderList = () => {
  userListUI.innerHTML = "";
  userListArray = JSON.parse(localStorage.getItem("list"));
  if (userListArray === null) {
    userListArray = [];
  } else {
    userListArray.forEach((user, index) => {
      const userItemDiv = document.createElement("div");
      userItemDiv.setAttribute("class", "userItem");
      userListUI.appendChild(userItemDiv);

      const userInfoDiv = document.createElement("div");
      userInfoDiv.setAttribute("class", "userInfo");
      userItemDiv.appendChild(userInfoDiv);

      const nameUserDiv = document.createElement("h4");
      const emailUserDiv = document.createElement("h4");
      nameUserDiv.innerHTML = `${user.name} ${user.lastName}`;
      emailUserDiv.innerHTML = `${user.email} `;

      userInfoDiv.appendChild(nameUserDiv);
      userInfoDiv.appendChild(emailUserDiv);

      const actionButtons = document.createElement("div");
      actionButtons.setAttribute("class", "actions");
      userItemDiv.append(actionButtons);
      const updateBtn = document.createElement("button");
      updateBtn.setAttribute("class", "update");
      updateBtn.addEventListener("click", () =>
        updateItem(index, {
          name: user.name,
          lastName: user.lastName,
          email: user.email
        })
      );

      updateBtn.setAttribute("id", "update");
      updateBtn.innerHTML = "Editar";
      const deleteBtn = document.createElement("button");
      deleteBtn.setAttribute("class", "delete");
      deleteBtn.addEventListener("click", () => deleteItem(index));
      deleteBtn.innerHTML = "Eliminar";
      deleteBtn.setAttribute("id", "delete");

      actionButtons.appendChild(updateBtn);
      actionButtons.appendChild(deleteBtn);
    });
  }
};

//Eventos

userForm.addEventListener("submit", createUser);

const deleteItem = index => {
  userListArray.splice(index, 1);
  userStorage();
};

const updateItem = (index, user) => {
  document.getElementById("name").value = user.name;
  document.getElementById("lastname").value = user.lastName;
  document.getElementById("email").value = user.email;
  console.log(index);
  updateFlag = true;
  dataToUpdate = index;
};

document.addEventListener("DOMContentLoaded", renderList);
