const container = document.querySelector(".container");

const main = () => {
  container.innerHTML = "Esta APP se puede instalar en un movil, tablet o ordenador.";
};

document.addEventListener("DOMContentLoaded", main);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}
