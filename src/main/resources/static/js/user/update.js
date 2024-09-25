const jwt = localStorage.getItem("token");
if (!jwt) location.href = "/views/login";

const nicknameInput = document.getElementById("nickname-input");
const nameInput = document.getElementById("name-input");
const ageInput = document.getElementById("age-input");
const emailInput = document.getElementById("email-input");
const phoneInput = document.getElementById("phone-input");
const imgContainer = document.getElementById("img-container");
const setBaseData = (userInfo) => {
  nicknameInput.value = userInfo.nickname;
  nameInput.value = userInfo.name;
  ageInput.value = userInfo.age;
  emailInput.value = userInfo.email;
  phoneInput.value = userInfo.phone;
  if(userInfo.profileImg) {
    const imageElem = document.createElement("img");
    imageElem.className = "img-thumbnail rounded";
    imageElem.src = userInfo.profileImg;
    imgContainer.innerHTML = "";
    imgContainer.appendChild(imageElem);
  }
}

fetch("/users/get-user-info", {
  headers: {
    "Authorization": `Bearer ${jwt}`,
  },
})
    .then(response => {
      loggedIn = response.ok;
      if (!loggedIn) {
        localStorage.removeItem("token");
        location.href = "/views/login";
      }
      return response.json();
    })
    .then(setBaseData);

const updateForm = document.getElementById("update-form");
updateForm.addEventListener("submit", e => {
  e.preventDefault();
  const nickname = nicknameInput.value;
  const name = nameInput.value;
  const age = parseInt(ageInput.value);
  const email = emailInput.value;
  const phone = phoneInput.value;
  const body = { nickname, name, age, email, phone };
  fetch("/users/details", {
    method: "put",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
      .then(response => {
        if (response.ok) location.reload();
        else if (response.status === 403)
          location.href = "/views/login";
        else alert(response.status);
      });
});

const imageForm = document.getElementById("profile-img-form");
imageForm.addEventListener("submit", e => {
  e.preventDefault();

  const formData  = new FormData();
  const imageInput = imageForm.querySelector("input");
  formData.append("file", imageInput.files[0]);

  fetch("/users/profile", {
    method: "put",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  }).then(response => {
    if (response.ok) location.reload();
    else if (response.status === 403)
      location.href = "/views/login";
    else alert(response.status);
  });
});
