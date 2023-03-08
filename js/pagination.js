// itemsPerPage = 6;
// let currentPage = 1;
// let data = [];

async function fetchData() {
  const response = await fetch(
    // "https://www.googleapis.com/books/v1/volumes?q=flowers&orderBy=newest&key=AIzaSyCP0NH3y4_BlqWP9S4re_rR4zVii915wIg"
    "https://www.googleapis.com/books/v1/volumes?q=all"
  );
  const json = await response.json();
  data = json.items;
  renderData();
}

fetchData();

function renderPagination() {
  const paginationContainer = document.getElementById("pagination-container");
  paginationContainer.innerHTML = "";
  const totalPages = Math.ceil(data.length / itemsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.innerText = i;
    if (i === currentPage) {
      button.classList.add("pagination-active-btn");
    }
    button.addEventListener("click", () => {
      currentPage = i;
      renderData();
    });
    paginationContainer.appendChild(button);
  }
}
