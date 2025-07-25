/* mobile header*/

const mobileHeader = document.querySelector(".mobile__header-container");
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const contactBtn = document.querySelector(".preview__container--btn--main");
const servicesBtns = document.querySelectorAll(".services__btn");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
  if (navMenu.classList.contains("active")) {
    document.body.style.overflow = "hidden";
    // contactBtn.style.display = "none";
    // servicesBtns.forEach((btn) => (btn.style.display = "none"));
  } else {
    document.body.style.overflow = "auto";
    // contactBtn.style.display = "block";
    // servicesBtns.forEach((btn) => (btn.style.display = "block"));
  }
});

document.querySelectorAll(".mobile-header__item").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.style.overflow = "auto";
    // contactBtn.style.display = "block";
    // servicesBtns.forEach((btn) => (btn.style.display = "block"));
  })
);

/* MODAL 2 0 */

$(document).ready(function () {
  $(".services__btn").click(function (e) {
    e.preventDefault();
    mobileHeader.style.display = "none";

    const item = $(this).closest(".services__item");

    const title = item.data("title");
    const content = item.data("content");
    const [contentTop, contentBottom] = content.split("<!-- split -->");
    const image = item.data("image");
    const serviceId = item.index();

    let imgClass = "services__img--modal";
    let modalClass = "services__item--modal";
    let textClass = "services__text--modal";
    let contentStructure;
    let modalId = "";

    // 2 БЛОК Уникальная структура для обычных модалей
    if (serviceId === 1) {
      const [contentTop, contentBottom] = content.split("<!-- split --!>");
      modalId = "individual-training-modal"; // Уникальный ID для второй услуги

      contentStructure = `
      <div id="services__modal--individual">
        <img class="${imgClass}" src="${image}" alt="${title}">
        <div id="services__text--individual">${contentTop}</div>
      </div>
      <div id="services__text--individual-2">${contentBottom}</div>`;
    } else if (
      image.includes("services-modal-3") ||
      image.includes("services-modal-4") ||
      image.includes("services-modal-5")
    ) {
      imgClass = "services__img--modal--short";
      modalClass = "services__item--modal--short";
      textClass = "services__text--modal--short";

      // 3 4 5 БЛОКИ Структура для short-модалей
      contentStructure = `
        <img class="${imgClass}" src="${image}" alt="${title}">
        <div class="${textClass}">${content}</div>`;
    } else {
      // 1 И 2 БЛОКИ Стандартная структура для обычных модалей
      contentStructure = `
        <img class="${imgClass}" src="${image}" alt="${title}">
        <div class="${textClass}">${content}</div>`;
    }

    const modal = new jBox("Modal", {
      width: "85vw",
      /*400-850 300-1920*/
      height: "clamp(28.125rem, 23.495rem + 24.691vw, 53.125rem)",
      // createOnInit: true,
      content: `
        <div class="${modalClass}" ${modalId ? `id="${modalId}"` : ""}>
          ${contentStructure}
        </div>`,
      title: `<span class="services__h2--modal">${title}</span>`,
      onOpen: () => (mobileHeader.style.display = "none"),
      onClose: () => (mobileHeader.style.display = ""),
    });

    modal.open();
  });
});

/* gallery */

let isSliderActive = false;

