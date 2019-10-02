var popup = document.querySelector(".popup");
var popupClose = document.querySelector(".popup .popup__close");
var popupOpen = document.querySelector(".information__button");
var popupInput = document.querySelectorAll(".popup__form input, textarea");
var popupForm = document.querySelector(".popup__form");
popupForm.addEventListener("submit", function(e) {
  for (let i = 0; i < popupInput.length; i++) {
    const element = popupInput[i];
    element.setAttribute("required", true);
    if(!element.validity.valid) {
      e.preventDefault();
    }
  }


})



popupOpen.addEventListener("click", openPopup);
popupClose.addEventListener("click", closePopup);
function openPopup(e) {
  event.preventDefault();
  popup.classList.add("active");
}
function closePopup(e) {
  event.preventDefault();
  popup.classList.remove("active");
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
