const jwt = localStorage.getItem("token") ?? null;
if (jwt) fetch("/users/get-user-info", {
  headers: {
    "Authorization": `Bearer ${jwt}`,
  },
}).then(response => {
  if (response.ok) location.href = "/views";
})

const signupForm = document.getElementById("signup-form");
const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");
const passCheckInput = document.getElementById("passcheck-input");
signupForm.addEventListener("submit", e => {
  e.preventDefault();
  const username = usernameInput.value;
  const password = passwordInput.value;
  const passwordCheck = passCheckInput.value;
  fetch("/users/signup", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, passwordCheck }),
  })
      .then(response => {
        if (response.ok) location.href = "/views/login";
        else throw Error("failed to signup");
      })
      .catch(error => alert(error.message));
});
