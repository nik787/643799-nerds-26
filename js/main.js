ymaps.ready(function () {
  var myMap = new ymaps.Map('map', {
          center: [59.938631, 30.323055],
          zoom: 17,
          controls: [],
          type: 'yandex#map'
      }, {
          searchControlProvider: 'yandex#search'
      },
      {
        suppressMapOpenBlock: true,
      }),

      // Создаём макет содержимого.
      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      ),

      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
          hintContent: `191186, Санкт-Петербург,
          ул. Б. Конюшенная, д. 19/8`
      }, {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: 'default#image',
          // Своё изображение иконки метки.
          iconImageHref: 'img/map-marker.png',
          // Размеры метки.
          iconImageSize: [231, 190],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-50, -200]
      })

  myMap.geoObjects
      .add(myPlacemark)
});
