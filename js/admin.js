const submitBtn = document.getElementById("submit-btn");
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});
submitBtn.addEventListener("click", postData);

function postData() {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const ageInput = document.getElementById("age");

  const data = {
    name: nameInput.value,
    email: emailInput.value,
    age: ageInput.value,
  };

  fetch("https://63e8ca9b5f3e35d898f59067.mockapi.io/shopping", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("sussec");
      console.log(data);
    })
    .catch((error) => console.error(error));
}
