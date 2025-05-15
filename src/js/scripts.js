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
  document.getElementById("portfolio__image__full").src = imgLink;
  document.getElementById("portfolio__fullscreen").style.display = "flex";
  document.body.style.overflow = "hidden";
  document.getElementById("portfolio__fullscreen").style.justifyContent =
    "center";
  document.getElementById("portfolio__fullscreen").style.alignItems = "center";
}

function closeFullscreen() {
  document.getElementById("portfolio__fullscreen").style.display = "none";
  document.body.style.overflow = "auto";
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
