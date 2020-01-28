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
        /*
          Show a message if the user share something
        */
        alert(`Thanks for Sharing!`);
      })
      .catch(err => {
        /*
          This error will appear if the user cancel the action of sharing.
        */
        alert(`Couldn't share ${err}`);
      });
  } else {
    alert(`Not supported !!`);
  }
}

function initializeApp() {
  if ("serviceWorker" in navigator) {
    /*
      If you are testing this app, and you want to deploy it and put the deploy code in a folder, 
      you are going to have to change the location of the service worker in the .register(). Service Workers
      by practice, they go in the root of your project. 
    */
    navigator.serviceWorker.register("sw.js").then(() => {
      /*
        Since this is a PWA, I want to make sure that if the SW is registered then I keep 
        initializing things for the app, but having a service worker nor a PWA is needed
        to make use of the Web Share API. 
      */
      document.querySelector("#share").addEventListener("click", () => {
        onShare();
      });
    });
  }
}
