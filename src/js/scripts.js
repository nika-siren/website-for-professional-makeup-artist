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
    servicesBtns.forEach(btn => btn.style.display = "none");
  } else {
    contactBtn.style.display = "block";
    servicesBtns.forEach(btn => btn.style.display = "block");
  }
});

document.querySelectorAll(".mobile-header__item").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    contactBtn.style.display = "block";
    servicesBtns.forEach(btn => btn.style.display = "block");
  })
);

/* */

// document.querySelectorAll(".mobile-header__item").forEach((n) =>
//   n.addEventListener("click", () => {
//     hamburger.classList.remove("active");
//     navMenu.classList.remove("active");
//     contactBtn.style.display = "block"; // Показать кнопку при закрытии меню
//     servicesBtn.style.display = "block";
//   })
// );
