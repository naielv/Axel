const container = document.querySelector(".container");
const module_photo = "e";

function Module(module_url, v) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", module_url, false); // false for synchronous request
  xmlHttp.send(null);
  const text = xmlHttp.responseText;
  const result_1 = eval("`" + text + "`");
  return String(result_1);
}
function index() {
  var card_photo = Module("/modules/photo.html", {
    source: "img/coffee.jpg",
    alt: "Photo of Coffee",
  });
  var card1 = Module("/modules/card.html", {
    photo: card_photo,
    title: "Café Corazon",
    text: "Cafe riquisimo con dibujo de corazon",
    btn: {
      url: "/",
      text: "Test",
    },
  });
  var card2 = Module("/modules/card.html", {
    photo: card_photo,
    title: "Café Corazon",
    text: "Cafe riquisimo con dibujo de corazon",
    btn: {
      url: "#",
      text: "Test",
    },
  });
  var card3 = Module("/modules/card.html", {
    photo: card_photo,
    title: "Café Corazon",
    text: "Cafe riquisimo con dibujo de corazon",
    btn: {
      url: "#",
      text: "Test",
    },
  });
  var card4 = Module("/modules/card.html", {
    photo: card_photo,
    title: "Café Corazon",
    text: "Cafe riquisimo con dibujo de corazon",
    btn: {
      url: "#",
      text: "Test",
    },
  });
  var grid = Module("/modules/grid.html", {
    content: card1 + card2 + card3 + card4,
  });
  container.innerHTML = grid;
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}
