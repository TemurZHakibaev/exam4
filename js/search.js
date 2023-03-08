const searchBtn = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-input");
const resultsContainer = document.querySelector(".container__right");

searchBtn.addEventListener("click", () => {
  const searchTerms = searchInput.value;
  localStorage.setItem("searchTerms", searchTerms);
  // const itemsPerPage = 6;
  // let currentPage = 1;
  // let data = [];
  async function fetchData() {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchTerms}`
    );
    const json = await response.json();
    data = json.items;
    renderData();
  }

  fetchData();

  function renderData() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = data.slice(startIndex, endIndex);
    const dataContainer = document.querySelector(".container__right");
    dataContainer.innerHTML = "";
    pageData.forEach((item) => {
      // const itemElement = document.createElement("div");

      const book = document.createElement("div");
      book.classList.add("container__right__card");
      //   book.innerHTML = `
      // <div class="container__right__card__top">
      //   <img class="img2" id="book-img" src="${item.volumeInfo.imageLinks.smallThumbnail}" alt="" />
      // </div>
      // <div class="container__right__card__bottom">
      //   <div class="container__right__card__bottom__top">
      //     <h3 class="title" id="book-name">${item.volumeInfo.title}</h3>
      //     <p class="author" id="book-author">${item.volumeInfo.authors[0]}</p>
      //     <p class="year" id="book-year">${item.volumeInfo.publishedDate}</p>
      //   </div>
      //   <div class="container__right__card__bottom__bottom">
      //   <div class="btns">
      //     <button class="bookmark-btn">Bookmark</button>
      //     <button class="info-btn">More Info</button>
      //   </div>
      //   <a target="_blank" href="${item.volumeInfo.previewLink}"><button class="btn read-btn">read</button></a>
      // </div>
      // </div>
      //   `;
      const containerRightCardTop = document.createElement("div");
      containerRightCardTop.classList.add("container__right__card__top");
      const createImg = document.createElement("img");
      createImg.classList.add("img2");
      createImg.src = `${item.volumeInfo.imageLinks.smallThumbnail}`;
      const containerRightCardBottom = document.createElement("div");

      const containerRightCardBottomTop = document.createElement("div");
      containerRightCardBottomTop.classList.add(
        "container__right__card__bottom__top"
      );
      containerRightCardBottom.classList.add("container__right__card__bottom");
      const cardBottomH3 = document.createElement("h3");
      cardBottomH3.classList.add("title");
      cardBottomH3.innerText = `${item.volumeInfo.title}`;
      const cardBottomP = document.createElement("p");
      cardBottomP.innerText = `${item.volumeInfo.authors[0]}`;
      cardBottomP.classList.add("author");
      const cardBottomP2 = document.createElement("p");
      cardBottomP2.classList.add("year");
      cardBottomP2.innerText = `${item.volumeInfo.publishedDate}`;

      const containerRightCardBottomBottom = document.createElement("div");
      containerRightCardBottomBottom.classList.add(
        "container__right__card__bottom__bottom"
      );
      const btns = document.createElement("div");
      btns.classList.add("btns");
      const btn1 = document.createElement("button");
      btn1.classList.add("bookmark-btn");
      btn1.classList.add("active-btn");
      btn1.name = `${item.volumeInfo.authors[0]}`;
      btn1.textContent = "Bookmark";
      btn1.id = `${item.volumeInfo.title}`;

      const btn2 = document.createElement("button");
      btn2.classList.add("info-btn");
      btn2.classList.add("active-btn");
      // btn2.id = "active-btn";
      // btn2.name = "active-btn";
      btn2.textContent = "More Info";
      const btn3 = document.createElement("button");
      btn3.classList.add("read-btn");
      btn3.classList.add("active-btn");
      btn3.textContent = "Read";
      const btn3Link = document.createElement("a");
      btn3Link.target = "_blank";
      btn3Link.href = `${item.volumeInfo.previewLink}`;

      book.append(containerRightCardTop, containerRightCardBottom);
      containerRightCardTop.append(createImg);
      containerRightCardBottom.append(
        containerRightCardBottomTop,
        containerRightCardBottomBottom
      );
      containerRightCardBottomTop.append(
        cardBottomH3,
        cardBottomP2,
        cardBottomP
      );
      containerRightCardBottomBottom.append(btns, btn3Link);
      btns.append(btn1, btn2);
      btn3Link.append(btn3);

      dataContainer.append(book);
    });
    renderPagination();
  }

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

  fetchData();
});
