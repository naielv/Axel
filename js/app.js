const container = document.querySelector(".container");
const module_photo = "e";
const urlParams = new URLSearchParams(window.location.search);

function Module(module_url, v) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", "/modules/" + module_url, false); // false for synchronous request
  xmlHttp.send(null);
  const text = xmlHttp.responseText;
  const result_1 = eval("`" + text + "`");
  return String(result_1);
}
function JSONGet(json_url) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", "/json/" + json_url, false); // false for synchronous request
  xmlHttp.send(null);
  return JSON.parse(xmlHttp.responseText);
}

function index() {
  let out = "";
  const apps = JSONGet("apps.json");
  apps.forEach((element) => {
    var photo = Module("photo.html", {
      source: "/img/app_icons/" + element.img,
      alt: element.name,
    });
    var card = Module("card.html", {
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
  var grid = Module("grid.html", {
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
  var input1 = Module("input.html", {
    id: "inp_kcal",
    label: "KCal",
    type: "number",
    placeholder: "Introduce un numero...",
  });
  var button = Module("button.html", {
    label: "Calcular",
    onclick: "app_kcal_calcular()",
  });
  var output = Module("output.html", {
    label: "Resultado",
    id: "out_kcal",
  });
  var card1 = Module("card.html", {
    title: "Nivel de calorias",
    text: "Calculadora para saber el nivel de calorias",
    footer: input1 + button + output,
  });
  var grid = Module("grid.html", {
    content: card1,
  });
  container.innerHTML = grid;
}
//////// APP Books: Biblioteca digital ////////

function app_books() {
  const view = urlParams.has("book");
  const book = urlParams.get("book");
  let out = "";
  const books = JSONGet("books.json");

  if (view) {
    const selbook = books.find(({ id }) => id === book);
    var pdf = Module("pdf.html", {
      source: selbook.pdf,
      width: "100%",
      height: "750vh"
    });
    out = pdf
  } else {
    books.forEach((element) => {
      var photo = Module("photo.html", {
        source: "/img/app_books/" + element.img,
        alt: element.name,
      });
      var card = Module("card.html", {
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
  }
  var grid = Module("grid.html", {
    content: out,
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
