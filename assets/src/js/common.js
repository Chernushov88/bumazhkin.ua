(function (window, document) {
  "use strict";

  const retrieveURL = function (filename) {
    var scripts = document.getElementsByTagName('script');
    if (scripts && scripts.length > 0) {
      for (var i in scripts) {
        if (scripts[i].src && scripts[i].src.match(new RegExp(filename + '\\.js$'))) {
          return scripts[i].src.replace(new RegExp('(.*)' + filename + '\\.js$'), '$1');
        }
      }
    }
  };


  function load(url, element) {
    var req = new XMLHttpRequest();

    req.onload = function () {
      if (this.readyState == 4 && this.status == 200) {
        element.insertAdjacentHTML('afterbegin', req.responseText);
      }
    };

    req.open("GET", url, true);
    req.send(null);
  }

  if (
    location.hostname !== "localhost" &&
    location.hostname !== "127.0.0.1" &&
    location.host !== ""
  ) {
    var files = ["https://bumazhkin.ua/business-registration/ru/img/symbol_sprite.html"],
      //var files = ["/assets/build/img/symbol_sprite.html"],
      //var files = ["//andreypost.github.io/sivochka/img/svg/symbol_sprite.html", "/img/svg/*"],
      // var files = ["/img/symbol_sprite.html", "/wp-content/themes/ukrmeatbest/img/gradient.svg"],
      revision = 9;

    if (
      !document.createElementNS ||
      !document.createElementNS("http://www.w3.org/2000/svg", "svg")
        .createSVGRect
    )
      return true;

    var isLocalStorage =
      "localStorage" in window && window["localStorage"] !== null,
      request,
      data,
      insertIT = function () {
        document.body.insertAdjacentHTML("afterbegin", data);
      },
      insert = function () {
        if (document.body) insertIT();
        else document.addEventListener("DOMContentLoaded", insertIT);
      };
    files.forEach(file => {
      try {
        var request = new XMLHttpRequest();
        request.open("GET", file, true);
        request.onload = function () {
          if (request.status >= 200 && request.status < 400) {
            data = request.responseText;
            insert();
            if (isLocalStorage) {
              localStorage.setItem("inlineSVGdata", data);
              localStorage.setItem("inlineSVGrev", revision);
            }
          }
        };
        request.send();
      } catch (e) {
      }
    })
  } else {
    load("/img/symbol_sprite.html", document.querySelector("body"));
  }




})(window, document);

