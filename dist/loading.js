// Inject loading.html content
document.addEventListener("DOMContentLoaded", () => {
  const loadingEl = document.querySelector('[data-include-loading]');
  if (!loadingEl) return;

  fetch(loadingEl.getAttribute("data-include-loading"))
    .then(res => res.text())
    .then(html => {
      loadingEl.innerHTML = html;
      startLoader(); // run actual loader logic after injection
    })
    .catch(err => {
      console.error("Failed to load loading.html:", err);
    });
});

function startLoader() {
  const loader = document.getElementById("loader");
  const video = document.getElementById("loaderVideo");
  const enterButton = document.getElementById("enterButton");

  if (!sessionStorage.getItem("loaderPlayed")) {
    loader.classList.remove("hidden");

    const tryPlay = video.play();

    if (tryPlay !== undefined) {
      tryPlay.then(() => {
        video.onended = () => {
          loader.classList.add("opacity-0");
          document.body.classList.remove("opacity-0"); // ✅ make body visible
          setTimeout(() => loader.remove(), 500);
        };
        sessionStorage.setItem("loaderPlayed", "true");
      }).catch(() => {
        enterButton.classList.remove("hidden");
        enterButton.onclick = () => {
          enterButton.classList.add("opacity-0");
          video.play().then(() => {
            video.onended = () => {
              loader.classList.add("opacity-0");
              document.body.classList.remove("opacity-0"); // ✅ make body visible
              setTimeout(() => loader.remove(), 500);
            };
            sessionStorage.setItem("loaderPlayed", "true");
            enterButton.remove();
          });
        };
      });
    }
  } else {
    loader.remove();
    document.body.classList.remove("opacity-0"); // ✅ make body visible immediately if already played
  }
}
