(function () {
  let trigger = document.getElementById("js--nav__trigger");
  trigger.addEventListener("click", function (event) {
    event.target.classList.toggle("open");
  });
})();

document.addEventListener("DOMContentLoaded", function () {
  let splide = new Splide("#js--feedback__slide", {
    perPage: 1,
    arrows: false,
    pagination: true,
    type: "loop",
    autoplay: true,
    // fixedWidth: "250px",
    // autoWidth: true,
  }).mount();
  splide.on("move", function (a, b, c) {
    let avs = document.querySelectorAll("[data-feedbackuser]");
    Array.from(avs).forEach((av) => {
      av.classList.remove("active");
    });
    let elm = document.querySelector(`[data-feedbackuser="${a}"]`);
    elm.classList.add("active");
  });
});

let modal__trigger = document.getElementById("js--cta__modal-trigger");
console.log(modal__trigger);
modal__trigger.addEventListener("click", function (event) {
  let targetModal = document.querySelector(event.target.dataset.target);
  targetModal.classList.toggle("shown");
  document.body.classList.add("no--overflow");
});

let modal = document.getElementsByClassName("modal");
Array.from(modal).forEach((item) => {
  item.addEventListener("click", function (event) {
    event.target.classList.toggle("shown");
    document.body.classList.remove("no--overflow");
  });
});
