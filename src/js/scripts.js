/* mobile header*/

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const contactBtn = document.querySelector(".preview__container--btn--main");
const servicesBtns = document.querySelectorAll(".services__btn");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
  if (navMenu.classList.contains("active")) {
    contactBtn.style.display = "none";
    servicesBtns.forEach((btn) => (btn.style.display = "none"));
  } else {
    contactBtn.style.display = "block";
    servicesBtns.forEach((btn) => (btn.style.display = "block"));
  }
});

document.querySelectorAll(".mobile-header__item").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    contactBtn.style.display = "block";
    servicesBtns.forEach((btn) => (btn.style.display = "block"));
  })
);

/* modal */
// new jBox("Modal", {
//   width: 300,
//   height: 100,
//   attach: "#my-modal",
//   title: "My Modal Window",
//   content: "Hello there!",
// });

/* MODAL 2 0 */

$(document).ready(function () {
  $(".services__btn").click(function (e) {
    e.preventDefault();
    const item = $(this).closest(".services__item");

    const title = item.data("title");
    const content = item.data("content");
    const image = item.data("image");

    let imgClass = "services__img--modal";
    let modalClass = "services__item--modal";
    let textClass = "services__text--modal";

    if (
      image.includes("services-modal-3") ||
      image.includes("services-modal-4") ||
      image.includes("services-modal-5")
    ) {
      imgClass = "services__img--modal--short";
      modalClass = "services__item--modal--short";
      textClass = "services__text--modal--short";
    }

    const modal = new jBox("Modal", {
      width: "85vw",
      /*400-850 300-1920*/
      height: "clamp(28.125rem, 23.495rem + 24.691vw, 53.125rem)",
      // createOnInit: true,
      content: `
        <div class="${modalClass}">
          <img class="${imgClass}" src="${image}" alt="${title}">
          <p class="${textClass}">${content}</p>
        </div>`,
      title: `<span class="services__h2--modal">${title}</span>`,
    });

    modal.open();
  });
});
