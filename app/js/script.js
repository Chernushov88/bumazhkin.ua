$(document).ready(function() {
  $(".scrolling__link").on("click", function(event) {
    event.preventDefault();
    var id = $(this).attr("href"),
      top = $(id).offset().top;

    $("body,html").animate({ scrollTop: top }, 1000);
  });

  // $('.phone-mask').mask('+38(999)999-99-99');

  $(".howItWork__slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000
  });

  $(".review__slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000
  });
});

$(window).scroll(function() {
  $("#about").each(function() {
    stepAnim = $("#about").offset().top - 700;
    scrollstep = $(window).scrollTop();
    if (scrollstep > stepAnim) {
      $("#laptopAnimation").addClass("laptop-animation");
    }
  });
});

// MENU
$(document).ready(function() {
  // BURGER RESPONSIVE < 992px
  var $menu = $(".nav");

  $(".burger").click(function() {
    $(this).toggleClass("active");
    $("body").toggleClass("block");
    $(".overlay").toggleClass("open").show;
  });

  $(".nav__link").click(function() {
    $(".overlay").removeClass("open");
    $(".burger").removeClass("active");
  });

  $(document).mouseup(function(e) {
    if (!$menu.is(e.target) && $menu.has(e.target).length === 0) {
      $(".overlay").removeClass("open");
      $(".burger").removeClass("active");
    }
  });
});

$(document).ready(function() {
  new WOW().init();
});

/* ========================================== 
scrollTop() >= 1400
Should be equal the the height of the header
========================================== */

$(window).scroll(function() {
  if ($(window).scrollTop() >= 1400) {
    $(".header__box").addClass("non");
    $(".top-navbar").addClass("visible");
  } else {
    $(".header__box").removeClass("non");
    $(".top-navbar").removeClass("visible");
  }
});

// $(".form").submit(function() {
//   var th = $(this);
//   $.ajax({
//     type: "POST",
//     url: "mail.php",
//     data: th.serialize()
//   }).done(function() {

//     var inst = $('[data-remodal-id=modal-thanks]').remodal();
//     inst.open();

//     setTimeout(function() {
//       th.trigger("reset");
//     }, 1000);
//   });
//   return false;
// });
