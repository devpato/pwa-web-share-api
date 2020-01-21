// Index.js

initializeApp();

function onShare() {
  const title = document.title;
  const url = document.querySelector("link[rel=canonical]")
    ? document.querySelector("link[rel=canonical]").href
    : document.location.href;
  const text = "Learn how to use the share api";

  if (navigator.share) {
    navigator
      .share({
        title,
        url,
        text
      })
      .then(() => {
        alert(`Thanks for Sharing!`);
      })
      .catch(err => {
        alert(`Couldn't share ${err}`);
      });
  } else {
    alert(`Not supported 🙅!!`);
  }
}

function initializeApp() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./../sw.js").then(() => {
      document.querySelector("#share").addEventListener("click", () => {
        onShare();
      });
    });
  }
}
