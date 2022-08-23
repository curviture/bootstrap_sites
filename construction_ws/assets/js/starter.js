// Importing JavaScript
//
// You have two choices for including Bootstrap's JS files—the whole thing,
// or just the bits that you need.

// Option 1
//
// Import Bootstrap's bundle (all of Bootstrap's JS + Popper.js dependency)

// import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

// Option 2
//
// Import just what we need

// If you're importing tooltips or popovers, be sure to include our Popper.js dependency
// import "../../node_modules/popper.js/dist/popper.min.js";

import "../../node_modules/bootstrap/js/dist/util.js";
import "../../node_modules/bootstrap/js/dist/modal.js";
import "../../node_modules/bootstrap/js/dist/collapse.js";
import "../../node_modules/bootstrap/js/dist/tab.js";
import "../../node_modules/bootstrap/js/dist/scrollspy.js";
// import "../../node_modules/bootstrap/js/dist/tooltip.js";
import "../../node_modules/bootstrap/js/dist/modal.js";

(function () {
  let navbarEl = $("#js--navbar");
  $(window).scroll(function () {
    let scrollTop = $(window).scrollTop();
    console.log(scrollTop, $(window).width());
    if (scrollTop > 0 && $(window).width() > 992) {
      navbarEl.addClass("fixed-top scrolled");
      return true;
    }
    if (scrollTop > 0) {
      navbarEl.addClass("fixed-top");
      return true;
    }
    navbarEl.removeClass("fixed-top scrolled");
  });
})();

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function isInViewPort_2(element, options = { fully: false }) {
  let { top, left } = element.offset();
  //elements top edge is below the viewports >top edge
  let topIsInside =
    top > $(window).scrollTop() &&
    top < $(window).scrollTop() + $(window).height();
  let bottomIsInside =
    top + element.height() > $(window).scrollTop() &&
    top + element.height() < $(window).scrollTop() + $(window).height();
  if (options.fully) {
    return topIsInside && bottomIsInside;
  }
  return bottomIsInside && topIsInside;
}

(function () {
  let tabElems = $(".js--services-tab-link");
  let tabElemsContainer = $("#js--services-tab-list");
  let activated = false;
  let timeIndex = null;

  function activateNextTabIndex() {
    let activeIndex;
    tabElems.each(function (index) {
      if ($(this).hasClass("active")) {
        activeIndex = index;
      }
    });
    return (activeIndex + 1) % tabElems.length;
  }

  tabElems.on("shown.bs.tab", function () {
    // console.log("tesar inch exav");
  });

  function tickTabElems(time = 3500) {
    return setInterval(() => {
      tabElems.eq(activateNextTabIndex()).tab("show");
    }, time);
  }

  $(window).scroll(() => {
    if (isInViewPort_2(tabElemsContainer) && !activated) {
      activated = true;
      timeIndex = tickTabElems(4000);
      return;
    }
    if (!isInViewPort_2(tabElemsContainer) && activated) {
      activated = false;
      if (timeIndex) clearInterval(timeIndex);
    }
    if (isInViewPort_2(tabElemsContainer, { fully: true })) {
      // tabElems.eq(activateNextTabIndex()).tab("show");
    }
    if (isInViewPort_2($(".js--info-card-container"), { fully: true })) {
      $(".js--info-card").each(function (index) {
        if (!$(this).hasClass("shown")) {
          let self = $(this);
          setTimeout(function () {
            console.log("lets timeout");
            self.addClass("shown");
          }, index * 400);
        }
      });
    }
  });

  tabElems.click(function (event) {
    event.preventDefault();
    if (timeIndex !== null) {
      clearInterval(timeIndex);
      timeIndex = tickTabElems(1000);
    }
  });
})();

// $(".js--label-tooltip").tooltip({ delay: { ["show"]: 100, ["hide"]: 350 } });
