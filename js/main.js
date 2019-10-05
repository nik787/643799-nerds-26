var popupOpen = document.querySelector(".information__button");
var popup = document.querySelector(".popup");
var popupClose = popup.querySelector(".popup__close");
var popupInput = popup.querySelectorAll("input, textarea");
var popupLogin = popup.querySelector("#name");
var popupEmail = popup.querySelector("#email");
var popupText = popup.querySelector("#text-area");
var popupForm = popup.querySelector(".popup__form");
var popupSubmit = popup.querySelector(".popup__submit");

var isStorageSupport = true;
var loginStorage = "";
var emailStorage = "";

try {
  loginStorage = localStorage.getItem("login");
  emailStorage = localStorage.getItem("email");
} catch (error) {
  isStorageSupport = false;
}

popupOpen.addEventListener("click", openPopup);
popupClose.addEventListener("click", closePopup);
popupForm.addEventListener("submit", valid);

function valid(e) {
  for (let i = 0; i < popupInput.length; i++) {
    const element = popupInput[i];
    element.setAttribute("required", true);
    if(!element.validity.valid) {
      popupError();
      e.preventDefault();
      popupSubmit.addEventListener("click", function() {
        if (!element.validity.valid) {
          popupError();
        }
      })
    } else if(isStorageSupport) {
      localStorage.setItem("login", popupLogin.value);
      localStorage.setItem("email", popupEmail.value);
    }
  }
}
function popupOpenAnimate() {
  popup.classList.add("popup--open-animate");
  setTimeout(() => {
    popup.classList.remove("popup--open-animate");
  }, 2000);
}
function popupError() {
  popup.classList.add("popup--error");
  setTimeout(() => {
    popup.classList.remove("popup--error");
  }, 2000);
}
function openPopup(e) {
  e.preventDefault();
  popup.classList.add("popup--open");
  popupOpenAnimate();
  if(loginStorage && emailStorage) {
    popupText.focus();
  } else if(loginStorage) {
    popupEmail.focus();
  } else {
    popupLogin.focus();
  }
  popupLogin.value = loginStorage;
  popupEmail.value = emailStorage;
  window.addEventListener("keydown", function(e) {
    if (e.keyCode === 27) {
      if(popup.classList.contains("popup--open")) {
        e.preventDefault();
        closePopup(e);
      }
    }
  });
}
function closePopup(e) {
  e.preventDefault();
  popup.classList.add("popup--close");
  setTimeout(() => {
    popup.classList.remove("popup--open");
  popup.classList.remove("popup--close");
  }, 800);
  popupOpen.focus();
}


ymaps.ready(function () {
  var myMap = new ymaps.Map("map", {
          center: [59.938872, 30.322617],
          zoom: 18,
          controls: [],
          type: "yandex#map",

      }, {
          searchControlProvider: "yandex#search"
      },
      {
        suppressMapOpenBlock: true,
      }),

      // Создаём макет содержимого.
      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          `<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>`
      ),

      myPlacemark = new ymaps.Placemark([59.938631, 30.323055], {
          hintContent: `191186, Санкт-Петербург,
          ул. Б. Конюшенная, д. 19/8`
      }, {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: "default#image",
          // Своё изображение иконки метки.
          iconImageHref: "img/map-marker.png",
          // Размеры метки.
          iconImageSize: [231, 190],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-50, -200]
      })
      myMap.behaviors
      .disable(["rightMouseButtonMagnifier", "scrollZoom"])
  myMap.geoObjects
      .add(myPlacemark)
});
