export function Loading() {
  const wrapper = document.querySelector(".main-form__button-loading");

  const bar = document.querySelector(
    ".main-form__button-loading-indicator__bar"
  );

  const label = document.querySelector(
    ".main-form__button-loading-indicator__text"
  );

  function showElement(el) {
    el.classList.remove("loading--disabled");
    el.classList.add("loading--visible");
  }
  function hideElement(el) {
    el.classList.remove("loading--visible");
    el.classList.add("loading--disabled");
  }

  function showBar() {
    showElement(bar);
  }

  function hideBar() {
    hideElement(bar);
  }

  function showLoader() {
    showElement(wrapper);
  }

  function hideLoader() {
    hideElement(wrapper);
  }

  function showText() {
    showElement(label);
  }

  function hideText() {
    hideElement(label);
  }

  function setPercentage(percent) {
    showLoader();
    showBar();
    bar.style.width = percent + "%";
  }

  function setText(text) {
    showLoader();
    showText();
    label.textContent = text;
  }

  function resetState() {
    setText("");
    hideText();
    hideBar();
    hideLoader();
    bar.style.width = "0";
  }

  const self = {
    resetState,
    setPercentage,
    setText,
  };

  return Object.freeze(self);
}
