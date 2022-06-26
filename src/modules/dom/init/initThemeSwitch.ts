export function initThemeSwitch() {
  const btn = document.querySelector(".js-theme") as HTMLButtonElement;

  btn.addEventListener("click", (e) => {
    const phone = document.querySelector(".js-phone") as HTMLDivElement;

    if (phone.classList.contains("is-dark-theme")) {
      phone.classList.remove("is-dark-theme");
    } else {
      phone.classList.add("is-dark-theme");
    }
  });
}
