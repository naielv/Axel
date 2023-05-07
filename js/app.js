const container = document.querySelector(".container");
const module_photo = "e";
const urlParams = new URLSearchParams(window.location.search);

function Module(module_url, v) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", module_url, false); // false for synchronous request
  xmlHttp.send(null);
  const text = xmlHttp.responseText;
  const result_1 = eval("`" + text + "`");
  return String(result_1);
}
function index() {
  let out = "";
  const apps = [
    {
      img: "img/KCAL.png",
      name: "Nivel de Calorias",
      alt: "Icono de la app KCAL",
      details: "Calculadora para saber el nivel de calorias",
      url: "/app/kcal.html",
    },
    {
      img: "img/SHOP.png",
      name: "Tienda (Beta)",
      alt: "Icono de la app SHOP",
      details: "Fuera de servicio",
      url: "#",
    },
    {
      img: "img/BOOKS.png",
      name: "Biblioteca Digital",
      alt: "Icono de la app BOOKS",
      details: "En Desarollo",
      url: "/app/books.html",
    },
  ];
  apps.forEach((element) => {
    var photo = Module("/modules/photo.html", {
      source: element.img,
      alt: element.name,
    });
    var card = Module("/modules/card.html", {
      photo: photo,
      title: element.name,
      text: element.details,
      btn: {
        url: element.url,
        text: "Acceder",
      },
    });
    out += card;
  });
  var grid = Module("/modules/grid.html", {
    content: out,
  });
  container.innerHTML = grid;
}
//////// APP KCal: Nivel de Calorias ////////
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
//////// APP Books: Biblioteca digital ////////

function app_books() {
  const view = urlParams.has("book");
  const book = urlParams.get("book");
  let out = "";
  const books = [
    {
      img: "/img/BOOKS.png",
      pdf: "/",
      name: "Libro de Prueba",
      details:
        "Esto solo es una prueba, te redirigira a la pantalla de inicio.",
      id: "prueba",
    },
  ];

  if (view) {
    const selbook = books.find(({ id }) => id === book);
    location.href = selbook.pdf;
  } else {
    books.forEach((element) => {
      var photo = Module("/modules/photo.html", {
        source: element.img,
        alt: element.name,
      });
      var card = Module("/modules/card.html", {
        photo: photo,
        title: element.name,
        text: element.details,
        btn: {
          url: "/app/books.html?book=" + element.id,
          text: "Ver Libro",
        },
      });
      out += card;
    });
    var grid = Module("/modules/grid.html", {
      content: out,
    });
    container.innerHTML = grid;
  }
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}
