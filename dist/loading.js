// Insert loading markup
document.addEventListener("DOMContentLoaded", () => {
  const loaderHTML = `
    <div id="loader" class="fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-500 hidden">
      <video
        id="loaderVideo"
        src="https://res.cloudinary.com/dxufo6vkw/video/upload/v1749494912/loading.mp4"
        muted
        playsinline
        preload="auto"
        class="w-full h-full object-contain absolute"
      ></video>
      <button id="enterButton"
        class="z-10 text-white text-xl md:text-2xl font-light tracking-wide bg-transparent border-none outline-none hover:opacity-80 transition-opacity duration-300 hidden">
        enter
      </button>
    </div>
  `;
  document.body.insertAdjacentHTML("afterbegin", loaderHTML);

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
              setTimeout(() => loader.remove(), 500);
            };
            sessionStorage.setItem("loaderPlayed", "true");
            enterButton.remove();
          });
        };
      });
    }

    // 🔒 Fallback in case video never ends
    setTimeout(() => {
      if (document.getElementById("loader")) {
        loader.classList.add("opacity-0");
        setTimeout(() => loader.remove(), 500);
      }
    }, 7000); // optional fallback delay
  } else {
    loader.remove();
  }
});
