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
  var card1_photo = Module("/modules/photo.html", {
    source: "img/KCAL.png",
    alt: "Icono de la app KCAL",
  });
  var card2_photo = Module("/modules/photo.html", {
    source: "img/SHOP.png",
    alt: "Icono de la app SHOP",
  });
  var card1 = Module("/modules/card.html", {
    photo: card1_photo,
    title: "Nivel de calorias",
    text: "Calculadora para saber el nivel de calorias",
    btn: {
      url: "/app/kcal.html",
      text: "Acceder",
    },
  });
  var card2 = Module("/modules/card.html", {
    photo: card2_photo,
    title: "Tienda (Beta)",
    btn: {
      url: "#",
      text: "Fuera de servicio",
    },
  });
  var grid = Module("/modules/grid.html", {
    content: card1 + card2,
  });
  container.innerHTML = grid;
}

function app_kcal_calcular() {
  const inp = document.getElementById("inp_kcal");
  const ovl = document.getElementById("out_kcal");
  const kcal = Number(inp.value);
  let out = "";
  if (kcal <= 300) {
    out = "Muy Bajo";
  } else if (kcal <= 450) {
    out = "Bajo";
  } else if (kcal >= 925) {
    out = "Muy Alto";
  } else if (kcal >= 750) {
    out = "Alto";
  } else {
    out = "Regular";
  }
  ovl.innerHTML = out;
}
function app_kcal() {
  var input1 = Module("/modules/input.html", {
    id: "inp_kcal",
    label: "KCal",
    type: "number",
    placeholder: "Introduce un numero...",
  });
  var button = Module("/modules/button.html", {
    label: "Calcular",
    onclick: "app_kcal_calcular()",
  });
  var output = Module("/modules/output.html", {
    label: "Resultado",
    id: "out_kcal",
  });
  var card1 = Module("/modules/card.html", {
    title: "Nivel de calorias",
    text: "Calculadora para saber el nivel de calorias",
    footer: input1 + button + output,
  });
  var grid = Module("/modules/grid.html", {
    content: card1,
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