$(document).ready(function () {
  $(".scrolling__link").on("click", function (event) {
    event.preventDefault();
    var id = $(this).attr("href"),
      top = $(id).offset().top;

    $("body,html").animate({scrollTop: top}, 1000);
  });

  // $('.phone-mask').mask('+38(999)999-99-99');

  $(".howItWork__slider").slick({
    arrows: false,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000
  });

  $(".review__slider").slick({
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

$(window).scroll(function () {
  $("#about").each(function () {
    var stepAnim = $("#about").offset().top - 700;
    var scrollstep = $(window).scrollTop();
    if (scrollstep > stepAnim) {
      $("#laptopAnimation").addClass("laptop-animation");
    }
  });
});

// MENU
$(document).ready(function () {
  // BURGER RESPONSIVE < 992px
  var $menu = $(".nav");

  $(".burger").click(function () {
    $(this).toggleClass("active");
    $("body").toggleClass("block");
    $(".overlay").toggleClass("open").show;
  });

  $(".nav__link").click(function () {
    $(".overlay").removeClass("open");
    $(".burger").removeClass("active");
  });

  $(document).mouseup(function (e) {
    if (!$menu.is(e.target) && $menu.has(e.target).length === 0) {
      $(".overlay").removeClass("open");
      $(".burger").removeClass("active");
    }
  });
});

$(document).ready(function () {
  new WOW().init();
});

/* ==========================================
scrollTop() >= 1400
Should be equal the the height of the header
========================================== */

$(window).scroll(function () {
  if ($(window).scrollTop() >= 1400) {
    $(".header__box").addClass("non");
    $(".top-navbar").addClass("visible");
  } else {
    $(".header__box").removeClass("non");
    $(".top-navbar").removeClass("visible");
  }
});

//send form
("use strict");
document.addEventListener("DOMContentLoaded", function () {
  /**
   * Input mask
   * https://github.com/text-mask/text-mask/tree/master/vanilla
   */
  var phoneMask = [
    "+",
    "3",
    "8",
    "(",
    /[0]/,
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
  ];
  var myInputs = document.querySelectorAll('input[type="tel"]');
  if (myInputs) {
    for (var phones = 0; phones < myInputs.length; phones++) {
      var maskedInputController = vanillaTextMask.maskInput({
        inputElement: myInputs[phones],
        mask: phoneMask,
        // placeholderChar: '___(___) ___-__-__',
        guide: true,
        showMask: true,
        keepCharPositions: true,
      });
    }
  }

  /**
   * UTM Tracking Code
   * @param {*} name - name current UTM
   */
  function getUTM(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  /**
   * Custom and very simple validation form by Raketa
   * @param {*} formName Name form attribute
   * @param {*} typeEvent Validation event (clickEvent/loadEvent)
   * @return {Boolean} If validated - true, else - false
   */
  function validateForm(formName, typeEvent) {
    var workForm = document.querySelector('form[data-form="' + formName + '"]');


    var formInputs = workForm.querySelectorAll("input.form-control[required]");

    var regExp;
    var typeInput;
    var curValidation;
    var wrapInput;

    for (var i = 0; i < formInputs.length; i++) {
      var formInput = formInputs[i];
      formInput.onblur = function () {
        if (this.value.length < 2) {
          //Пустые поля или поля с 1 символом сразу невалидны
          curValidation = false;
        } else {
          typeInput = this.getAttribute("type");
          if (typeInput === "email") {
            //Если имейл
            regExp = /.+@.+\..+/i;
            if (this.value.match(regExp)) {
              curValidation = true;
            } else {
              curValidation = false;
            }
          } else if (typeInput === "tel") {
            //Если телефон
            regExp = /^([^\_]|[+]?[0-9\s-\(\)]{3,25})*$/i;
            if (regExp.test(this.value) && this.value.length > 17) {
              curValidation = true;
            } else {
              curValidation = false;
            }
          } else if (typeInput === "text") {
            //Если текст
            regExp = /^[A-Za-zА-Яа-яЁёІіЇїЄє\s]+$/i;
            if (
              regExp.test(this.value) &&
              this.value.length > 1 &&
              this.value.length < 200
            ) {
              curValidation = true;
            } else {
              curValidation = false;
            }
          } else {
            curValidation = true; //Для полей, который не умеет валидировать функция
          }
        }
        wrapInput = this;
        if (curValidation) {
          wrapInput.classList.remove("raketa_error");
          wrapInput.classList.add("raketa_success");
          // formBtn.removeAttribute('disabled');
        } else {
          wrapInput.classList.add("raketa_error");
          wrapInput.classList.remove("raketa_success");
          // formBtn.setAttribute('disabled', 'disabled');
        }
      };
    }

    if (typeEvent === "clickEvent") {
      for (var index = 0; index < formInputs.length; index++) {
        if (!formInputs[index].classList.contains("raketa_success")) {
          formInputs[index].classList.add("raketa_error");
        }
      }
    }
    if (workForm.querySelector(".raketa_error")) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Get all buttons form
   */
  var formBottons = document.querySelectorAll(
    'form:not(.search-form):not(#adminbarsearch) [type="submit"]'
  );
  var curFormName, typeEvent, valFunction;
  for (var j = 0; j < formBottons.length; j++) {
    var curformtel = formBottons[j]
      .closest("form")
      .querySelector('input[type="tel"]');

    if (curformtel) {
      curformtel.placeholder = "+38(___) ___-__-__";
    }
    curFormName = formBottons[j].closest("form").getAttribute("data-form");

    typeEvent = "loadEvent";
    validateForm(curFormName, typeEvent);
    formBottons[j].onclick = function (e) {
      console.log('formBottons[j]', formBottons[j])
      e.preventDefault();
      curFormName = this.closest("form").getAttribute("data-form");
      typeEvent = "clickEvent";
      valFunction = validateForm(curFormName, typeEvent);
      if (valFunction) {
        //Если форма успешно провалидирована
        raketaApi(curFormName);
      }
    };
  }

  function raketaApi(curFormName) {
    var formElement = document.querySelector(
      'form[data-form="' + curFormName + '"]'
    );
    var btn =
      formElement.querySelector("button") ||
      formElement.querySelector('input[type="submit"]');
    btn.disabled = true;
    if (document.documentElement.getAttribute("lang") == "uk") {
      btn.innerHTML = "Відправлено";
      btn.value = "Відправлено";
    } else {
      btn.innerHTML = "Отправленно";
      btn.value = "Отправленно";
    }
    var formData = new FormData(formElement);

    var url = window.location.href.split("?")[0];
    var ref = document.referrer;
    var data_form = formElement.getAttribute("data-form");
    var utm_source = getUTM("utm_source");
    var utm_term = getUTM("utm_term");
    var utm_content = getUTM("utm_content");
    var utm_campaign = getUTM("utm_campaign");
    var utm_medium = getUTM("utm_medium");
    formData.append("url", url);
    formData.append("ref", ref);
    formData.append("data_form", data_form);
    formData.append("utm_source", utm_source);
    formData.append("utm_term", utm_term);
    formData.append("utm_content", utm_content);
    formData.append("utm_campaign", utm_campaign);
    formData.append("utm_medium", utm_medium);

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        console.log("👌");
        const phone = formData.getAll("phone")[0];
        if (document.documentElement.getAttribute("lang") == "uk") {
          window.location.href = `/typage-2?tel=${
            phone ? phone.replace(/\s/g, "") : ""
          }`;
          btn.innerHTML = "Відправлено";
        } else {
          window.location.href = `/ru/typage?tel=${
            phone
              ? phone
                .replace(/\s/g, "")
                .replace("%20", "+")
                .replace("%28", "(")
                .replace("%29", ")")
              : ""
          }`;
          btn.innerHTML = "Отправленно";
        }
      }
    };
    request.onload = function () {
      if (this.status !== 200) {
        btn.disabled = false;
      }
    };
    request.open(
      "POST",
      "https://bumazhkin.ua/wp-content/themes/entrepreneurx-child/raketa_api.php",
      //"/raketa_api.php",
      true
    );
    request.send(formData);
  }
});


const isNewSite = document
  .querySelector("body")
  .classList.toggle("new-homepage");

if (isNewSite) {
  function HiddenText() {
    var element = document.getElementById("hiddenBlock");
    element.classList.toggle("active");
    if (document.querySelector('html[lang="ru-RU"]')) {
      if (element.classList.contains("active") === true) {
        document.getElementById("button-hidden").innerHTML = "Скрыть";
      } else {
        document.getElementById("button-hidden").innerHTML = "Читать дальше";
      }
    }
    if (document.querySelector('html[lang="uk"]')) {
      if (element.classList.contains("active") === true) {
        document.getElementById("button-hidden").innerHTML = "Сховати";
      } else {
        document.getElementById("button-hidden").innerHTML = "Читати далі";
      }
    }
  }

  if (document.getElementById("button-hidden")) {
    var hidden_button = document.getElementById("button-hidden");
    hidden_button.addEventListener("click", function () {
      HiddenText();
    });
  }

  jQuery(document).ready(function ($) {
    $(".th-pricing-table .btn").click(function () {
      event.preventDefault();
      $("#exampleModalCenter").modal("show");
      $("#exampleModalCenter")
        .find("#predloz")
        .val(
          $(this).parents(".th-pricing-column").find(".th-pricing-title").text()
        );
    });

    if ($(".owl-carousel").length > 0) {
      $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dotsEach: 1,
        responsiveClass: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
          0: {
            items: 1,
            nav: true,
          },
          600: {
            items: 3,
            nav: false,
          },
          1000: {
            items: 3,
            nav: true,
          },
        },
      });
    }

    if (window.location.pathname == "/") {
      $("#menu-glavnoe-menyu li").removeClass("active");
      var anchors = ["price", "conditions", "reviews", "blog"];
      $(window).scroll(function (e) {
        $.each(anchors, function (i, v) {
          var anchor_offset = $("#" + v).offset().top;
          if (
            $(window).scrollTop() + 150 > anchor_offset &&
            $(window).scrollTop() - anchor_offset < $("#" + v).height()
          ) {
            $("#menu-glavnoe-menyu li").removeClass("active");
            $('li a[href="/#' + v + '"]')
              .parent("li")
              .addClass("active");
            return false;
          } else {
            $("#menu-glavnoe-menyu li").removeClass("active");
          }
        });
      });
      $("#menu-glavnoe-menyu li").on("click", function () {
        $("#menu-glavnoe-menyu li").removeClass("active");
        $(this).addClass("active");
      });
    }
    if (window.location.pathname == "/ua/") {
      $("#menu-golovne-menyu li").removeClass("active");
      var anchors = ["price", "conditions", "reviews", "blog"];
      $(window).scroll(function (e) {
        $.each(anchors, function (i, v) {
          var anchor_offset = $("#" + v).offset().top;
          if (
            $(window).scrollTop() + 150 > anchor_offset &&
            $(window).scrollTop() - anchor_offset < $("#" + v).height()
          ) {
            $("#menu-golovne-menyu li").removeClass("active");
            $('li a[href="/ua/#' + v + '"]')
              .parent("li")
              .addClass("active");
            return false;
          } else {
            $("#menu-golovne-menyu li").removeClass("active");
          }
        });
      });
      $("#menu-golovne-menyu li").on("click", function () {
        $("#menu-golovne-menyu li").removeClass("active");
        $(this).addClass("active");
      });
    }
    if (window.location.pathname == "/ua/kadrovyj-oblik-i-audit/") {
      $("#menu-golovne-menyu li").removeClass("active");
      var anchors = ["prices_menu", "footer"];
      $(window).scroll(function (e) {
        $.each(anchors, function (i, v) {
          var anchor_offset = $("#" + v).offset().top;
          if (
            $(window).scrollTop() + 150 > anchor_offset &&
            $(window).scrollTop() - anchor_offset < $("#" + v).height()
          ) {
            $("#menu-primary_navigation_ua li").removeClass("active");
            $('li a[href="#' + v + '"]')
              .parent("li")
              .addClass("active");
            return false;
          } else {
            $("#menu-primary_navigation_ua li").removeClass("active");
          }
        });
      });
      $("#menu-primary_navigation_ua li").on("click", function () {
        $("#menu-primary_navigation_ua li").removeClass("active");
        $(this).addClass("active");
      });
    }
    if (window.location.pathname == "/kadrovyj-uchet-i-audit/") {
      $("#menu-golovne-menyu li").removeClass("active");
      var anchors = ["prices_menu", "footer"];
      $(window).scroll(function (e) {
        $.each(anchors, function (i, v) {
          var anchor_offset = $("#" + v).offset().top;
          if (
            $(window).scrollTop() + 150 > anchor_offset &&
            $(window).scrollTop() - anchor_offset < $("#" + v).height()
          ) {
            $("#menu-primary_navigation_ru li").removeClass("active");
            $('li a[href="#' + v + '"]')
              .parent("li")
              .addClass("active");
            return false;
          } else {
            $("#menu-primary_navigation_ru li").removeClass("active");
          }
        });
      });
      $("#menu-primary_navigation_ru li").on("click", function () {
        $("#menu-primary_navigation_ru li").removeClass("active");
        $(this).addClass("active");
      });
    }
  });
}
var link_phone = window.location.href.split("?tel=")[1];
var phoneField =
  document.querySelector("#clientPhone") &&
  document.querySelector("#clientPhone");
link_phone && phoneField && (phoneField.innerHTML = link_phone);