function manageSlider() {
  const $gallery = $(".portfolio__gallery");
  const $slider = $(".portfolio-slider-mobile");

  // if ($(window).width() <= 768) {
  // Если слайдер еще не активирован
  if (!isSliderActive) {
    // Клонируем изображения только один раз
    $gallery
      .find(".portfolio__img")
      .clone()
      .removeClass("portfolio__img")
      .addClass("portfolio__img--slider")
      .appendTo($slider);

    $slider.slick({
      accessibility: true, // Включить доступность
      focusOnSelect: false, // Отключить автофокус
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      adaptiveHeight: true,
      responsive: [
        // {
        //   breakpoint: 794,
        //   settings: {
        //     slidesToShow: 3,
        //     slidesToScroll: 3,
        //   },
        // },
        {
          breakpoint: 638,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 455,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });

    isSliderActive = true;
  }
  // } else {
  //   // Если слайдер активен на десктопе - уничтожаем
  //   if (isSliderActive) {
  //     $slider.slick("unslick");
  //     $slider.empty(); // Очищаем клонированные изображения
  //     isSliderActive = false;
  //   }
  // }
}

// Инициализация
$(document).ready(function () {
  $(document).on(
    "click",
    ".portfolio__img, .portfolio__img--slider",
    function () {
      portfolioFullscreen($(this).attr("src"));
    }
  );
  manageSlider();

  // Оптимизация ресайза с задержкой
  let resizeTimer;
  $(window).on("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(manageSlider, 250);
  });
});

/* IMG OPENING ONCLICK*/
function portfolioFullscreen(imgLink) {
  mobileHeader.style.display = "none";

  const fullscreenElement = document.getElementById("portfolio__fullscreen");
  const imgElement = document.getElementById("portfolio__image__full");

  fullscreenElement.classList.remove("fade-out-fwd");
  fullscreenElement.classList.add("active", "fade-in-fwd");

  imgElement.src = imgLink;
  fullscreenElement.style.display = "flex";
  document.body.style.overflow = "hidden";

  fullscreenElement.style.justifyContent = "center";
  fullscreenElement.style.alignItems = "center";

  fullscreenElement.classList.add("visible");

  fullscreenElement.addEventListener("click", handleBackdropClick);
  document.addEventListener("keydown", handleEscPress);
}

function closeFullscreen() {
  mobileHeader.style.display = "";

  const fullscreenElement = document.getElementById("portfolio__fullscreen");

  fullscreenElement.addEventListener(
    "animationend",
    () => {
      fullscreenElement.style.display = "none";
      document.body.style.overflow = "auto";
      fullscreenElement.classList.remove("fade-out-fwd", "visible");
    },
    { once: true }
  );

  fullscreenElement.classList.remove("fade-in-fwd");
  fullscreenElement.classList.add("fade-out-fwd");

  // fullscreenElement.addEventListener(
  //   "animationend",
  //   () => {
  //     fullscreenElement.classList.remove("active", "fade-out-fwd");
  //     document.body.style.overflow = "auto";
  //   },
  //   { once: true }
  // );

  // fullscreenElement.style.display = "none";
  // document.body.style.overflow = "auto";

  fullscreenElement.removeEventListener("click", handleBackdropClick);
  document.removeEventListener("keydown", handleEscPress);
}

function handleBackdropClick(event) {
  if (event.target === document.getElementById("portfolio__fullscreen")) {
    closeFullscreen();
  }
}

function handleEscPress(event) {
  if (event.key === "Escape" || event.keyCode === 27) {
    closeFullscreen();
  }
}
/* IMG OPENING ONCLICK*/

// const portfolioImages = [
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-1.webp",
//     width: 123,
//     height: 503,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-2.webp",
//     width: 320,
//     height: 320,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-3.webp",
//     width: 323,
//     height: 503,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-4.webp",
//     width: 320,
//     height: 320,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-5.webp",
//     width: 323,
//     height: 502,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-7.webp",
//     width: 323,
//     height: 502,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-6.webp",
//     width: 320,
//     height: 320,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-8.webp",
//     width: 323,
//     height: 502,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-9.webp",
//     width: 323,
//     height: 502,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-10.webp",
//     width: 323,
//     height: 502,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-11.webp",
//     width: 323,
//     height: 502,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-12.webp",
//     width: 323,
//     height: 502,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-13.webp",
//     width: 323,
//     height: 502,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-14.webp",
//     width: 323,
//     height: 502,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-15.webp",
//     width: 323,
//     height: 502,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-16.webp",
//     width: 323,
//     height: 502,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-17.webp",
//     width: 323,
//     height: 502,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-18.webp",
//     width: 323,
//     height: 502,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-19.webp",
//     width: 323,
//     height: 502,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-20.webp",
//     width: 323,
//     height: 502,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-21.webp",
//     width: 323,
//     height: 502,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-22.webp",
//     width: 323,
//     height: 502,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-23.webp",
//     width: 323,
//     height: 502,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-24.webp",
//     width: 323,
//     height: 502,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-25.webp",
//     width: 323,
//     height: 502,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-26.webp",
//     width: 323,
//     height: 502,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-27.webp",
//     width: 323,
//     height: 502,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-28.webp",
//     width: 323,
//     height: 502,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-29.webp",
//     width: 323,
//     height: 502,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-30.webp",
//     width: 323,
//     height: 502,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-31.webp",
//     width: 323,
//     height: 502,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-32.webp",
//     width: 323,
//     height: 502,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-33.webp",
//     width: 323,
//     height: 502,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-35.webp",
//     width: 323,
//     height: 502,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-36.webp",
//     width: 323,
//     height: 502,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-37.webp",
//     width: 323,
//     height: 502,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-38.webp",
//     width: 323,
//     height: 502,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-40.webp",
//     width: 323,
//     height: 502,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-41.webp",
//     width: 323,
//     height: 502,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-42.webp",
//     width: 323,
//     height: 502,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-39.webp",
//     width: 323,
//     height: 502,
//   },
//   {
//     src: "./public/assets/images/portfolio/portfolio-img-34.webp",
//     width: 323,
//     height: 502,
//   },
// ];

/* -------------------------------------------- */

// function createGallery() {
//   const gallery = document.querySelector(".portfolio__gallery");
//   const slider = document.querySelector(".slider-for");

//   gallery.innerHTML = "";
//   slider.innerHTML = "";

//   portfolioImages.forEach((img) => {
//     const imgContainer = document.createElement("div");
//     imgContainer.className = "portfolio__img";
//     imgContainer.style.width = `${img.width}px`;

//     const imgElement = document.createElement("img");
//     imgElement.src = img.src;
//     imgElement.alt = "Пример работ";

//     imgContainer.appendChild(imgElement);
//     gallery.appendChild(imgContainer);

//     // Для слайдера
//     const slide = document.createElement("div");
//     const slideImg = document.createElement("img");
//     slideImg.src = img.src;
//     slideImg.alt = "Пример работ";
//     slide.appendChild(slideImg);
//     slider.appendChild(slide);
//     // gallery.appendChild(imgContainer);
//   });

//   /* Masonry после загрузки изображений*/
//   $(document).ready(function () {
//     var $gallery = $(".portfolio__gallery").imagesLoaded(function () {
//       $gallery.masonry({
//         itemSelector: ".portfolio__img",
//         /*-323*/
//         columnWidth: 323,
//         gutter: 20,
//         fitWidth: true,
//         stagger: 30,
//       });
//     });
//   });

//   const mediaQuery = window.matchMedia("(max-width: 1280px)");

//   function handleWidthChange(e) {
//     if (e.matches) {
//       $(".slider-for").slick({
//         infinite: true,
//         adaptiveHeight: true,
//         responsive: [
//           {
//             breakpoint: 1280,
//             settings: { slidesToShow: 3, slidesToScroll: 3 },
//           },
//           {
//             breakpoint: 1024,
//             settings: { slidesToShow: 2, slidesToScroll: 2 },
//           },
//           {
//             breakpoint: 768,
//             settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false },
//           },
//         ],
//       });
//     } else {
//       if ($(".slider-for").hasClass("slick-initialized")) {
//         $(".slider-for").slick("unslick");
//       }
//     }
//   }

//   mediaQuery.addListener(handleWidthChange);
//   handleWidthChange(mediaQuery);
// }

// window.addEventListener("DOMContentLoaded", createGallery);
