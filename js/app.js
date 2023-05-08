const container = document.querySelector(".container");
const module_photo = "e";
const urlParams = new URLSearchParams(window.location.search);
//////// Modulos
function JSONGet(json_url) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", "/json/" + json_url, false); // false for synchronous request
  xmlHttp.send(null);
  return JSON.parse(xmlHttp.responseText);
}
function ModButton(label, onclick) {
  let btn = document.createElement("button");
  btn.innerText = label;
  btn.className = "btn";
  btn.onclick = onclick;
  return btn;
}
function ModButtonLink(label, url) {
  let btn = document.createElement("a");
  btn.innerText = label;
  btn.className = "btn";
  btn.href = url;
  return btn;
}
function ModPhoto(url, alt) {
  let photo = document.createElement("img");
  photo.src = url;
  photo.alt = alt;
  return photo;
}
function ModPDF(url, width, height) {
  let pdf = document.createElement("iframe");
  pdf.src = url;
  pdf.style.width = width;
  pdf.style.height = height;
  return pdf;
}
function ModTitle(text) {
  let t = document.createElement("h2");
  t.innerText = text;
  return t;
}
function ModText(text) {
  let t = document.createElement("p");
  t.innerText = text;
  return t;
}
function ModInput(id, type, placeholder, label) {
  let div = document.createElement("div");
  let lab = document.createElement("label");
  let inp = document.createElement("input");
  inp.type = type;
  inp.id = id;
  inp.placeholder = placeholder;
  lab.innerText = label;
  div.appendChild(lab);
  div.appendChild(inp);
  return div;
}
function ModOutput(label, id) {
  let div = document.createElement("div");
  let lab = document.createElement("label");
  let h3 = document.createElement("h3");
  h3.id = id;
  h3.className = "output";
  lab.innerText = label;
  div.appendChild(lab);
  div.appendChild(h3);
  return div;
}
function ModCard(nodes) {
  let div = document.createElement("div");
  div.className = "card";
  nodes.forEach((node) => {
    div.appendChild(node);
  });
  return div;
}
function ModGrid(nodes) {
  let div = document.createElement("div");
  div.className = "grid";
  nodes.forEach((node) => {
    div.appendChild(node);
  });
  return div;
}

//////// INICIO
function index() {
  let cards = [];
  const apps = JSONGet("apps.json");
  apps.forEach((element) => {
    cards.push(
      ModCard([
        ModPhoto("/img/app_icons/" + element.img, element.name),
        ModTitle(element.name),
        ModText(element.details),
        ModButtonLink("Acceder", element.url),
      ])
    );
  });
  var grid = ModGrid(cards);
  container.appendChild(grid);
}
//////// APP KCal: Nivel de Calorias
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
    out = "Bueno";
  }
  ovl.innerHTML = out;
}
function app_kcal() {
  var grid = ModGrid([
    ModCard([
      ModTitle("Nivel de Calorias"),
      ModText("Calculadora para saber el nivel de calorias"),
      ModInput("inp_kcal", "number", "Introduce un numero...", "KCal"),
      ModButton("Calcular", app_kcal_calcular),
      ModOutput("Resultado", "out_kcal"),
    ]),
  ]);
  container.appendChild(grid);
}
//////// APP Books: Biblioteca digital

function app_books() {
  const view = urlParams.has("book");
  const book = urlParams.get("book");
  const books = JSONGet("books.json");

  if (view) {
    const selbook = books.find(({ id }) => id === book);
    var pdf = ModPDF(selbook.pdf, "100%", "90vh");
    container.appendChild(pdf);
  } else {
    let cards = [];
    books.forEach((element) => {
      cards.push(
        ModCard([
          ModPhoto("/img/app_books/" + element.img, element.name),
          ModTitle(element.name),
          ModText(element.details),
          ModButtonLink("Ver Libro", "/app/books.html?book=" + element.id),
        ])
      );
    });
    var grid = ModGrid(cards);
    container.appendChild(grid);
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
