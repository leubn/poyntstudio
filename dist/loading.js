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
  const continueButton = document.getElementById("continueButton");

  if (!sessionStorage.getItem("loaderPlayed")) {
    loader.classList.remove("hidden");

    const tryPlay = video.play();

    if (tryPlay !== undefined) {
      tryPlay.then(() => {
        // Show continue button during video playback
        continueButton.classList.remove("hidden");

        continueButton.onclick = () => {
          loader.classList.add("opacity-0");
          document.body.classList.remove("opacity-0");
          setTimeout(() => loader.remove(), 500);
        };

        video.onended = () => {
          loader.classList.add("opacity-0");
          document.body.classList.remove("opacity-0");
          setTimeout(() => loader.remove(), 500);
        };

        sessionStorage.setItem("loaderPlayed", "true");
      }).catch(() => {
        enterButton.classList.remove("hidden");
        enterButton.onclick = () => {
          enterButton.classList.add("opacity-0");
          video.play().then(() => {
            continueButton.classList.remove("hidden");

            continueButton.onclick = () => {
              loader.classList.add("opacity-0");
              document.body.classList.remove("opacity-0");
              setTimeout(() => loader.remove(), 500);
            };

            video.onended = () => {
              loader.classList.add("opacity-0");
              document.body.classList.remove("opacity-0");
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
    document.body.classList.remove("opacity-0");
  }
}
