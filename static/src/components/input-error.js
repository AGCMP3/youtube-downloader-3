export function InputError() {
  function show() {
    const input = document.querySelector("div.main-form__input");
    input.classList.add("wrong");
  }

  function hide() {
    document.querySelector("div.main-form__input").classList.remove("wrong");
  }

  const self = {
    show,
    hide,
  };

  return Object.freeze(self);
}
