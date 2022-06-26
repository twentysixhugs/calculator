export function initThemeSwitch() {
  const btn = document.querySelector(".js-theme") as HTMLButtonElement;

  btn.addEventListener("click", (e) => {
    const phoneContainer = document.querySelector(
      ".js-phone-container"
    ) as HTMLDivElement;

    if (phoneContainer.classList.contains("is-dark-theme")) {
      phoneContainer.classList.remove("is-dark-theme");
    } else {
      phoneContainer.classList.add("is-dark-theme");
    }
  });
}
