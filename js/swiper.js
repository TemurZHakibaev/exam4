import Swiper from "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js";

const swiper = new Swiper(".swiper", {
  slidesPerView: 4,
  spaceBetween: 10,
  delay: 100,
  autoplay: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

async function getItem() {
  const URL = await fetch("https://www.googleapis.com/books/v1/volumes?q=all")
    .then((res) => res.json())
    .then((data) => {
      const el = data.items;
      el.forEach((item) => {
        showBook2(item);
      });
    });
}

getItem();

const swiperWrapper = document.querySelector(".swiper-wrapper");
console.log(swiperWrapper);
function showBook2(data) {
  const swiperSlide = document.createElement("div");
  swiperSlide.classList.add("swiper-slide");
  swiperWrapper.append(swiperSlide);
  const containerRightCardTop = document.createElement("div");
  containerRightCardTop.classList.add("container__right__card__top");
  const createImg = document.createElement("img");
  createImg.classList.add("img2");
  createImg.src = `${data.volumeInfo.imageLinks.smallThumbnail}`;
  const containerRightCardBottom = document.createElement("div");

  const containerRightCardBottomTop = document.createElement("div");
  containerRightCardBottomTop.classList.add(
    "container__right__card__bottom__top"
  );
  containerRightCardBottom.classList.add("container__right__card__bottom");
  const cardBottomH3 = document.createElement("h3");
  cardBottomH3.classList.add("title");
  cardBottomH3.innerText = `${data.volumeInfo.title}`;
  const cardBottomP = document.createElement("p");
  cardBottomP.innerText = `${data.volumeInfo.authors[0]}`;
  cardBottomP.classList.add("author");
  const cardBottomP2 = document.createElement("p");
  cardBottomP2.classList.add("year");
  cardBottomP2.innerText = `${data.volumeInfo.publishedDate}`;

  const containerRightCardBottomBottom = document.createElement("div");
  containerRightCardBottomBottom.classList.add(
    "container__right__card__bottom__bottom"
  );
  const btns = document.createElement("div");
  btns.classList.add("btns");
  const btn1 = document.createElement("button");
  btn1.classList.add("bookmark-btn");
  btn1.classList.add("active-btn");
  btn1.name = `${data.volumeInfo.authors[0]}`;
  btn1.textContent = "Bookmark";
  btn1.id = `${data.volumeInfo.title}`;

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
  btn3Link.href = `${data.volumeInfo.previewLink}`;

  swiperSlide.append(containerRightCardTop, containerRightCardBottom);
  containerRightCardTop.append(createImg);
  containerRightCardBottom.append(
    containerRightCardBottomTop,
    containerRightCardBottomBottom
  );
  containerRightCardBottomTop.append(cardBottomH3, cardBottomP2, cardBottomP);
  containerRightCardBottomBottom.append(btns, btn3Link);
  btns.append(btn1, btn2);
  btn3Link.append(btn3);
}

const containerRight = document.querySelector(".swiper");
const bookmarkList = document.querySelector(".test2");

const bookmarkArray = [];
var newBookmarkArray;

containerRight.addEventListener("click", (e) => {
  const title = e.target.id;
  const author = e.target.name;

  newBookmarkArray = {
    title,
    author,
  };

  if (!newBookmarkArray.title == "") {
    bookmarkArray.push(newBookmarkArray);
  }

  renderBookmark(bookmarkArray);
});

function renderBookmark(arr = bookmarkArray, parent = bookmarkList) {
  parent.textContent = null;
  const fragment = document.createDocumentFragment();
  arr.forEach((item) => {
    const test = document.createElement("div");
    test.classList.add("test");
    test.innerHTML = `

  <div class="container__left__bottom">
    <div class="container__left__bottom__books">
      <div class="bottom__books__left">
        <h4>${item.title}</h4>
        <p>${item.author}</p>
      </div>
      <div class="bottom__books__right">
        <img class="modal-img" src="./assets/img/book-open.png" alt="" />
        <img src="./assets/img/delete.png" alt="" />
      </div>
    </div>
  </div>
    `;

    fragment.append(test);
  });
  parent.append(fragment);
}

const modal = document.querySelector(".modal");
const closeModal = document.querySelector("#modal-close");
closeModal.style.cursor = "pointer";
console.log(modal);

containerRight.addEventListener("click", (e) => {
  const modalId = e.target.id;
  const madalClass = e.target.name;

  if (modalId == madalClass) {
    modal.classList.add("active-madal");
  }
});

closeModal.addEventListener("click", () => [
  modal.classList.remove("active-madal"),
]);
