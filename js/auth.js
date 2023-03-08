const loginForm = document.querySelector("#login-form");
const email = document.querySelector("#email-input").value;
const password = document.querySelector("#password-input").value;

// email = "eve.holt@reqres.in";
// password = "cityslicka";
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new error();
      }
    })
    .then((data) => {
      const token = data.token;
      console.log(data);
      localStorage.setItem("token", token);
      window.location.href = "../index.html";
    })
    .catch((error) => {
      console.error(error);
    });
});
