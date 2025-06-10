// include-footer.js
document.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector("[data-include-footer]");
  if (el) {
    fetch(el.getAttribute("data-include-footer"))
      .then(res => res.text())
      .then(html => el.innerHTML = html)
      .catch(() => el.innerHTML = "<!-- Failed to load footer -->");
  }
});
