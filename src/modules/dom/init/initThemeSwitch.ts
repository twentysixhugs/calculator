export function initThemeSwitch() {
  const switchBtn = document.querySelector(".js-theme") as HTMLButtonElement;

  const rootEl = document.querySelector(".root") as HTMLDivElement;

  const themeFromLocalStorage = localStorage.getItem("theme");

  if (themeFromLocalStorage === "dark") {
    rootEl.classList.add("is-dark-theme");
  }

  switchBtn.addEventListener("click", (e) => {
    if (rootEl.classList.contains("is-dark-theme")) {
      rootEl.classList.remove("is-dark-theme");
      localStorage.setItem("theme", "light");
    } else {
      rootEl.classList.add("is-dark-theme");
      localStorage.setItem("theme", "dark");
    }
  });
}
